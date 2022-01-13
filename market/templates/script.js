

window.addEventListener(scroll,function(){
    let Navbar=document.querySelector(".navbar");
    Navbar.classList.toggle('scrolling-active', window.scrollY > 0);

})
