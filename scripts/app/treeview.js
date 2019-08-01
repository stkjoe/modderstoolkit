function treeview() {
    var toggler = document.getElementsByClassName("treeroot");
    var i;

    for (i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener("click", function() {
            this.parentElement.querySelector(".nested").classList.toggle("activetree");
            this.classList.toggle("treeroot-down");
        });
    }
}

if (window.addEventListener) {
    window.addEventListener('load', treeview);
} else if (window.attachEvent) {
    window.attachEvent('onload', treeview);
}
