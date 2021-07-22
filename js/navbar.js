// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("navbar").style.padding = "2px 2px";
        document.getElementById("imglogo").style.width = "100px";
        document.getElementById("logo").style.fontSize = "25px";
        document.getElementById("fontcre").style.fontSize = "25px";
        document.getElementById("navbar").style.backgroundColor = "rgba(0, 0, 0, 0.685)";
    } else {
        document.getElementById("navbar").style.padding = "5px 5px";
        document.getElementById("imglogo").style.width = "200px";
        document.getElementById("logo").style.fontSize = "40px";
        document.getElementById("fontcre").style.fontSize = "50px";
        document.getElementById("navbar").style.backgroundColor = "rgba(0, 0, 0, 0.385)";
    }
}