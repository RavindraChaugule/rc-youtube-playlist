# rc-youtube-playlist

### YouTube Videos Gallery

YouTube Data API V3

This is YouTube videos gallery for website. It pulls the videos from YouTube playlist and show it on your website with custom look. It is responsive and customizable.


#### --- [Demo](https://ravindrachaugule.github.io/rc-youtube-playlist/index.html) ---

![Custom yotube playlist](/screenshot.png "Custom yotube playlist")

### Step by Step:

 1. Create API key using your Google accout. https://console.developers.google.com/
 2. Enable the API for further usage. Link to enable API can be seen on Dashboard header.
 3. Now create JSON resonse from Google APIs Explorer https://developers.google.com/
 4. Go to **Services > YouTube Data API v3 > youtube.playlistItems.list**
 5. In "Part" field add "**snippet**" string. It is a JSON object name that contains all the data we need.
 6. In "playlistId" field add "**{YouTube Playlist ID}**". It is a text and numbers combination at the end of your playlist. E.g https://www.youtube.com/playlist?list= {YouTube Playlist ID}
 7. Now click on "**Execute**"
 8. It creates **Request** and **Response**. GET URL and JSON response respectively.
 9. **{YOUR_API_KEY}** at the end of **Request** URL is import to work with this feature. Refer point number one for creating API key.
 10. Once we have Request URL with JSON response, we can play with it as we want. For example see [Demo](https://ravindrachaugule.github.io/rc-youtube-playlist/index.html).

#### Markup used in this demo.
 
```html
  <div class="error-loading">
    ! Error while retrieving data
  </div>
	<div id="wrapper">
        <div id="mainVideo">
            <div class="mainvideo-inner">
                <div class="main-frame">
                    <iframe id="mvFrame" width="853" height="480" src="" frameborder="0" allowfullscreen></iframe>
                </div>
            </div>
        </div>
        <div class="video-list">
            <div class="swiper-container">
                <div class="swiper-wrapper" id="videoWrap">
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev"></div>
        		<div class="swiper-button-next"></div>
            </div>
        </div>
    </div>
```
#### Script used in this demo
 
```js
	var _playListId = 'PLCF042F294768BFD1', //Replace with your playlist ID
		_apiKey = 'AIzaSyDMv_Advye11OsLEyXTV6R1DhZ3xWErKyQ', //Replace with your API Key
		_videoCount = '10', // Number of videos you want to pull from YouTube playlist.
		_vList = $('#videoWrap'), // Video carousel div.
		_featureVideo; // Default video on page landing.

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
```

#### Styles used in this demo. (_We can skin this data as required right?_)


```css
  *{
    margin:0;
    padding: 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }
  body {
      font-family: Helvetica Neue, Helvetica, Roboto, Arial, sans-serif;
      font-style: normal;
      font-weight: 400;
      color: inherit;
      text-rendering: optimizeLegibility;
      background: #111;
  }
  a{
    cursor: pointer;
  }
  img{
    max-width: 100%;
  }

  #mainVideo {
      background: #ccc;
      padding: 20px;
  }

  .mainvideo-inner {
      margin: 0 auto;
      max-width: 1000px;
      width: 100%;
  }

  .main-frame {
      position: relative;
      padding-bottom: 56.25%;
      /* 16:9 */
      padding-top: 20px;
      height: 0;
  }

  .main-frame iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
  }

  .video-list {
      margin: 0 auto;
      margin-top: 20px;
      max-width: 1000px;
      width: 100%;
      position: relative;
      padding-bottom:70px;
  }

  .video-list h5 {
      font-size: 15px;
      margin-top: 15px;
      color: #f0f0f0;
      font-weight: normal;
  }

  .swiper-container {
      position: static;
  }

  .swiper-button-prev {
      left: -50px;
      top:25%;
  }

  .swiper-button-next {
      right: -50px;
      top:25%;
  }
  .swiper-pagination-bullet{
    background: #cecece;
  }
  .error-loading{
    font-size: 22px;
    text-align: center;
    padding: 10% 20px;
    text-transform: uppercase;
    position: fixed;
    left: 0;
    right:0;
    top: 0;
    background: rgba(255, 0, 0, 0.75);
    color: #fff;
    display: none;
    bottom: 0;
  }
  body.error .video-list{
    display: none;
  }
  @media all and (max-width:1023px) {
      .video-list {
          padding: 0 50px;
      }
      .swiper-button-prev {
          left: 10px;
      }
      .swiper-button-next {
          right: 10px;
      }
      .swiper-pagination{
        display: none;
      }
  }
```

#### What is in progress?.
 1. Active state of current video.
 2. Auto play one after another.

### Stuff used to make this:

 * jQuery library
 * [Swiper](http://idangero.us/swiper/#.WN-zuPl96Uk) for awesome carousel
