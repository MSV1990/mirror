let message = '';
const markup = `
<div id="loader"></div>
<div class="logo" id="logo"></div>
<form class="search" id="form" onsubmit="return false;">
  <input type="text" placeholder="Search for videos..." name="search" id="search">
  <button type="submit" id="submit-btn"><i class="fas fa-search"></i></button>
</form>
<ul id="ul" class="video-list">
</ul>
<div class="popup">
    <span class="popuptext" class='show' id="myPopup"></span>
    </div>
    <div><a class="prev" id=prev>&#10094;</a>
    <a class="next" id=next>&#10095;</a>
    </div>;
    <div class="controls" id="controls">
  <span class="dot" id="dotFirst">1</span>
  <span class="dot" id="dotPrev"></span>
  <span class="dot" id="dotCurr"></span>
  <span class="dot" id="dotLast"></span>
`;
document.body.innerHTML = markup;
let nextPageToken;
const dotPrev = document.getElementById('dotPrev');
const dotCurr = document.getElementById('dotCurr');
const controls = document.getElementById('controls');
const dotFirst = document.getElementById('dotFirst');
let currentPage;
const dotLast = document.getElementById('dotLast');
let theEnd = false;
const logo = document.getElementById('logo');
const loader = document.getElementById('loader');
const container = document.getElementById('ul');
const apikey = 'AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y';// 'AIzaSyAFhDSkr_31sGDXqTA-VMcMbGLUKfvmeqE'
const submit = document.getElementById('submit-btn');
let searchRequest = false;
const popup = document.getElementById('myPopup');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let searchVideoId = [];
let itemsPerPage = Math.floor(container.clientWidth / 320);
let calculatedItemWidth = container.clientWidth / itemsPerPage - 10;
let resizedItems;

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
  if ((container.scrollLeft + (container.clientWidth * 2)) >= container.scrollWidth
    && nextPageToken && !theEnd) {
    popup.classList.remove('show');

    loader.style.display = 'block';
    searchVideoId = [];
    fetch(`https://www.googleapis.com/youtube/v3/search?pageToken=${nextPageToken}&key=${apikey}&type=video&part=snippet&order=viewCount&maxResults=15&q=${searchRequest}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok :(( ');
      })
      .then((data) => {
        nextPageToken = `${data.nextPageToken}`;
        data.items.forEach((el) => {
          searchVideoId.push(el.id.videoId);
        });

        fetch(`https://www.googleapis.com/youtube/v3/videos?key=${apikey}&id=${searchVideoId}&part=snippet,statistics`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Network response was not ok :(( ');
          })
          .then((data2) => {
            data2.items.forEach((el) => {
              const imgList = document.createElement('li');
              imgList.setAttribute('class', 'video-item');
              imgList.setAttribute('style', `width:${calculatedItemWidth}px`);
              let date = el.snippet.publishedAt;
              date = date.split('T');
              imgList.innerHTML = `<div class="video">
          <img class="video-preview" alt="preview-image" src="${el.snippet.thumbnails.medium.url}"/>
          <div class="video-title"><a target="_blank" href=https://www.youtube.com/watch?v=${el.id}>${el.snippet.title}</a></div>
          <div class="video-info">
          <div class="video-info-channel-name"><i class="fas fa-user"></i> ${el.snippet.channelTitle}</div>
          <div class="video-info-date"><i class="far fa-calendar-alt"></i> ${date[0]}</div>
          <div class="video-info-view-count"><i class="far fa-eye"></i> ${el.statistics.viewCount}</div>
          </div>
          <div class="video-description">${el.snippet.description}</div>
          </div>`;
              container.appendChild(imgList);
            });
            if (container.scrollWidth > container.clientWidth) {
              next.classList.add('show');
            }

            searchVideoId = [];
            loader.style.display = 'none';
            dotLast.innerHTML = Math.ceil(container.scrollWidth / container.clientWidth);
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

// calculate pages after resize and item width
window.addEventListener('resize', () => {
  dotLast.innerHTML = Math.ceil(container.scrollWidth / container.clientWidth);
  currentPage = Math.ceil(container.scrollLeft / container.clientWidth);
  itemsPerPage = Math.floor(container.clientWidth / 320);
  calculatedItemWidth = container.clientWidth / itemsPerPage - 10;
  currentPage = Math.ceil((container.scrollLeft) / container.clientWidth);
  resizedItems = document.getElementsByClassName('video-item');
  for (let i = 0; i < resizedItems.length; i += 1) {
    resizedItems[i].style.width = `${calculatedItemWidth}px`;
  }

  if (currentPage <= 0) {
    dotPrev.innerHTML = '';
  } else { dotPrev.innerHTML = currentPage; }
  dotCurr.innerHTML = currentPage + 1;
});

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

      nextPageToken = `${data.nextPageToken}`;
      searchVideoId = [];
      data.items.forEach((el) => {
        searchVideoId.push(el.id.videoId);
      });

      fetch(`https://www.googleapis.com/youtube/v3/videos?key=${apikey}&id=${searchVideoId}&part=snippet,statistics`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok :(( ');
        })
        .then((data2) => {
          data2.items.forEach((el) => {
            const imgList = document.createElement('li');
            imgList.setAttribute('class', 'video-item');
            imgList.setAttribute('style', `width:${calculatedItemWidth}px`);
            let date = el.snippet.publishedAt;
            date = date.split('T');
            imgList.innerHTML = `<div class="video">
        <img class="video-preview" alt="preview-image" src="${el.snippet.thumbnails.medium.url}"/>
        <div class="video-title"><a target="_blank" href=https://www.youtube.com/watch?v=${el.id}>${el.snippet.title}</a></div>
        <div class="video-info">
        <div class="video-info-channel-name"><i class="fas fa-user"></i> ${el.snippet.channelTitle}</div>
        <div class="video-info-date"><i class="far fa-calendar-alt"></i> ${date[0]}</div>
        <div class="video-info-view-count"><i class="far fa-eye"></i> ${el.statistics.viewCount}</div>
        </div>
        <div class="video-description">${el.snippet.description}</div>
        </div>`;
            container.appendChild(imgList);
          });

          if (container.scrollWidth > container.clientWidth) {
            next.classList.add('show');
          }
          container.scrollLeft = 10;
          controls.style.visibility = 'visible';
          dotLast.innerHTML = Math.ceil(container.scrollWidth / container.clientWidth);
          dotCurr.innerHTML = 1;
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
    controls.style.visibility = 'invisible';
    dotCurr.innerHTML = '';
    dotPrev.innerHTML = '';
    dotLast.innerHTML = '';
    next.classList.remove('show');
    prev.classList.remove('show');
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
container.addEventListener('scroll', throttle(loadMore, 500));

//   show/hide prev next buttons + calculate page number
container.addEventListener('scroll', () => {
  if (container.scrollLeft > 320) {
    prev.classList.add('show');
  }
  if (container.scrollLeft < 320) {
    dotPrev.innerHTML = '';
    prev.classList.remove('show');
    dotCurr.innerHTML = 1;
  }
  if (container.scrollLeft >= container.clientWidth) {
    currentPage = Math.floor((container.scrollLeft) / container.clientWidth);
    dotPrev.innerHTML = currentPage;
    dotCurr.innerHTML = currentPage + 1;
  }
  if (container.scrollWidth === container.scrollLeft + container.clientWidth) {
    next.classList.remove('show');
  }
  if (container.scrollWidth > container.scrollLeft + container.clientWidth) {
    next.classList.add('show');
  }
});

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
  const walk = (x - startX) * 5; // scroll-fast
  container.scrollLeft = (scrollLeft - walk);
});

next.addEventListener('click', () => {
  container.scrollLeft += container.clientWidth;
});

prev.addEventListener('click', () => {
  container.scrollLeft -= container.clientWidth;
});

//  scroll previous
dotPrev.addEventListener('click', () => {
  container.scrollLeft = `${container.scrollLeft - container.clientWidth}`;
});

//  scroll next
dotCurr.addEventListener('click', () => {
  container.scrollLeft = `${container.scrollLeft + container.clientWidth}`;
});

//  scroll to first
dotFirst.addEventListener('click', () => {
  container.scrollLeft = 0;
});

//  scroll to last
dotLast.addEventListener('click', () => {
  container.scrollLeft = container.scrollWidth;
});
