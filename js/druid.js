var app = {

	init: function() {
		app.getPosts();
	},

	getPosts: function() {

		var rootURL = 'http://dogsniffer.com/la/wp-json';

		$.ajax({
			type: 'GET',
			url: rootURL + '/posts?type=listing',
			dataType: 'json',
			success: function(data){
				
				$.each(data, function(index, value) {
					console.log(value.featured_image);
			      $('ul.druid-listings').append('<li class="druid-list-item">' +
			      	'<img src="'+value.featured_image.attachment_meta.sizes.medium.url+'" /><br>' +
			      	'<h3>'+value.title+'</h3>' +
			      	'<p>'+value.excerpt+'</p></li>');
			    });
			},
			error: function(error){
				console.log(error);
			}

		});

	}

}