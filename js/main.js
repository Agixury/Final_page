//Code for sidebar menu toggling in mobile
let toggler = document.querySelector(".menu-toggle");
let nav = document.querySelector(".nav-2");

// ASINGN EVENTS
toggler.addEventListener("click",do_task);

// FUNCTION

function do_task(){
    toggler.classList.toggle("active");
    nav.classList.toggle("active");
}