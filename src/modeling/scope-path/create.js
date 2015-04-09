'use strict';

var async = require('async'),
	db = require('../../database'),
	utils = require('../../../public/src/utils'),
	validator = require('validator'),
	plugins = require('../../plugins'),
	meta = require('../../meta'),
	notifications = require('../../notifications'),
	translator = require('../../../public/src/translator');

module.exports = function(ScopePath) {

	ScopePath.createScopePath = function(data, scope, callback) {

		if(! data.name) {
			return callback("Name attribute missing, it is a required attribute");
		}

		if(!Array.isArray(data.tags)) {
			return callback("Tags need to be an array");
		}
		if(data.tags.length <= 0) {
			return callback("Tags cannot be empty");
		}
		var isPresent = false;
		data.tags.forEach(function(item) {
			if(scope === item) {
				isPresent = true;
			}
		});
		if(!isPresent) {
			return callback("Zone and tags do not match");
		}

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

				db.setObject('scopepath:' + uid, pathData, function(err) {
					if (err) {
						return callback(err);
					}

					async.eachSeries(pathData.tags, function(tag, callback) {
						db.setObjectField('scopepathname:' + tag + ':uid', pathData.name, uid);
					}, function(err){
						// if any of the file processing produced an error, err would equal that error
						if( err ) {
							// One of the iterations produced an error.
							// All processing will now stop.
							console.log('A file failed to process');
						} else {
							console.log('All files have been processed successfully');
						}
					});

					//pathData.tags.forEach(function(item) {
					//	db.setObjectField('scopepathname:' + item + ':uid', pathData.name, uid, function(err) {
					//	});
					//})

					// Call plugins that might want to operate once path is created.
					plugins.fireHook('action:path.create', pathData);

					db.incrObjectField('global', 'scopePathCount');

					callback(null, uid);
				});
			});
		});
	};
};
