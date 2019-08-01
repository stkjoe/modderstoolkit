var beatmapsetManagement = (function () {
    var pub = {};

    pub.currentBeatmapset = "";

    pub.sliderChange = function(value) {
        var target = document.getElementById(value + "label");
        var snap = document.getElementById(value).value;
        if (value == "snap3") {
            if (snap == "2") {
                snap = "3";
            } else if (snap == "3") {
                snap = "6";
            } else if (snap == "4") {
                snap = "12";
            }
        } else if (value == "snap4") {
            if (snap == "3") {
                snap = "4";
            } else if (snap == "4") {
                snap = "8";
            } else if (snap == "5") {
                snap = "16";
            }
        }
        target.innerHTML = "1/" + snap.toString();
    };

    pub.settingsChange = function() {
        var target = document.getElementById("diffs");
        var settings = sessionStorage.getItem(beatmapsetManagement.currentBeatmapset + "-info");
        settings = JSON.parse(settings);
        var detdiff = document.getElementById("diffsdetect").value;
        var snap3 = document.getElementById("snap3").value;
        if (snap3 == "2") {
            snap3 = "3";
        } else if (snap3 == "3") {
            snap3 = "6";
        } else if (snap3 == "4") {
            snap3 = "12";
        }
        var snap4 = document.getElementById("snap4").value;
        if (snap4 == "3") {
            snap4 = "4";
        } else if (snap4 == "4") {
            snap4 = "8";
        } else if (snap4 == "5") {
            snap4 = "16";
        }
        settings[target.value]["diff"] = detdiff;
        settings[target.value]["snap3"] = snap3;
        settings[target.value]["snap4"] = snap4;
        sessionStorage.setItem(beatmapsetManagement.currentBeatmapset + "-info", JSON.stringify(settings));
    };

    pub.add = function(name) {
        // Make new cell for beatmapset
        var target = document.getElementById("beatmapsets");
        var newCell = document.createElement("tr");
        newCell.innerHTML = "<td>" + name + "</td><td>x</td>";
        target.appendChild(newCell);
        // Associate actions with new cell
        target.lastChild.firstChild.addEventListener('click', function() {
            // visual indication of selected beatmapset
            cells = document.getElementById("beatmapsets").getElementsByTagName("tr");
            for (i = 0; i < cells.length; i++) {
                cells[i].className = "";
            }
            newCell.className = "active"
            beatmapsetManagement.switch(name);
        });
        target.lastChild.lastChild.addEventListener('click', function() {
            newCell.remove();
            if (beatmapsetManagement.currentBeatmapset == name) {
                document.getElementsByClassName("settings")[0].style.pointerEvents = "none";
                document.getElementsByClassName("settings")[0].style.opacity = "0.2";
            }
        });

        // Create a new info sessionstorage file to keep track of snapping settings
        var text = sessionStorage.getItem(name);
        var returnedJSON = JSON.parse(text);
        var settings = {};
        Object.keys(returnedJSON.diffs).forEach(function(k){
            var diff = returnedJSON.diffs[k].diff;
            var snap3 = "";
            var snap4 = "";
            if (diff == "easy") {
                snap3 = "1";
                snap4 = "2";
            } else if (diff == "normal") {
                snap3 = "1";
                snap4 = "2";
            } else if (diff == "hard") {
                snap3 = "3";
                snap4 = "4";
            } else if (diff == "insane") {
                snap3 = "3";
                snap4 = "4";
            } else if (diff == "extra") {
                snap3 = "6";
                snap4 = "8";
            }
            settings[k] = {"diff": diff, "snap3": snap3, "snap4": snap4};
        });
        settings = JSON.stringify(settings);
        sessionStorage.setItem(name + "-info", settings);

        // reset cell colours
        cells = document.getElementById("beatmapsets").getElementsByTagName("tr");
        for (i = 0; i < cells.length; i++) {
            cells[i].className = "";
        }
        newCell.className = "active"
        pub.switch(name);
    };

    pub.switch = function(name) {
        // clear current information
        document.getElementById("beatmapinfo").innerHTML = "";
        //document.getElementById("probleminfo").innerHTML = "";
        //document.getElementById("problemtree").innerHTML = "";
        document.getElementById("diffs").innerHTML = "";

        // get clicked beatmapset
        var text = sessionStorage.getItem(name);
        var returnedJSON = JSON.parse(text);

        // populate info
        // start by addings diffs
        var target = document.getElementById("diffs");
        Object.keys(returnedJSON.diffs).forEach(function(k){
            target.innerHTML = target.innerHTML + "<option value='" + k + "'>" + k + "</option>"
        });
        target.addEventListener("change", function() {
            // Grab settings from sessionStorage
            var settings = JSON.parse(sessionStorage.getItem(name + "-info"))[target.value];
            document.getElementById("diffsdetect").value = settings["diff"];
            var snap4 = settings["snap4"];
            document.getElementById("snap4label").innerHTML = "1/" + snap4.toString();
            if (snap4 == "4") {
                snap4 = "3";
            } else if (snap4 == "8") {
                snap4 = "4";
            } else if (snap4 == "16") {
                snap4 = "5";
            }
            document.getElementById("snap4").value = snap4;
            var snap3 = settings["snap3"];
            document.getElementById("snap3label").innerHTML = "1/" + snap3.toString();
            if (snap3 == "3") {
                snap3 = "2";
            } else if (snap3 == "6") {
                snap3 = "3";
            } else if (snap3 == "12") {
                snap3 = "4";
            }
            document.getElementById("snap3").value = snap3;

            // Populate Info tab
            // Firstly, grab it from
            var info = JSON.parse(sessionStorage.getItem(name))["diffs"][target.value]["info"];
            var info_str = "";
            Object.keys(info).forEach(function(k){
                info_str = info_str + ("<span>" + k + ": " + info[k] + "</span>");
            });
            document.getElementById("beatmapinfo").innerHTML = info_str;
        });
        // Change to hardest diff and evoke change
        target.selectedIndex = target.length - 1;
        target.dispatchEvent(new CustomEvent("change"));

        // reset current settings values
        document.getElementsByClassName("settings")[0].style.pointerEvents = "auto";
        document.getElementsByClassName("settings")[0].style.opacity = "1";
        beatmapsetManagement.currentBeatmapset = name;
    };

    return pub;
}());
