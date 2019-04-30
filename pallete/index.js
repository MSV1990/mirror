


//select tool with shortcut
document.onkeyup = function(e) {
    if (e.ctrlKey && e.altKey && e.keyCode == 80) {
       currentTool = 'picker'; //ctrl+alt+p
       picker.style.backgroundColor = '#eee';
       bucket.style.backgroundColor = '';
       transform.style.backgroundColor = '';
       move.style.backgroundColor = '';
       localStorage.setItem('currentTool', 'picker');
localStorage.setItem('currentToolcolor', '#eee');
    }
      if (e.ctrlKey && e.altKey && e.keyCode == 66) {
        currentTool = 'bucket'; //ctrl+alt+b
        picker.style.backgroundColor = '';
       bucket.style.backgroundColor = '#eee';
       transform.style.backgroundColor = '';
       move.style.backgroundColor = '';
       localStorage.setItem('currentTool', 'bucket');
localStorage.setItem('currentToolcolor', '#eee');
      }
      if (e.ctrlKey && e.altKey && e.keyCode == 77) {
          currentTool = 'move'; //ctrl+alt+m
          picker.style.backgroundColor = '';
          bucket.style.backgroundColor = '';
          transform.style.backgroundColor = '';
          move.style.backgroundColor = '#eee';
          localStorage.setItem('currentTool', 'move');
localStorage.setItem('currentToolcolor', '#eee');
      }
      if (e.ctrlKey && e.altKey && e.keyCode == 84) {
          currentTool = 'transform'; //ctrl+alt+t
          picker.style.backgroundColor = '';
          bucket.style.backgroundColor = '';
          transform.style.backgroundColor = '#eee';
          move.style.backgroundColor = '';
          localStorage.setItem('currentTool', 'transform');
          localStorage.setItem('currentToolcolor', '#eee');
      }
    };

    //select tool
picker.addEventListener('click', () => {
    currentTool = 'picker';
picker.style.backgroundColor = '#eee';
bucket.style.backgroundColor = '';
transform.style.backgroundColor = '';
move.style.backgroundColor = '';
localStorage.setItem('currentTool', 'picker');
localStorage.setItem('currentToolcolor', '#eee');
});

bucket.addEventListener('click', ()=> {
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
transform.addEventListener('click', ()=> {
    currentTool = 'transform';
    picker.style.backgroundColor = '';
bucket.style.backgroundColor = '';
transform.style.backgroundColor = '#eee';
move.style.backgroundColor = '';
localStorage.setItem('currentTool', 'transform');
localStorage.setItem('currentToolcolor', '#eee');
});

//set previous color as current
previousColor.addEventListener('click', ()=> {
    curColor = prevColor;
    curCol.style.backgroundColor = prevColor;
    localStorage.setItem('currentColor',curColor);
    
}
    );