function changeTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

//
// initialize
window.onload = function () {

	var filedrag = document.getElementById("dragdrop");
    var mainwindow = document.getElementsByTagName("main")[0];

	// is XHR2 available?
	var xhr = new XMLHttpRequest();
	if (xhr.upload) {

		// file drop
		filedrag.addEventListener("dragover", FileDragHover, false);
		filedrag.addEventListener("dragleave", FileDragHover, false);
		filedrag.addEventListener("drop", FileSelectHandler, false);
		filedrag.style.zIndex = 1;
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
