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
	getPosts: function(post_type,per_page,search_key) {
		var bounds = [];
		var rootURL = 'http://dogsniffer.com/la/wp-json';
		post_type = post_type || "listing";
		per_page = per_page || "10";
		search_key = search_key || "";
		if (search_key !== '') {
			search_key = "&filter[s]="+search_key;
		}
		var barkback = rootURL + '/posts?type='+post_type+'&filter[posts_per_page]='+per_page+search_key;
		$.ajax({
			type: 'GET',
			url: barkback,
			dataType: 'json',
			success: function(data){
				
				$.each(data, function(index, value) {
					//console.log(value.featured_image);
			      $('ul.druid-listings').append('<li class="druid-list-item bubble row box item-'+post_type+'">' +
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
		map = new GMaps({
		div: '#mage-map',
			lat: -12.043333,
			lng: -77.028333,
			disableDefaultUI: true,
			zoom: 14,		
		}); 
		GMaps.geocode({
			address: 'Los Angeles, CA',
			callback: function(results, status) {
				if (status == 'OK') {
					var latlng = results[0].geometry.location;
					map.setCenter(latlng.lat(), latlng.lng());
					map.addMarker({
						lat: latlng.lat(),
						lng: latlng.lng(),
						//icon: "http://dogsniffer.com/wp-content/uploads/2013/03/favicon.png"
					});
				}
			}
		});	  

	}	
}  