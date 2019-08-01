var beatmapsetManagement = (function () {
    var pub = {};

    pub.add = function(name) {
        // Make new cell for beatmapset
        var target = document.getElementById("beatmapsets");
        var newCell = document.createElement("tr");
        newCell.innerHTML = "<td>" + name + "</td><td>x</td>";
        target.appendChild(newCell);
        // Associate actions with new cell
        target.lastChild.style.cursor = 'pointer';
        target.lastChild.addEventListener('click', function() {
            beatmapsetManagement.switch(name);
        });
        target.lastChild.lastChild.lastChild.addEventListener('click', function() {
            beatmapsetManagement.switch(name);
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
    };

    return pub;
}());
