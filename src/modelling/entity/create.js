'use strict';

var async = require('async'),
	db = require('../../database'),
	utils = require('../../../public/src/utils'),
	validator = require('validator'),
	plugins = require('../../plugins'),
	meta = require('../../meta'),
	notifications = require('../../notifications'),
	translator = require('../../../public/src/translator');

module.exports = function(Entity) {

	Entity.createEntity = function(data, callback) {

		var entityData = {
			'name': data.name.trim(),
			'createdate': Date.now(),
			'domain': data.domain,
			'tags': data.tags,
			'entityviews': 0,
			'definition': JSON.stringify(data.definition)
		};

		async.parallel({
			entityNameValid: function(next) {

				// Add entity Name validations here...
				next(null);
			},
			customFields: function(next) {

				// For plugins related to entities and adding custom fields.
				plugins.fireHook('filter:entity.custom_fields', [], next);
			},
			entityData: function(next) {

				// For plugins realted to entities which will be fired on entity creation.
				plugins.fireHook('filter:entity.create', entityData, next);
			}
		}, function(err, results) {
			if (err) {
				return callback(err);
			}

			var customData = {};
			results.customFields.forEach(function(customField) {
				if (data[customField]) {
					customData[customField] = data[customField];
				}
			});

			entityData = utils.merge(results.entityData, customData);

			db.incrObjectField('global', 'nextUid', function(err, uid) {
				if (err) {
					return callback(err);
				}

				entityData.uid = uid;

				db.setObject('entity:' + uid, entityData, function(err) {
					if (err) {
						return callback(err);
					}

					db.setObjectField('entityname:uid', entityData.name, uid);

					// Call plugins that might want to operate once entity is created.
					plugins.fireHook('action:entity.create', entityData);

					db.incrObjectField('global', 'entityCount');

					callback(null, uid);
				});
			});
		});
	};


};
