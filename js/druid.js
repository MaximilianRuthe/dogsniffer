var app = {

	init: function() {
		this.bindEvents();
		this.getPosts('listing');		
		//$('#content').height(getRealContentHeight());
		//$( "#listings" ).trigger( "updatelayout" );
		var content = $.mobile.getScreenHeight() - $(".ui-header").outerHeight() - $(".ui-footer").outerHeight() - $(".ui-content").outerHeight() + $(".ui-content").height();
		$(".ui-content").height(content);
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
	getPosts: function(post_type,per_page,search_key) {		
		var rootURL = 'http://dogsniffer.com/la/wp-json';
		post_type = post_type || "listing";
		per_page = per_page || "10";
		search_key = search_key || "";
		if (search_key !== '') {
			search_key = "&filter[s]="+search_key;
		}
		/*
		var bounds = [];
		map = new GMaps({
			div: '#mage-map',
			lat: -12.043333,
			lng: -77.028333,
			disableDefaultUI: true,
			zoom: 15,		
			width: 'auto',
			height: '100%',
			idle: function(){
				map.refresh();
			},
			resize: function(){
				var center = map.getCenter();
				map.setCenter(center.lat(), center.lng());
			}
		}); 
		*/
		var barkback = rootURL + '/posts?type='+post_type+'&filter[posts_per_page]='+per_page+search_key;
		$.ajax({
			type: 'GET',
			url: barkback,
			dataType: 'json',
			success: function(data){
				$.each(data, function(index, value) {
					console.log(value);
					$('ul.druid-listings').append('<li class="druid-list-item ui-li-has-alt ui-li-has-thumb item-'+post_type+'">' +
			      	'<a href="#" class="ui-btn"><img src="'+value.featured_image.attachment_meta.sizes.thumbnail.url+'" class="thumbnail" />' +
			      	'<h3>'+value.title+'</h3>' +'<p>'+value.excerpt+'</p>' +
					'<p>'+value.street+'<br />'+value.city+', '+value.zip+'</p>' +
					'</a><a href="#options" data-rel="popup" data-position-to="window" data-transition="pop" aria-haspopup="true" aria-owns="options" aria-expanded="false" class="ui-btn ui-btn-icon-notext ui-icon-gear" title="View"></a></li>');	
					/*
					GMaps.geocode({
						address: value.street+', '+value.city+', '+value.zip,
						callback: function(results, status) {
							if (status == 'OK') {
								var latlng = results[0].geometry.location;
								map.setCenter(latlng.lat(), latlng.lng());
								map.addMarker({
									title:  value.title,
									lat: latlng.lat(),
									lng: latlng.lng(),
									infoWindow: {
										content: '<strong>'+value.title+'</strong>'+'<p>'+value.excerpt+'</p>'+'<strong>'+value.phone+'</strong>'
									}
									//icon: "http://dogsniffer.com/wp-content/uploads/2013/03/favicon.png"
								});
								map.fitZoom();									
							}
						}
					});	
					*/					
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
	$('#show-search').click(function(e) {
		$('ul.druid-listings').empty();
		var search = $('#s').val();
		app.getPosts('listing','10',search );
		e.preventDefault();
    });
});