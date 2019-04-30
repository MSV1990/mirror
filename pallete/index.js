/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
// variables
const bucket = document.getElementById('bucket');
const picker = document.getElementById('picker');
const move = document.getElementById('move');
const transform = document.getElementById('transform');
const previousColor = document.getElementById('previousColor');
let currentTool = 'none';
let prevColor = document.getElementById('prevCol').style.backgroundColor;
let curColor = document.getElementById('curCol').style.backgroundColor;
const theInput = document.getElementById('color');
const prevCol = document.getElementById('prevCol');
const curCol = document.getElementById('curCol');
const clearAll = document.getElementById('clearAll');

clearAll.addEventListener('click', () => {
  localStorage.clear();
});
// select tool with shortcut
document.onkeyup = function (e) {
  if (e.ctrlKey && e.altKey && e.keyCode == 80) {
    currentTool = 'picker'; // ctrl+alt+p
    picker.style.backgroundColor = '#eee';
    bucket.style.backgroundColor = '';
    transform.style.backgroundColor = '';
    move.style.backgroundColor = '';
    localStorage.setItem('currentTool', 'picker');
    localStorage.setItem('currentToolcolor', '#eee');
  }
  if (e.ctrlKey && e.altKey && e.keyCode == 66) {
    currentTool = 'bucket'; // ctrl+alt+b
    picker.style.backgroundColor = '';
    bucket.style.backgroundColor = '#eee';
    transform.style.backgroundColor = '';
    move.style.backgroundColor = '';
    localStorage.setItem('currentTool', 'bucket');
    localStorage.setItem('currentToolcolor', '#eee');
  }
  if (e.ctrlKey && e.altKey && e.keyCode == 77) {
    currentTool = 'move'; // ctrl+alt+m
    picker.style.backgroundColor = '';
    bucket.style.backgroundColor = '';
    transform.style.backgroundColor = '';
    move.style.backgroundColor = '#eee';
    localStorage.setItem('currentTool', 'move');
    localStorage.setItem('currentToolcolor', '#eee');
  }
  if (e.ctrlKey && e.altKey && e.keyCode == 84) {
    currentTool = 'transform'; // ctrl+alt+t
    picker.style.backgroundColor = '';
    bucket.style.backgroundColor = '';
    transform.style.backgroundColor = '#eee';
    move.style.backgroundColor = '';
    localStorage.setItem('currentTool', 'transform');
    localStorage.setItem('currentToolcolor', '#eee');
  }
};

// select tool
picker.addEventListener('click', () => {
  currentTool = 'picker';
  picker.style.backgroundColor = '#eee';
  bucket.style.backgroundColor = '';
  transform.style.backgroundColor = '';
  move.style.backgroundColor = '';
  localStorage.setItem('currentTool', 'picker');
  localStorage.setItem('currentToolcolor', '#eee');
});

bucket.addEventListener('click', () => {
  currentTool = 'bucket';
  picker.style.backgroundColor = '';
  bucket.style.backgroundColor = '#eee';
  transform.style.backgroundColor = '';
  move.style.backgroundColor = '';
  localStorage.setItem('currentTool', 'bucket');
  localStorage.setItem('currentToolcolor', '#eee');
});
move.addEventListener('click', () => {
  currentTool = 'move';
  picker.style.backgroundColor = '';
  bucket.style.backgroundColor = '';
  transform.style.backgroundColor = '';
  move.style.backgroundColor = '#eee';
  localStorage.setItem('currentTool', 'move');
  localStorage.setItem('currentToolcolor', '#eee');
});
transform.addEventListener('click', () => {
  currentTool = 'transform';
  picker.style.backgroundColor = '';
  bucket.style.backgroundColor = '';
  transform.style.backgroundColor = '#eee';
  move.style.backgroundColor = '';
  localStorage.setItem('currentTool', 'transform');
  localStorage.setItem('currentToolcolor', '#eee');
});

// set previous color as current
previousColor.addEventListener('click', () => {
  curColor = prevColor;
  curCol.style.backgroundColor = prevColor;
});
// color picker func
document.addEventListener('click', (event) => {
  if (currentTool === 'picker' && event.target.style.backgroundColor !== ''
        && event.target.id !== 'picker') {
    prevColor = curColor;
    prevCol.style.backgroundColor = curColor;
    curColor = event.target.style.backgroundColor;
    curCol.style.backgroundColor = curColor;
  }
});
// select color input
theInput.addEventListener('input', () => {
  const theColor = theInput.value;
  prevColor = curColor;
  prevCol.style.backgroundColor = curColor;
  curColor = theColor;
  curCol.style.backgroundColor = theColor;
});

// tools functions
function justDoIt(event) {
  if (currentTool === 'bucket') {
    event.target.style.backgroundColor = curColor;
    const divId = event.target.id;
    localStorage.setItem(divId, curColor);
  }
  if (currentTool === 'transform' && event.target.style.borderRadius === '130px') {
    event.target.style.borderRadius = '0';
    const divR = `${event.target.id}r`;
    localStorage.setItem(divR, 'o');
  } else if (currentTool === 'transform') {
    event.target.style.borderRadius = '130px';
    const divR = `${event.target.id}r`;
    localStorage.setItem(divR, '130px');
  }
  if (currentTool === 'move') {
    const div = document.getElementById(event.target.id);
    function getCoords(){};
    div.onmousedown = function (e) {
      const coords = getCoords(div);
      const shiftX = e.pageX - coords.left;
      const shiftY = e.pageY - coords.top;

      div.style.position = 'absolute';
      moveAt(e);

      div.style.zIndex = 1000;

      function moveAt(e) {
        div.style.left = `${e.pageX - shiftX}px`;
        div.style.top = `${e.pageY - shiftY}px`;
      }

      document.onmousemove = function (e) {
        moveAt(e);
      };

      div.onmouseup = function () {
        document.onmousemove = null;
        div.onmouseup = null;
      };
    };

    div.ondragstart = function () {
      return false;
    };

    function getCoords(elem) {
      const box = elem.getBoundingClientRect();
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset,
      };
    }
  }
}
img1.addEventListener('click', (event) => {
  justDoIt(event);
});

img2.addEventListener('click', (event) => {
  justDoIt(event);
});
img3.addEventListener('click', (event) => {
  justDoIt(event);
});
img4.addEventListener('click', (event) => {
  justDoIt(event);
});
img5.addEventListener('click', (event) => {
  justDoIt(event);
});
img6.addEventListener('click', (event) => {
  justDoIt(event);
});
img7.addEventListener('click', (event) => {
  justDoIt(event);
});
img8.addEventListener('click', (event) => {
  justDoIt(event);
});
img9.addEventListener('click', (event) => {
  justDoIt(event);
});
window.onload = function saved() {
  // saved tool
  if (localStorage.getItem('currentTool') !== null) {
    const tool = localStorage.getItem('currentTool');
    const color = localStorage.getItem('currentToolcolor');
    currentTool = tool;
    document.getElementById(tool).style.backgroundColor = color;
  }
  // saved bgcolor
  if (localStorage.getItem('img1') !== null) {
    const img1color = localStorage.getItem('img1');
    img1.style.backgroundColor = img1color;
  }
  if (localStorage.getItem('img2') !== null) {
    const img2color = localStorage.getItem('img2');
    img2.style.backgroundColor = img2color;
  }
  if (localStorage.getItem('img3') !== null) {
    const img3color = localStorage.getItem('img3');
    img3.style.backgroundColor = img3color;
  }
  if (localStorage.getItem('img4') !== null) {
    const img4color = localStorage.getItem('img4');
    img4.style.backgroundColor = img4color;
  }
  if (localStorage.getItem('img5') !== null) {
    const img5color = localStorage.getItem('img5');
    img5.style.backgroundColor = img5color;
  }
  if (localStorage.getItem('img6') !== null) {
    const img6color = localStorage.getItem('img6');
    img6.style.backgroundColor = img6color;
  }
  if (localStorage.getItem('img7') !== null) {
    const img7color = localStorage.getItem('img7');
    img7.style.backgroundColor = img7color;
  }
  if (localStorage.getItem('img8') !== null) {
    const img8color = localStorage.getItem('img8');
    img8.style.backgroundColor = img8color;
  }
  if (localStorage.getItem('img9') !== null) {
    const img9color = localStorage.getItem('img9');
    img9.style.backgroundColor = img9color;
  }
  // saved transform
  if (localStorage.getItem('img1r') !== null) {
    const img1r = localStorage.getItem('img1r');
    img1.style.borderRadius = img1r;
  }
  if (localStorage.getItem('img2r') !== null) {
    const img2r = localStorage.getItem('img2r');
    img2.style.borderRadius = img2r;
  }
  if (localStorage.getItem('img3r') !== null) {
    const img3r = localStorage.getItem('img3r');
    img3.style.borderRadius = img3r;
  }
  if (localStorage.getItem('img4r') !== null) {
    const img4r = localStorage.getItem('img4r');
    img4.style.borderRadius = img4r;
  }
  if (localStorage.getItem('img5r') !== null) {
    const img5r = localStorage.getItem('img5r');
    img5.style.borderRadius = img5r;
  }
  if (localStorage.getItem('img6r') !== null) {
    const img6r = localStorage.getItem('img6r');
    img6.style.borderRadius = img6r;
  }
  if (localStorage.getItem('img7r') !== null) {
    const img7r = localStorage.getItem('img7r');
    img7.style.borderRadius = img7r;
  }
  if (localStorage.getItem('img8r') !== null) {
    const img8r = localStorage.getItem('img8r');
    img8.style.borderRadius = img8r;
  }
  if (localStorage.getItem('img9r') !== null) {
    const img9r = localStorage.getItem('img9r');
    img9.style.borderRadius = img9r;
  }
};
