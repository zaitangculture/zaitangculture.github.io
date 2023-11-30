// click to turn off lights
var r = 1 //rate of change in seconds
var b = document.querySelector('body')

function clone(){
  var s = document.querySelector('svg')
  var cln = s.cloneNode(true)
  b.appendChild(cln)
}

clone()
clone()
clone()
clone()

setInterval(function(){
  var tree = document.querySelectorAll('svg')
  for(var i=0;i<tree.length;i++){
    tree[i].style.transition = r+"s"
    tree[i].style.filter = "hue-rotate("+Math.floor(Math.random()*360)+"deg)"  
    tree[i].style.transform = "scale("+(Math.random()+.1)+")"    
  }  
},r*1000)

window.addEventListener('click', function(){
  if(b.className == "dark") {
    b.className = ""  
  } else {
    b.className = "dark"  
  }  
})