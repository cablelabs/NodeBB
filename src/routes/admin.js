"use strict";

var express = require('express');


function apiRoutes(app, middleware, controllers) {
	// todo, needs to be in api namespace
	app.get('/users/csv', middleware.authenticate, controllers.admin.users.getCSV);

	app.post('/category/uploadpicture', middleware.applyCSRF, middleware.authenticate, controllers.admin.uploads.uploadCategoryPicture);
	app.post('/uploadfavicon', middleware.applyCSRF, middleware.authenticate, controllers.admin.uploads.uploadFavicon);
	app.post('/uploadlogo', middleware.applyCSRF, middleware.authenticate, controllers.admin.uploads.uploadLogo);
	app.post('/uploadgravatardefault', middleware.applyCSRF, middleware.authenticate, controllers.admin.uploads.uploadGravatarDefault);
}

function adminRouter(middleware, controllers) {
	var router = express.Router();

	router.use(middleware.admin.buildHeader);

	router.get('/', controllers.admin.home);

//<<<<<<< HEAD
//	app.get('/admin/sounds', middleware.admin.buildHeader, controllers.admin.sounds.get);
//	app.get('/api/admin/sounds', controllers.admin.sounds.get);
//
//    app.get('/admin/designer', middleware.admin.buildHeader, controllers.admin.designer.get);
//}
//=======
	addRoutes(router, middleware, controllers);
//>>>>>>> 1eb9016a77c9ef99e63913db0a023b7f9911d4e4

	apiRoutes(router, middleware, controllers);

	return router;
}

function apiRouter(middleware, controllers) {
	var router = express.Router();

	addRoutes(router, middleware, controllers);

	return router;
}

function addRoutes(router, middleware, controllers) {
	router.get('/general/dashboard', controllers.admin.home);
	router.get('/general/languages', controllers.admin.languages.get);
	router.get('/general/sounds', controllers.admin.sounds.get);

//<<<<<<< HEAD
//	app.get('/admin/categories/disabled', middleware.admin.buildHeader, controllers.admin.categories.disabled);
//	app.get('/api/admin/categories/disabled', controllers.admin.categories.disabled);
//
//    app.get('/admin/apis/active', middleware.admin.buildHeader, controllers.admin.apis.active);
//    app.get('/api/admin/apis/active', controllers.admin.apis.active);
//
//    app.get('/admin/apis/disabled', middleware.admin.buildHeader, controllers.admin.apis.disabled);
//    app.get('/api/admin/apis/disabled', controllers.admin.apis.disabled);
//
//    app.get('/admin/announcements/active', middleware.admin.buildHeader, controllers.admin.announcements.active);
//    app.get('/api/admin/announcements/active', controllers.admin.announcements.active);
//
//    app.get('/admin/announcements/disabled', middleware.admin.buildHeader, controllers.admin.announcements.disabled);
//    app.get('/api/admin/announcements/disabled', controllers.admin.announcements.disabled);
//}
//=======
	router.get('/manage/categories', middleware.applyCSRF, controllers.admin.categories.active);
	router.get('/manage/categories/active', middleware.applyCSRF, controllers.admin.categories.active);
	router.get('/manage/categories/disabled', middleware.applyCSRF, controllers.admin.categories.disabled);
//>>>>>>> 1eb9016a77c9ef99e63913db0a023b7f9911d4e4

	router.get('/manage/tags', controllers.admin.tags.get);

	router.get('/manage/users', controllers.admin.users.search);
	router.get('/manage/users/search', controllers.admin.users.search);
	router.get('/manage/users/latest', controllers.admin.users.sortByJoinDate);
	router.get('/manage/users/sort-posts', controllers.admin.users.sortByPosts);
	router.get('/manage/users/sort-reputation', controllers.admin.users.sortByReputation);

	router.get('/manage/groups', controllers.admin.groups.get);

	router.get('/settings/:term?', middleware.applyCSRF, controllers.admin.settings.get);

	router.get('/appearance/:term?', controllers.admin.appearance.get);

	router.get('/extend/plugins', controllers.admin.plugins.get);
	router.get('/extend/widgets', controllers.admin.extend.widgets);

	router.get('/advanced/database', controllers.admin.database.get);
	router.get('/advanced/events', controllers.admin.events.get);

	router.get('/development/logger', controllers.admin.logger.get);
}

module.exports = function(app, middleware, controllers) {
	app.use('/admin/', adminRouter(middleware, controllers));
	app.use('/api/admin/', apiRouter(middleware, controllers));
};
