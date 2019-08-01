function dropHandler(ev) {

	sessionStorage.clear();

	ev.preventDefault();

	if (ev.dataTransfer.items) {
		for (var i = 0; i < ev.dataTransfer.items.length; i++) {
			if (ev.dataTransfer.items[i].kind === 'file') {
				var file = ev.dataTransfer.items[i].getAsFile();
				var isOsz = file.name.endsWith(".osz");
				if (isOsz == true) {
					// File is a .osz file. Continue onwards.
					var returnedJSON = modMyMap(file);
					sessionStorage.setItem(file.name, returnedJSON);
					beatmapsetManagement.switch(file.name);
				}
			}
		}
    }
	var dropzone = document.getElementById("dragdrop");
	dropzone.style.zIndex = -1;
}

function dragOverHandler(ev) {
	var dropzone = document.getElementById("dragdrop");
	dropzone.style.zIndex = 1;
	ev.preventDefault();
}

function dragLeaveHandler(ev) {
	var dropzone = document.getElementById("dragdrop");
	dropzone.style.zIndex = -1;
	ev.preventDefault();
}
