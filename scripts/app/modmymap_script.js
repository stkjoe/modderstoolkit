/* changeTab
 * Function is evoked when a tab is clicked.
 */
function changeTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

/* dropHandlers
 * Functions to control drag-drop aspect of the app.
 */
 function dropHandler(ev) {

 	ev.preventDefault();

 	if (ev.dataTransfer.items) {
 		for (var i = 0; i < ev.dataTransfer.items.length; i++) {
 			if (ev.dataTransfer.items[i].kind === 'file') {
 				var file = ev.dataTransfer.items[i].getAsFile();
 				var isOsz = file.name.endsWith(".osz");
 				if (file.name.endsWith(".osz")) {
 					// File is a .osz file. Continue onwards.
 					var returnedJSON = modMyMap(file);
 					if (sessionStorage.getItem(file.name) === null) {
 						sessionStorage.setItem(file.name, returnedJSON);
 						management.add(file.name);
 					} else {
 						sessionStorage.setItem(file.name, returnedJSON);
 					}
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

 /* treeview
  * controls the click events of the treeview.
  */
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
