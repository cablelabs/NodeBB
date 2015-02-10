'use strict';

var async = require('async'),
	db = require('../../database'),
	utils = require('../../../public/src/utils'),
	validator = require('validator'),
	plugins = require('../../plugins'),
	meta = require('../../meta'),
	notifications = require('../../notifications'),
	translator = require('../../../public/src/translator');

module.exports = function(Path) {

	Path.createPath = function(data, callback) {

		var pathData = {
			'name': data.name.trim(),
			'displayName': data.displayName,
			'createdate': Date.now(),
			'domain': data.domain,
			'tags': data.tags,
			'pathviews': 0,
			'definition': JSON.stringify(data.definition)
		};

		async.parallel({
			pathNameValid: function(next) {

				// Add path Name validations here...
				next(null);
			},
			customFields: function(next) {

				// For plugins related to entities and adding custom fields.
				plugins.fireHook('filter:path.custom_fields', [], next);
			},
			pathData: function(next) {

				// For plugins realted to entities which will be fired on path creation.
				plugins.fireHook('filter:path.create', pathData, next);
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

			pathData = utils.merge(results.pathData, customData);

			db.incrObjectField('global', 'nextUid', function(err, uid) {
				if (err) {
					return callback(err);
				}

				pathData.uid = uid;

				db.setObject('path:' + uid, pathData, function(err) {
					if (err) {
						return callback(err);
					}

					db.setObjectField('pathname:uid', pathData.name, uid);

					// Call plugins that might want to operate once path is created.
					plugins.fireHook('action:path.create', pathData);

					db.incrObjectField('global', 'pathCount');

					callback(null, uid);
				});
			});
		});
	};


};
