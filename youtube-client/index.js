const markup = `<div class="wrapper">
<div id="loader"></div>
<form class="search" id="form" onsubmit="return false;">
  <input type="text" placeholder="Search for videos..." name="search" id="search">
  <button type="submit" id="submit-btn"><i class="fas fa-search"></i></button>
</form>
<ul id="ul" class="video-list"></ul>
</div>
`;
document.body.innerHTML = markup;
let nextPage = false;
const loader = document.getElementById('loader');
const container = document.getElementById('ul');
const apikey = 'AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y';// 'AIzaSyAFhDSkr_31sGDXqTA-VMcMbGLUKfvmeqE';//
const submit = document.getElementById('submit-btn');
let searchRequest = false;
let objectr = false;
let searchVideoId = [];
function init() {
  fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey}&type=video&part=snippet&order=viewCount&maxResults=50&q=${searchRequest}`)
    .then(response => response.json())
    .then((data) => {
      nextPage = `https://www.googleapis.com/youtube/v3/search?pageToken=${data.nextPageToken}&key=${apikey}&type=video&part=snippet&order=viewCount&maxResults=50&q=${searchRequest}`;
      for (let i = 0; i < data.items.length; i += 1) {
        searchVideoId.push(data.items[i].id.videoId);
      }

      fetch(`https://www.googleapis.com/youtube/v3/videos?key=${apikey}&id=${searchVideoId}&part=snippet,statistics`)
        .then(response => response.json())
        .then((data2) => {
          objectr = data2;
          for (let i = 0; i < data2.items.length; i += 1) {
            const imgList = document.createElement('li');
            imgList.setAttribute('class', 'video-item');
            let date = data2.items[i].snippet.publishedAt;
            date = date.split('T');
            imgList.innerHTML = `<div class="video">
            <img class="video-preview" alt="preview-image" src="${data2.items[i].snippet.thumbnails.medium.url}"/>
            <div class="video-title"><a target="_blank" href=https://www.youtube.com/watch?v=${data2.items[i].id}>${data2.items[i].snippet.title}</a></div>
            <div class="video-info">
            <div class="video-info-channel-name"><i class="fas fa-user"></i> ${data2.items[i].snippet.channelTitle}</div>
            <div class="video-info-date"><i class="far fa-calendar-alt"></i> ${date[0]}</div>
            <div class="video-info-view-count"><i class="far fa-eye"></i> ${data2.items[i].statistics.viewCount}</div>
            </div>
            <div class="video-description">${data2.items[i].snippet.description}</div>
            </div>`;
            container.appendChild(imgList);
          }
          loader.style.display = 'none';
        });
    });
}

submit.addEventListener('click', () => {
  if (document.getElementById('search').value !== searchRequest) {
    loader.style.display = 'block';
    searchVideoId = [];
    searchRequest = document.getElementById('search').value;
    container.innerHTML = '';
    init();
  }
});
/* <div class="title-link"><a target="_blank" href=https://www.youtube.com/watch?v=${data2.items[i].id}>${data2.items[i].snippet.title}</a></div>
            <div class="publish-date">${date[0]}</div>
            <div class="view-count">${data2.items[i].statistics.viewCount}</div>
            <div class="channel-name">${data2.items[i].snippet.channelTitle}</div> */
