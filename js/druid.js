var app = {

	init: function() {
		this.bindEvents();
		this.getPosts('listing');
	},
	bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
	getPosts: function(type) {
		var rootURL = 'http://dogsniffer.com/la/wp-json';
		
		$.ajax({
			type: 'GET',
			url: rootURL + '/posts?type='+type+'&filter[posts_per_page]=3',
			dataType: 'json',
			success: function(data){
				
				$.each(data, function(index, value) {
					//console.log(value.featured_image);
			      $('ul.druid-listings').append('<li class="druid-list-item bubble row box item-'+type+'">' +
			      	'<div class="col-xs-2 col-sm-2 col-md-2"><img src="'+value.featured_image.attachment_meta.sizes.thumbnail.url+'" class="thumbnail" /></div>' +
			      	'<div class="col-xs-6 col-sm-6 col-md-6"><h3>'+value.title+'</h3>' +'<p>'+value.excerpt+'</p></div>' +
					'<div class="col-xs-4 col-sm-4 col-md-4">'+'</div>' +
					'</li>');
			    });
			},
			error: function(error){
				console.log(error);
			}

		});

	}	
}
jQuery(function($) {
	$('#show-events').click(function(){
		app.getPosts('event');
	});
	$('#show-listings').click(function(){
		app.getPosts('listing');
	});
});