       // SELECTING ELEMENT
       let toggler = document.querySelector(".menu-toggle");
       let nav = document.querySelector(".nav-2");
       let bottom_nav_iteam = document.querySelectorAll(".about");
    


        // ASINGN EVENTS
        toggler.addEventListener("click",do_task);

        // FUNCTION

        function do_task(){
            toggler.classList.toggle("active");
            nav.classList.toggle("active");
        }