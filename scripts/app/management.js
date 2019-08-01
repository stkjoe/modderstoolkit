var beatmapsetManagement = (function () {
    var pub = {};

    pub.currentBeatmapset = "";

    pub.add = function(name) {
        // Make new cell for beatmapset
        var target = document.getElementById("beatmapsets");
        var newCell = document.createElement("tr");
        newCell.innerHTML = "<td>" + name + "</td><td>x</td>";
        target.appendChild(newCell);
        // Associate actions with new cell
        target.lastChild.firstChild.addEventListener('click', function() {
            beatmapsetManagement.switch(name);
        });
        target.lastChild.lastChild.addEventListener('click', function() {
            newCell.remove();
            if (beatmapsetManagement.currentBeatmapset == name) {
                document.getElementsByClassName("settings")[0].style.pointerEvents = "none";
            }
        });
        //pub.switch(name);
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

        // populate info


        // reset current settings values
        document.getElementsByClassName("settings")[0].style.pointerEvents = "auto";
        beatmapsetManagement.currentBeatmapset = name;
    };

    return pub;
}());
