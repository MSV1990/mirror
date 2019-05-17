let message = '';
const markup = `
<div id="loader"></div>
<div class="logo" id="logo"></div>
<form class="search" id="form" onsubmit="return false;">
  <input type="text" placeholder="Search for videos..." name="search" id="search">
  <button type="submit" id="submit-btn"><i class="fas fa-search"></i></button>
</form>
<ul id="ul" class="video-list">
</ul><div class="popup">
<span class="popuptext" class='show' id="myPopup"></span>
</div>

`;
document.body.innerHTML = markup;
let nextPageToken = 'undefined';
let theEnd = false;
const logo = document.getElementById('logo');
const loader = document.getElementById('loader');
const container = document.getElementById('ul');
const apikey = 'AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y';// 'AIzaSyAFhDSkr_31sGDXqTA-VMcMbGLUKfvmeqE'
const submit = document.getElementById('submit-btn');
let searchRequest = false;
const popup = document.getElementById('myPopup');
let objectr1 = false;
let objectr2 = false;
let objectr3 = false;
let objectr4 = false;
let searchVideoId = [];

//  throttle for scroll
function throttle(fn, wait) {
  let time = Date.now();
  return () => {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  };
}
//  load more results function
function loadMore() {
  if ((container.scrollLeft + container.clientWidth + 1400) >= container.scrollWidth
    && nextPageToken !== 'undefined' && !theEnd) {
    popup.classList.remove('show');
    loader.style.display = 'block';
    fetch(`https://www.googleapis.com/youtube/v3/search?pageToken=${nextPageToken}&key=${apikey}&type=video&part=snippet&order=viewCount&maxResults=15&q=${searchRequest}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok :(( ');
      })
      .then((data) => {
        if (data.items.length === 0) {
          theEnd = true;
        }
        nextPageToken = `${data.nextPageToken}`;
        objectr3 = data;
        for (let i = 0; i < data.items.length; i += 1) {
          searchVideoId.push(data.items[i].id.videoId);
        }

        fetch(`https://www.googleapis.com/youtube/v3/videos?key=${apikey}&id=${searchVideoId}&part=snippet,statistics`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Network response was not ok :(( ');
          })
          .then((data2) => {
            objectr4 = data2;
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
            searchVideoId = [];
            loader.style.display = 'none';
          });
      })
      .catch((error) => {
        loader.style.display = 'none';
        message = `>>>>There has been a problem: ${error.message}<<<<`;
        popup.innerHTML = `${message}`;
        popup.classList.toggle('show');
      });
  }
}

//  initial function for search request
function init() {
  fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey}&type=video&part=snippet&order=viewCount&maxResults=15&q=${searchRequest}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok :(( ');
    })
    .then((data) => {
      if (data.items.length === 0) {
        theEnd = true;
        message = '>>>>Nothing found<<<<';
        popup.innerHTML = `${message}`;
        popup.classList.toggle('show');
      }

      objectr1 = data;
      nextPageToken = `${data.nextPageToken}`;
      for (let i = 0; i < data.items.length; i += 1) {
        searchVideoId.push(data.items[i].id.videoId);
      }


      fetch(`https://www.googleapis.com/youtube/v3/videos?key=${apikey}&id=${searchVideoId}&part=snippet,statistics`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok :(( ');
        })
        .then((data2) => {
          objectr2 = data2;
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
          logo.style.display = 'none';
          searchVideoId = [];
        });
    })
    .catch((error) => {
      loader.style.display = 'none';
      message = `>>>>There has been a problem: ${error.message}<<<<`;
      popup.innerHTML = `${message}`;
      popup.classList.toggle('show');
    });
}

//  >>>>>> Start <<<<<<<<<
submit.addEventListener('click', () => {
  if (document.getElementById('search').value !== searchRequest) {
    popup.classList.remove('show');
    loader.style.display = 'block';
    searchRequest = document.getElementById('search').value;
    container.innerHTML = '';
    init();
  }
});

//  hide popup message on click
popup.addEventListener('click', () => popup.classList.remove('show'));

//  load more results with scroll throttle
container.addEventListener('scroll', throttle(loadMore, 300));

//  grab scroll section
let isDown = false;
let startX;
let scrollLeft;

container.addEventListener('mousedown', (e) => {
  isDown = true;
  container.classList.add('active');
  startX = e.pageX - container.offsetLeft;
  scrollLeft = `${container.scrollLeft}`;
});
container.addEventListener('mouseleave', () => {
  isDown = false;
  container.classList.remove('active');
});
container.addEventListener('mouseup', () => {
  isDown = false;
  container.classList.remove('active');
});
container.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = (x - startX) - 1000; // scroll-fast
  container.scrollLeft = (scrollLeft - walk);
});
