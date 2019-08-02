function treeview() {
    var toggler = document.getElementsByClassName("treeroot");
    var i;

    for (i = 0; i < toggler.length; i++) {
        treeview_singular(toggler[i]);
    }
}

function treeview_singular(root) {
    root.addEventListener("click", function() {
        this.parentElement.querySelector(".nested").classList.toggle("activetree");
        this.classList.toggle("treeroot-down");
    });
}
