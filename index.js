document.addEventListener('DOMContentLoaded', function() {
    var menu = document.querySelector('#menu');

    menu.addEventListener('click', function() {
        var navigation = document.querySelector('.navigation');
        var displayStyle = window.getComputedStyle(navigation).display;
        var navborderoverlay = document.querySelector('.navborderoverlay')

        if (displayStyle === "none") {
            navigation.style.display = "flex";
            navborderoverlay.style.display = "flex"
        } else if (displayStyle === "flex") {
            navigation.style.display = "none";
            navborderoverlay.style.display = "none"
        }
        console.log("menu button pressed");
    });
});
