var express = require('express');
var router = express.Router();
var api = require('../lib/api');
var utils = require('../lib/utils');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

/*
* Task 1:
* Make models alphabetically sortable (ascending, descending, default)
*/
router.get('/models', function(req, res, next) {
	// use api to get models and render output
	api.fetchModels().then(function(models){
		// get data that needs to be rendered in view based on sort option using sortModels helper
		var models = utils.sortModels(models,req.query.sort);
		res.render('models',{models:models});
	});
});


/*
* Task 2:
* Make services filterable by type (repair, maintenance, cosmetic)
*/
router.get('/services', function(req, res, next) {
	// use api to get services and render output
	api.fetchServices().then(function(services){
		// get data that needs to be rendered in view based on filter option using filterServices helper
		var services = utils.filterServices(services,req.query.filter);
		res.render('services',{services:services});
	});
});

/*
* Task 3:
* Bugfix: Something prevents reviews from being rendered
* Make reviews searchable (content and source)
*/
router.get('/reviews', function(req, res, next) {
	return Promise.all([api.fetchCustomerReviews(), api.fetchCorporateReviews()])
		.then(function(reviewSet) {
			// get data that needs to be rendered in view based on query using filterReviews helper
			var reviews = utils.filterReviews(reviewSet,req.query.q); 
			res.render('reviews', {reviews: reviews, query: req.query.q});
		});
});

module.exports = router;
