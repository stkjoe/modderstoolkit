var management = (function () {
    var pub = {};

    pub.currentBeatmapset = "";
    pub.currentSection = "";

    pub.initload = function() {
    	if (sessionStorage.length != 0) {
    		Object.keys(sessionStorage).forEach(function(k){
    			var end = k.endsWith("info");
    			if (end === false) {
    				management.add(k);
    			}
    		});
    	}
    };

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

    pub.customSnap = function () {
        var target = document.getElementById("problemtree");
        var root = document.createElement("li");
        // if there exists already custom snaps, remove that node
        if (target.lastChild.firstChild.innerHTML == "Custom Unsnaps") {
            target.removeChild(target.lastChild);
        }
        var customSnaps = {};
        var newInner = "";
        var info = JSON.parse(sessionStorage.getItem(management.currentBeatmapset))["diffs"];
        var settings = JSON.parse(sessionStorage.getItem(management.currentBeatmapset + "-info"));
        var hasSnaps = false;
        newInner += "<span class='treeroot treeroot-down'>" + "Custom Unsnaps" + "</span><ul class='nested activetree'>";
        Object.keys(info).forEach(function(l) {
            var hasDiffSnaps = false;
            var diffInner = "";
            var snaps3 = [];
            var snaps4 = [];
            for (var i = 3; i <= 12; i*=2) {
                if (settings[l]["snap3"] < i) {
                    snaps3.push(i.toString())
                }
            }
            for (var i = 2; i <= 16; i*=2) {
                if (settings[l]["snap4"] < i) {
                    snaps4.push(i.toString())
                }
            }
            Object.keys(info[l]["snaps"]).forEach(function(m){
                var snap3 = snaps3.includes(m);
                var snap4 = snaps4.includes(m);
                if (snap3 || snap4){
                    hasDiffSnaps = true;
                    var info_arr = info[l]["snaps"][m];
                    for (var j = 0; j < info_arr.length; j++) {
                        var info_part = "<span>" + info_arr[j] + "</span>";
                        // check if there is a timestamp. If so, format so it's osu Clickable
                        // note: there should not be more than one timestamp per array slot
                        var tspos = info_part.search(/([0-9]{2}:[0-9]{2}:[0-9]{3} -)/);
                        if (tspos != -1) {
                            var timestamp = info_part.slice(tspos, tspos+11);
                            info_part = info_part.replace(timestamp, "<a href='osu://edit/" + timestamp.slice(0, timestamp.length - 2) + "'>" + timestamp + "</a>");
                        }
                        diffInner += info_part;
                    }
                }
            });
            if (hasDiffSnaps) {
                newInner += "<li class='treeproblem'>" + l + "</li>";
                hasSnaps = true;
                customSnaps[l] = diffInner;
            }

        });
        newInner += "</ul>";
        root.innerHTML = newInner;
        if (hasSnaps) {
            target.appendChild(root)
            // Then go through each node to assign info click event
            var snapProbs = target.lastChild.lastChild.getElementsByClassName("treeproblem");
            for (var i = 0; i < snapProbs.length; i++) {
                snapProbs[i].addEventListener("click", function() {
                    var treeproblem = document.getElementsByClassName("treeproblem");
                    for (var j = 0; j < treeproblem.length; j++) {
                        treeproblem[j].style.textDecoration = "none";
                    }
                    this.style.textDecoration = "underline";
                    var exists = sessionStorage.getItem(management.currentBeatmapset + "-info");
                    if (exists) {
                        document.getElementById("diffs").value = this.innerHTML;
                        document.getElementById("diffs").dispatchEvent(new CustomEvent("change"));
                    }
                    document.getElementById("probleminfo").innerHTML = customSnaps[this.innerHTML];
                    management.currentSection = this.parentElement.parentElement.firstChild.innerHTML;
                });
            }
        }


    };

    pub.settingsChange = function() {
        var target = document.getElementById("diffs");
        var settings = sessionStorage.getItem(management.currentBeatmapset + "-info");
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
        sessionStorage.setItem(management.currentBeatmapset + "-info", JSON.stringify(settings));

        // call customsnap for new settings
        management.customSnap();
        if (management.currentSection == "Custom Unsnaps") {
            document.getElementById("probleminfo").innerHTML = "";
        }
    };

    pub.add = function(name) {
        // Make app clickable
        document.getElementsByClassName("tab")[0].style.pointerEvents = "auto";
        document.getElementsByClassName("tab")[0].style.opacity = "1";
        document.getElementsByClassName("settings")[0].style.pointerEvents = "auto";
        document.getElementsByClassName("settings")[0].style.opacity = "1";
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
            management.switch(name);
        });
        target.lastChild.lastChild.addEventListener('click', function() {
            newCell.remove();
            if (management.currentBeatmapset == name) {
                document.getElementsByClassName("settings")[0].style.pointerEvents = "none";
                document.getElementsByClassName("settings")[0].style.opacity = "0.2";
            }
            // remove from sessionStorage
            sessionStorage.removeItem(name);
            sessionStorage.removeItem(name + "-info");
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
        var cells = document.getElementById("beatmapsets").getElementsByTagName("tr");
        for (i = 0; i < cells.length; i++) {
            cells[i].className = "";
        }
        newCell.className = "active"
        pub.switch(name);
    };

    pub.switch = function(name) {
        management.currentBeatmapset = name;
        // clear current information
        document.getElementById("beatmapinfo").innerHTML = "";
        document.getElementById("probleminfo").innerHTML = "";
        document.getElementById("problemtree").innerHTML = "";
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
            var settings = sessionStorage.getItem(name + "-info");
            if (settings === null) {
                return;
            }
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

        // Populate treeview
        var report = JSON.parse(sessionStorage.getItem(name))["report"];
        var root = document.getElementById("problemtree");
        var newInner = "";
        Object.keys(report).forEach(function(k){
            newInner += "<li><span class='treeroot treeroot-down'>" + k + "</span><ul class='nested activetree'>";
            Object.keys(report[k]).forEach(function(l) {
                newInner += "<li><span class='treeroot treeroot-down'>" + l + "</span><ul class='nested activetree'>";
                Object.keys(report[k][l]).forEach(function(m){
                    newInner += "<li class='treeproblem'>" + m + "</li>";
                });
                newInner += "</ul></li>"
            });
            newInner += "</ul></li>";
        });
        root.innerHTML = newInner;
        // Attach events to treeview Elements
        var problems = document.getElementsByClassName("treeproblem");
        for(var i = 0; i < problems.length; i++) {
            problems[i].addEventListener("click", function() {
                // change diff settings interface to new diff, if any.
                if (this.parentElement.parentElement.firstChild.innerHTML != "General") {
                    document.getElementById("diffs").value = this.parentElement.parentElement.firstChild.innerHTML;
                    document.getElementById("diffs").dispatchEvent(new CustomEvent("change"));
                }
                // make all other ones unhighlighted
                var treeproblem = document.getElementsByClassName("treeproblem");
                for (var j = 0; j < treeproblem.length; j++) {
                    treeproblem[j].style.textDecoration = "none";
                }
                this.style.textDecoration = "underline";
                // Identify roots
                var first_root = this.parentElement.parentElement.parentElement.parentElement.firstChild.innerHTML;
                var second_root = this.parentElement.parentElement.firstChild.innerHTML;
                // Find information from sessionStorage
                var info_arr = returnedJSON["report"][first_root][second_root][this.innerHTML];
                var info = ""
                for (j = 0; j < info_arr.length; j++) {
                    var info_part = "<span>" + info_arr[j] + "</span>";
                    // check if there is a timestamp. If so, format so it's osu Clickable
                    // note: there should not be more than one timestamp per array slot
                    var tspos = info_part.search(/([0-9]{2}:[0-9]{2}:[0-9]{3} -)/);
                    if (tspos != -1) {
                        var timestamp = info_part.slice(tspos, tspos+11);
                        info_part = info_part.replace(timestamp, "<a href='osu://edit/" + timestamp.slice(0, timestamp.length - 2) + "'>" + timestamp + "</a>");
                    }

                    info += info_part;
                }
                var target = document.getElementById("probleminfo");
                target.innerHTML = info;
                management.currentSection = first_root;
            });
        }
        management.customSnap();
        // Then call treeview to make it interactive
        treeview();

        // Switch to warnings tab
        changeTab(event, 'Warnings');

        // reset current settings values
        document.getElementsByClassName("settings")[0].style.pointerEvents = "auto";
        document.getElementsByClassName("settings")[0].style.opacity = "1";
    };

    return pub;
}());

if (window.addEventListener) {
    window.addEventListener('load', management.initload);
} else if (window.attachEvent) {
    window.attachEvent('onload', management.initload);
}
