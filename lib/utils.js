module.exports = {
	// sortModels helper to sort data based on sortOpt
	sortModels: function(data,sortOpt)
	{
		var models = {};
		// default the sortedData to api data
		models.sortedData = data;
		// sort options to be displayed in sort by widget
		models.sortOptions = [
			{
				'key': 'NONE',
				'href': '/models',
				'selected': !sortOpt	
			},
			{
				'key': 'ASC',
				'href': '/models?sort=asc',
				'selected': sortOpt === 'asc'
			},
			{
				'key' : 'DESC',
				'href': '/models?sort=desc',
				'selected' : sortOpt === 'desc'
			}
		];
		// sort in ascending order
		if(sortOpt === "asc")
			models.sortedData = data.sort(function(a,b){return a.charCodeAt(0)-b.charCodeAt(0)});
		// sort  in descending order
		else if(sortOpt === "desc")
			models.sortedData = data.sort(function(a,b){return b.charCodeAt(0)-a.charCodeAt(0)});
		return models;
	},
	// filterServices helper to filter data based on selected filter
	filterServices: function(data,filter)
	{
		var services = {};
		// default the sortedData to api data
		services.filteredData = data;
		// filter options to be displayed in filter by widget
		services.filterOptions = [
			{
				'key': 'All',
				'href': '/services',
				'selected': filter === 'all'
			},
			{
				'key': 'Repair',
				'href': '/services?filter=repair',
				'selected': filter === 'repair'
			},
			{
				'key' : 'Maintenance',
				'href': '/services?filter=maintenance',
				'selected' : filter === 'maintenance'
			},
			{
				'key' : 'Cosmetic',
				'href': '/services?filter=cosmetic',
				'selected' : filter === 'cosmetic'
			}
		];
		// execute filtering logic when filter is applied
		if(filter)
		{
			// filter data based on type or send all data when all is choosen
			services.filteredData =  data.filter(function(service){ 
				return service.type === filter || filter === 'all';
			});
		}
		return services;
	},
	// filterReviews helper to filter reviews based on search input
	filterReviews: function(data,searchOpt)
	{
		// flattern the array so that both reviews are merged into a single array
		var filteredReviews = Array.prototype.concat.apply([],data);
		// execute search operations when search input is provided
		if(searchOpt)
		{
			searchOpt = searchOpt.toLowerCase();
			// filter reviews based on source or content
			filteredReviews = filteredReviews.filter(function(review){
				// find search string in review content
				var contentIndex = review['content'].toLowerCase().search(searchOpt);
				// find search string in review source
				var sourceIndex = review['source'].toLowerCase().search(searchOpt);
				return ((contentIndex >= 0) || (sourceIndex >= 0));
			})
		}
		return filteredReviews;
	}
}