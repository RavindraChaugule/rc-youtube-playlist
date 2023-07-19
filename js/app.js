document.addEventListener("DOMContentLoaded", () => {
  var _playListId = "AIzaSyDMv_Advye11OsLEyXTV6R1DhZ3xWErKyQ",
    _apiKey = "AIzaSyBpcdMJAfGkjnOvWmQyhEbdDORrUphuz3M",
    _videoCount = "10",
    _vList = document.getElementById("videoWrap"),
    _featureVideo;

  // URL contains playlist ID and API key
  // Returns JSON data for YouTube videos and details.
  // Generate or modify URL with multiple parameter here : https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.playlistItems.list
  var playListUrl = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=" + _videoCount + "&playlistId=" + _playListId + "&fields=items(snippet(resourceId%2FvideoId%2Cthumbnails%2Fmedium%2Furl%2Ctitle))&key=" + _apiKey;

  fetch(playListUrl)
    .then(function (response) {
      // console.log("success!", response);
      return response.json();
    })
    .then(function (data) {
      // This is the JSON from our response
      // console.log(data);
      var newVideoListHtml = "";
      for (const [i, item] of Object.entries(data.items)) {
        // Append list of Video thumbnail image,
        // Video ID and Video title wrapped in HTML template.
        newVideoListHtml += '<div class="swiper-slide"><div class="video-thumb"><a class="item-link" data-href="' + item.snippet.resourceId.videoId + '"><img src="' + item.snippet.thumbnails.medium.url + '"></a></div><h5>' + item.snippet.title + "</h5></div>";
      }

      _vList.innerHTML = newVideoListHtml;

      // Setting default video
      // For now we are setting first video as default video
      _featureVideo = data.items[0].snippet.resourceId.videoId;
      document.getElementById("mvFrame").setAttribute("src", "https://www.youtube.com/embed/" + _featureVideo);

      // Swiper carousel for thumbnail list
      // https://swiperjs.com/get-started#initialize-swiper
      var swiper = new Swiper(".swiper-container", {
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true
        },
        // direction: "vertical",
        slidesPerView: 5,
        spaceBetween: 20,
        // Navigation arrows
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
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

      // Change main video from carousel list
      swiper.on("slideChange", function () {
        _featureVideo = this.slides[this.realIndex];
        _featureVideo = _featureVideo.getElementsByClassName("item-link")[0].getAttribute("data-href");
        document.getElementById("mvFrame").setAttribute("src", "https://www.youtube.com/embed/" + _featureVideo);
      });
    })
    .catch(function (err) {
      // There was an error
      console.log(err);
      document.body.classList.add("error");
    });
});
