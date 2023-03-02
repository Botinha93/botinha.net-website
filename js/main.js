var elmnt = document.getElementsByClassName("content");
var lastscroll = 0;
var menu_phoneopem=true;
var carousel;
var animationDuration = 500;
var movetolocal=0;
var PosPage=0;


document.ready =function(){
    window.scrollTo(0,0);
    moveto(0);
    lastscroll = 0;
}
document.onload =function(){
    window.scrollTo(0,0);
    moveto(0);
    lastscroll = 0;
}
HTMLElement.prototype.onvisible = function(e){}; 
HTMLElement.prototype.onnotvisible = function(e){};

function createMenu(){
    var temp = document.getElementsByClassName("content");
    var html="";
    var mobile='<li><a onclick="burguerOnClick()" href="javascript:moveto(0)"><color style="color: #632b9b ;"><</color><shoulders>Home</shoulders><color style="color: #632b9b ;">/></color></a></li>';
    for(var count=temp.length-1; count>0; count--){
        html = html+'<li><a href="javascript:moveto('+count+')"><color style="color: #632b9b ;"><</color><shoulders>'+(temp[count].id.charAt(0).toUpperCase() + temp[count].id.substring(1))+'</shoulders><color style="color: #632b9b ;">/></color></a></li>';
        window.console.log(temp[count].id);
    }
    for(var count=1; count<temp.length; count++){
        mobile = mobile+'<li><a onclick="burguerOnClick()" href="javascript:moveto('+count+')"><color style="color: #632b9b ;"><</color><shoulders>'+(temp[count].id.charAt(0).toUpperCase() + temp[count].id.substring(1))+'</shoulders><color style="color: #632b9b ;">/></color></a></li>';
        window.console.log(temp[count].id);
    }
    html= html+'<li><a href="javascript:moveto(0)"><color style="color: #632b9b ;"><</color><shoulders>Home</shoulders><color style="color: #632b9b ;">/></color></a></li>';
    document.getElementById("nav-top").innerHTML=html;
    document.getElementById("nav-phone").innerHTML=mobile;
}

document.getElementById("burguer").onclick = burguerOnClick;
function burguerOnClick(){
    if(menu_phoneopem){
        document.getElementById("menu_phone").style = "display: inline;";
        document.getElementById("menu_phone").classList.add("menu_phone_show")
        menu_phoneopem = false;
        setBurguer()
    }else{
        setBurguer()
        document.getElementById("menu_phone").classList.remove("menu_phone_show")
        menu_phoneopem = true;
        document.getElementById('burguer').focus();
        setTimeout(function(){
            document.getElementById("menu_phone").style = "display: none;"
        }, animationDuration/2);
    }
}
var burguer = false;
function setBurguer(){
    if(burguer){
        burguer = false;
        document.getElementById('burguer').children[0].classList.remove("dash_1_focus");
        document.getElementById('burguer').children[1].classList.remove("dash_2_focus");
        document.getElementById('burguer').children[2].classList.remove("dash_3_focus");
    }else{
        burguer = true;
        document.getElementById('burguer').children[0].classList.add("dash_1_focus");
        document.getElementById('burguer').children[1].classList.add("dash_2_focus");
        document.getElementById('burguer').children[2].classList.add("dash_3_focus");
    }
}
document.onkeydown = function(e){
    var x = e.which;
    if(x == 37){
        carouselScroll(true);
    }else if(x == 39){
        carouselScroll(false);
    }else if(x == 38 && lastscroll>0){
        moveto(lastscroll - 1);
    }else if(x == 40 && lastscroll<elmnt.length-1){
        moveto(lastscroll + 1);
    }else if (x == 116){
        window.scrollTo(0,0);
        moveto(0);
        lastscroll = 0;
    }
}

function moveto(pos){
    elmnt[PosPage].style.height = '0';
    elmnt[PosPage].onnotvisible(true)
    PosPage = pos;
    lastscroll=pos;
    carousel = elmnt[lastscroll];
    document.getElementById("current_page").classList.add("animate_pulse");
    setTimeout(function(){
        document.getElementById("current_page").innerHTML = carousel.id;
        setTimeout(function(){
            document.getElementById("current_page").classList.remove("animate_pulse");
        }, animationDuration/2);
        elmnt[pos].style.height = '100%';
        
        elmnt[pos].onvisible(true)
    }, animationDuration/2);
}


window.onresize = function(){
    elmnt[lastscroll].scrollIntoView();
}

function carouselScroll(direction){
    var contents = carousel.getElementsByClassName("articles");
    for (var i=0; i<contents.length; i++){
        if(contents[i].classList.contains("hero")){
            if(direction){
                if( i>0){
                    contents[i].classList.remove("hero");
                    contents[i].classList.add("previlous");
                    contents[i-1].classList.remove("next");
                    contents[i-1].classList.add("hero");
                    break;
                }
            }else{
                if( i<contents.length-1){
                    contents[i].classList.remove("hero");
                    contents[i].classList.add("next");
                    contents[i+1].classList.remove("previlous");
                    contents[i+1].classList.add("hero");
                    break;
                }
            }
        }
    }
}
createMenu();