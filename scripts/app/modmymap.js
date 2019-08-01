function modMyMap(file) {
    var file = new File([file], (file.name + ".zip"), {type: file.zip});
    var zip = new JSZip();
    zip.loadAsync(file)
    .then(function(zip) {});
    // .osz extracted. Begin work.








    // delete below
    var text = '{"report":{"Unrankables":{"General":{"Missing Preview Point":["Normal"],"MP3 Out of Range":["audio.mp3 - 320kbps"]},"Easy":{"Concurrent Objects":["00:00:001 - ","00:00:002 -"],"Missing Background":["badbackground.jpg","alt.jpg"]}},"Guidelines":{"General":{"Missing Preview Point":["Normal"],"MP3 Out of Range":["audio.mp3 - 320kbps"]},"Easy":{"Concurrent Objects":["00:00:001 - ","00:00:002 -"],"Missing Background":["badbackground.jpg","alt.jpg"]}}},"diffs":{"Easy":{"info":"","snaps":{"1":[],"2":[],"3":[],"4":[],"6":[],"8":[],"12":[],"16":[]}},"Normal":{"info":"","snaps":{"1":[],"2":[],"3":[],"4":[],"6":[],"8":[],"12":[],"16":[]}},"Hard":{"info":"","snaps":{"1":[],"2":[],"3":[],"4":[],"6":[],"8":[],"12":[],"16":[]}}}}'
    var obj = JSON.parse(text);
    return obj
}
