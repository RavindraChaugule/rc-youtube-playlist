# YouTube Videos Gallery `rc-youtube-playlist`

This is YouTube videos gallery for website. It pulls the videos from YouTube playlist and show it on your website with custom look. It is responsive and customizable.

## [Demo](https://ravindrachaugule.github.io/rc-youtube-playlist/index.html) (Currently not working due to expired API key)

![Custom yotube playlist](/screenshot.png "Custom yotube playlist")

## Step by Step

 1. Create API key using your Google account: https://console.developers.google.com/
 2. Enable the API for further usage. Link to enable API can be seen on Dashboard header.
 3. Now create JSON resonse from Google APIs Explorer https://developers.google.com/
 4. Go to **Services > YouTube Data API v3 > youtube.playlistItems.list**
 5. In "Part" field add "**snippet**" string. It is a JSON object name that contains all the data we need.
 6. In "playlistId" field add "**{YouTube Playlist ID}**". It is a text and numbers combination at the end of your playlist. E.g https://www.youtube.com/playlist?list= {YouTube Playlist ID}
 7. Now click on "**Execute**"
 8. It creates **Request** and **Response**. GET URL and JSON response respectively.
 9. **{YOUR_API_KEY}** at the end of **Request** URL is import to work with this feature. Refer point number one for creating API key.
 10. Once we have Request URL with JSON response, we can play with it as we want. For example see [Demo](https://ravindrachaugule.github.io/rc-youtube-playlist/index.html).

## What is in progress?

 1. Active state of current video.
 2. Auto play one after another.

## Used to make this

* [Swiper](http://idangero.us/swiper/#.WN-zuPl96Uk) for awesome carousel
* YouTube Data API V3
