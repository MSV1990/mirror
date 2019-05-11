const markup = `
<form class="search" id="form" onsubmit="return false;">
  <input type="text" placeholder="Search for videos..." name="search" id="search">
  <button type="submit" id="submit-btn"><i class="fas fa-search"></i></button>
</form>
<ul></ul>
`;
document.body.innerHTML = markup;
const apikey = 'AIzaSyAFhDSkr_31sGDXqTA-VMcMbGLUKfvmeqE';
const submit = document.getElementById('submit-btn');
let searchRequest = 'none';
let promised = 'none';
let objects = 'none';
submit.addEventListener('click', () => {
  searchRequest = document.getElementById('search').value;
  promised = fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey}&type=video&part=snippet&maxResults=50&q=${searchRequest}`);
});
