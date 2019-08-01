
//
// initialize
function dragdrop() {

	var filedrag = document.getElementById("dragdrop");
    var mainwindow = document.getElementsByTagName("main")[0];

	// is XHR2 available?
	var xhr = new XMLHttpRequest();
	if (xhr.upload) {

		// file drop
		filedrag.addEventListener("dragover", FileDragHover, false);
		filedrag.addEventListener("dragleave", FileDragHover, false);
		filedrag.addEventListener("drop", FileSelectHandler, false);
        mainwindow.addEventListener("dragover", FileDragVis, false);
	}
};

function FileDragVis(e) {
    var filedrag = document.getElementById("dragdrop");
    filedrag.style.zIndex = 1;
}

// file drag hover
function FileDragHover(e) {
	e.stopPropagation();
	e.preventDefault();
	e.target.className = (e.type == "dragover" ? "hover" : "");
}

// file selection
function FileSelectHandler(e) {
    var filedrag = document.getElementById("dragdrop");
    filedrag.style.zIndex = -1;

	// cancel event and hover styling
	FileDragHover(e);

	// fetch FileList object
	var files = e.target.files || e.dataTransfer.files;

    // process all File objects
    var formData = new FormData();
    formData.append("file2upload", files[0]);

    var req = {
        url: "/app",
        method: "post",
        processData: false,
        contentType: false,
        data: formData
    };

    var promise = $.ajax(req);
}

if (window.addEventListener) {
    window.addEventListener('load', dragdrop);
} else if (window.attachEvent) {
    window.attachEvent('onload', dragdrop);
}
