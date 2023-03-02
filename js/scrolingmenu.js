const scrollFactor = 75
const scrollTime = 10;
var lis = [];
lis[0] = {
    title : "teste",
    subtitle : "teste subtitle",
    content : `<h2>Teste</h2>
    <h3>Teste Subtitle</h3>
    <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id est risus. Sed molestie leo in dolor volutpat, non volutpat ante posuere. Proin nec tortor non ex auctor scelerisque quis id massa. Pellentesque et ligula eget eros ultrices lobortis ac eu libero. Aliquam rutrum eros et venenatis vestibulum. Cras suscipit sem vel turpis dapibus, eu ullamcorper orci maximus. Cras sodales vulputate orci, vitae porta turpis posuere et. Nulla at elit nisl. Aenean gravida lobortis aliquet. Curabitur in erat dictum, viverra lorem ut, vehicula magna. Nunc non ipsum rutrum mauris laoreet eleifend.

            Maecenas sed sodales libero. Duis non quam egestas mauris suscipit cursus. Cras dui sapien, eleifend eget arcu ac, sollicitudin tempus nisi. Proin eget facilisis nibh. Suspendisse ut lorem rutrum, feugiat arcu et, euismod elit. Proin aliquam nibh eu turpis aliquam posuere. Ut sagittis orci interdum suscipit efficitur. Morbi facilisis massa vitae enim egestas tincidunt.
            
            Proin at cursus neque. Vivamus convallis at magna vestibulum hendrerit. Nullam aliquet vestibulum ultricies. Quisque ornare lacinia ligula in porta. Ut sollicitudin eget orci non pretium. Praesent vel tristique purus. Suspendisse eget pharetra tellus. 
    </p>`
}
var canScroll = true;
var lasttouchscale = 0;
var touchcounter = 0;
var touchsmother = 0;
var lastSmooth = true;
var scale
var ismouseIsOver = false;
document.querySelector('.Scrowlingmenu').parentElement.onnotvisible = function (e) {
    document.body.style.background = '#09040e';
}
document.querySelector('.Scrowlingmenu').parentElement.onvisible = function(e){
    var rect = document.querySelector('.holder').firstElementChild;
    t = rect;
    console.log(t)
    document.body.style.background = 'rgba(9, 4, 14, 1)';
    document.body.style.transition = 'background 0.8s ease-in-out';
    document.body.style.background = "linear-gradient(rgba(9, 4, 14, 0.8),rgba(9, 4, 14, 0.8)),url('"+t.dataset.img+"')";
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundSize = 'cover';
    t.style.color = 'white';
    t.style.padding ='10vh';
    t.style.paddingRight ='5vh';
    t.style.fontSize = 'calc((10vh + 10vw) /1.8)';
}
document.querySelector('.Scrowlingmenu').addEventListener("touchmove", scrollmenu, false);
document.querySelector('.itemDisplayContainer').onwheel = function(event) {
    event.stopPropagation();
}
document.querySelector('.itemDisplayContainer').addEventListener("touchmove",  function(event) {
    event.stopPropagation();
}, false);
document.querySelector('.Scrowlingmenu').onwheel  = scrollmenu;
document.querySelector('.holder').onmouseenter = function()   {
    ismouseIsOver = true;
    console.log(ismouseIsOver)
 };

 async function getfrompos(){

}
function scrollmenu(e){
    e.preventDefault();
    console.log(ismouseIsOver)
        if (!ismouseIsOver) {

        }
        if(e.type == 'touchmove'){
            var touch = e.touches[0] || e.changedTouches[0];
            var realTarget = (touch.clientY) ;
            if(lasttouchscale < realTarget){
                touchsmother +=  -1;
            }else{
                touchsmother += 1;
            }
            if(lastSmooth)
            lasttouchscale = realTarget;
            if(touchcounter<scrollTime){
                touchcounter++;
            }else{
                touchcounter = 0;
                if(touchsmother < 0){
                    scale = (scrollFactor * -1)/scrollTime;
                }else{
                    scale = (scrollFactor)/scrollTime;
                }
                touchsmother = 0;
            }
            document.getElementsByClassName('Scrowlingmenu')[0].scrollBy(0,scale)
            setvscrollm();
        }else{
                    if ( e.deltaY < 0 )
                        scale = (scrollFactor * -1);
                    else
                        scale = (scrollFactor);
                    canScroll = false;
                    document.getElementsByClassName('Scrowlingmenu')[0].scrollBy(0,scale)
            }
}
function resetsm(){
    try{
        t.style.color = '';
        t.style.fontSize = '';
        t.style.padding = ''
    }catch{}
}
function setvscrollm(){
    var rect = document.elementFromPoint(10, (document.body.offsetHeight* 0.55));
    setvscrollmaction(rect);
}
function setvscrollmaction(rect){
    if(!rect.classList.contains("Scrowlingmenu")){
        resetsm()
        t = rect;
    }
    document.body.style.transition = 'background 0.8s ease-in-out';
    document.body.style.background = "linear-gradient(rgba(9, 4, 14, 0.8),rgba(9, 4, 14, 0.8)),url('"+t.dataset.img+"')";
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundSize = 'cover';
    t.style.color = 'white';
    t.style.padding ='10vh';
    t.style.paddingRight ='5vh';
    t.style.fontSize = 'calc((10vh + 10vw) /1.8)';
}
function onclicksm(event){
    document.querySelector(".itemDisplayContainer").style.marginLeft = '0';
    var html = '<div class = "itemHero" Style = "background : linear-gradient(rgba(9, 4, 14, 1),rgba(9, 4, 14, 0.5)),url('+event.target.dataset.img+') ;    background-Position : center; background-Size : cover;">'
    html += '<div class = "title">'+lis[event.target.dataset.id].title+'</div>'
    html += '<div class = "subtitle"><tech>'+lis[event.target.dataset.id].subtitle+'</tech></div></div><div onclick="onclicksmhide()" class="control left"><div class="arrow"></div> <div style="margin-left: 60px; margin-top: -30px">Back</div></div>'
    html += '<textArticle >'+lis[event.target.dataset.id].content+'</textArticle>'

    /*var data
        aux.readTextFile("/Users/Documents/workspace/"+event.target.dataset.file+".json", function(text){       
            data = JSON.parse(text);
    });*//*
    var blob = new Blob([html], {type: 'text/html'});
    var iframe = document.querySelector(".itemDisplay");
    iframe.src = URL.createObjectURL(blob);*/
    document.querySelector(".itemDisplay").innerHTML = html;
}
function onclicksmhide(){
    document.querySelector(".itemDisplayContainer").style.marginLeft = '-100%';
}
