$(function() {


	var _playListId = 'PLCF042F294768BFD1',
		_apiKey = 'AIzaSyA1lY_AetoFhgcyPbLPmGRiYMo3vfommOg',
		_videoCount = '10',
		_vList = $('#videoWrap'),
		_featureVideo;
    

    $.ajax({
        type: 'GET',
        // URL contains playlist ID and API key
        // Returns JSON data for YouTube videos and details.
        // Generate or modify URL with multiple parameter here : https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.playlistItems.list
        url: 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+_videoCount+'&playlistId='+_playListId+'&fields=items(snippet(resourceId%2FvideoId%2Cthumbnails%2Fmedium%2Furl%2Ctitle))&key='+_apiKey,

        success: function(data) {
            $.each(data.items, function(i, item) {
                // Append list of Video thumbnail image, 
                // Video ID and Video title wrapped in HTML template.
                _vList.append('<div class="swiper-slide"><div class="video-thumb"><a class="item-link" data-href="' + item.snippet.resourceId.videoId + '"><img src="' + item.snippet.thumbnails.medium.url + '"></a></div><h5>' + item.snippet.title + '</h5></div>')
            });

            // Setting default video
            // For now we are setting first video as default video
            _featureVideo = data.items[0].snippet.resourceId.videoId;
            $('#mvFrame').attr('src', 'https://www.youtube.com/embed/' + _featureVideo);


            // Swiper carousel for thumbnail list
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                slidesPerView: 5,
                spaceBetween: 20,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                breakpoints: {
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    }
                }
            });
        },

        error: function(){
        	$('body').addClass('error');
        	$('.error-loading').slideDown('fast');
        }
    });

    // Change main video from carousel list
    $(document).on('click', '.item-link', function(event) {
        _featureVideo = $(this).attr('data-href');
        $('#mvFrame').attr('src', "https://www.youtube.com/embed/" + _featureVideo);
    });

});
