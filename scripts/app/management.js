var beatmapsetManagement = (function () {
    var pub = {};

    pub.add = function(name) {
        pub.switch(name);
    };

    pub.switch = function(name) {
        // clear current information
        document.getElementById("beatmapinfo").innerHTML = "";
        document.getElementById("probleminfo").innerHTML = "";
        document.getElementById("problemtree").innerHTML = "";
        document.getElementById("diffs").innerHTML = "";

        // get clicked beatmapset
        var json = sessionStorage.getItem(name);
        var i;
    };

    return pub;
}());
