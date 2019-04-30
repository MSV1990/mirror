//variables
let bucket  = document.getElementById('bucket'),
picker = document.getElementById('picker'),
move = document.getElementById('move'),
transform = document.getElementById('transform'),
currentColor = document.getElementById('currentColor'),
previousColor = document.getElementById('previousColor'),
currentTool = 'none',
prevColor = document.getElementById('prevCol').style.backgroundColor,
curColor = document.getElementById('curCol').style.backgroundColor,
theInput = document.getElementById("color");

function clearLocal(){
    localStorage.clear();
}
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
    
}
    );
//color picker func
document.addEventListener('click', (event)=> {
        if(currentTool == 'picker' && event.target.style.backgroundColor !== ''
        && event.target.id !== 'picker'){
            prevColor = curColor;
            prevCol.style.backgroundColor = curColor;
            curColor = event.target.style.backgroundColor;
            curCol.style.backgroundColor = curColor;
            
        }
        
} );
// select color input
   theInput.addEventListener("input", function() {
    theColor = theInput.value;
    prevColor = curColor;
    prevCol.style.backgroundColor = curColor;
    curColor = theColor;
    curCol.style.backgroundColor = theColor;
    
    });

//tools functions
   function justDoIt(){
        if(currentTool == 'bucket'){
            event.target.style.backgroundColor = curColor;
            let divId =  event.target.id;
            localStorage.setItem(divId,curColor );
        }
        if(currentTool == 'transform' &&  event.target.style.borderRadius == '130px'){
            event.target.style.borderRadius = '0';
            let divR =  event.target.id+'r';
            localStorage.setItem(divR,'o' );
        }
        else if(currentTool == 'transform'){
            event.target.style.borderRadius = '130px'; 
            let divR =  event.target.id+'r';
            localStorage.setItem(divR,'130px' );
        }
        if(currentTool == 'move'){
         
    }
}
img1.addEventListener('click', (event)=>{
    justDoIt() 
})

img2.addEventListener('click', (event)=>{
    justDoIt()
})
img3.addEventListener('click', (event)=>{
    justDoIt()
})
img4.addEventListener('click', (event)=>{
    justDoIt()
})
img5.addEventListener('click', (event)=>{
    justDoIt()
})
img6.addEventListener('click', (event)=>{
    justDoIt()
})
img7.addEventListener('click', (event)=>{
    justDoIt()
})
img8.addEventListener('click', (event)=>{
    justDoIt()
})
img9.addEventListener('click', (event)=>{
    justDoIt()
})
window.onload = function(){
    //saved tool 
    if(localStorage.getItem('currentTool') !== null){
        let tool = localStorage.getItem('currentTool');
        let color = localStorage.getItem('currentToolcolor');
        currentTool = tool;
        document.getElementById(tool).style.backgroundColor = color;
    }
    //saved bgcolor
    if(localStorage.getItem('img1') !== null){
       let img1color =  localStorage.getItem('img1');
       img1.style.backgroundColor = img1color;
    }
    if(localStorage.getItem('img2') !== null){
        let img2color =  localStorage.getItem('img2');
        img2.style.backgroundColor = img2color;
}
if(localStorage.getItem('img3') !== null){
    let img3color =  localStorage.getItem('img3');
    img3.style.backgroundColor = img3color;
}
if(localStorage.getItem('img4') !== null){
    let img4color =  localStorage.getItem('img4');
    img4.style.backgroundColor = img4color;
}
if(localStorage.getItem('img5') !== null){
    let img5color =  localStorage.getItem('img5');
    img5.style.backgroundColor = img5color;
}
    if(localStorage.getItem('img6') !== null){
        let img6color =  localStorage.getItem('img6');
        img6.style.backgroundColor = img6color;
    }
        if(localStorage.getItem('img7') !== null){
            let img7color =  localStorage.getItem('img7');
            img7.style.backgroundColor = img7color;
        }
            if(localStorage.getItem('img8') !== null){
                let img8color =  localStorage.getItem('img8');
                img8.style.backgroundColor = img8color;
            }
                if(localStorage.getItem('img9') !== null){
                    let img9color =  localStorage.getItem('img9');
                    img9.style.backgroundColor = img9color;
                }
                //saved transform
                if(localStorage.getItem('img1r') !== null){
                    let img1r =  localStorage.getItem('img1r');
                    img1.style.borderRadius = img1r;
                 }
                 if(localStorage.getItem('img2r') !== null){
                     let img2r =  localStorage.getItem('img2r');
                     img2.style.borderRadius = img2r;
             }
             if(localStorage.getItem('img3r') !== null){
                 let img3r =  localStorage.getItem('img3r');
                 img3.style.borderRadius = img3r;
             }
             if(localStorage.getItem('img4r') !== null){
                 let img4r =  localStorage.getItem('img4r');
                 img4.style.borderRadius = img4r;
             }
             if(localStorage.getItem('img5r') !== null){
                 let img5r =  localStorage.getItem('img5r');
                 img5.style.borderRadius = img5r;
             }
                 if(localStorage.getItem('img6r') !== null){
                     let img6r =  localStorage.getItem('img6r');
                     img6.style.borderRadius = img6r;
                 }
                     if(localStorage.getItem('img7r') !== null){
                         let img7r =  localStorage.getItem('img7r');
                         img7.style.borderRadius = img7r;
                     }
                         if(localStorage.getItem('img8r') !== null){
                             let img8r =  localStorage.getItem('img8r');
                             img8.style.borderRadius = img8r;
                         }
                             if(localStorage.getItem('img9r') !== null){
                                 let img9r =  localStorage.getItem('img9r');
                                 img9.style.borderRadius = img9r;
                             }
            }