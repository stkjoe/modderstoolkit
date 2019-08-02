function modMyMap(file) {
    var file = new File([file], (file.name + ".zip"), {type: file.zip});
    var zip = new JSZip();
    // create a new "filemap" object to keep track of objects.
    zip.loadAsync(file)
    .then(function(zip) {});
    // .osz extracted. Begin work.
    console.log(zip.files);
    for (var i = 0; i < zip.files.length; i++) {
        if (zip.files[i].endsWith(".osu")) {
            console.log(zip.files[i]);
        }
    }

    // delete below
    var text = '{"report":{"Unrankables":{"General":{"Missing Preview Point":["Normal"],"MP3 Out of Range":["audio.mp3 - 320kbps"]},"Easy":{"Concurrent Objects":["00:00:001 - ","00:00:002 -"],"Missing Background":["badbackground.jpg","alt.jpg"]}},"Guidelines":{"General":{"Missing Preview Point":["Normal"],"MP3 Out of Range":["audio.mp3 - 320kbps"]},"Easy":{"Concurrent Objects":["00:10:001 - ","00:00:002 -"],"Missing Background":["badbackground.jpg","alt.jpg"]}}},"diffs":{"Easy":{"info":{"Title":"Song Title","Artist":"Song Artist","pp":"111"},"diff":"easy","snaps":{"1":["a"],"2":["b"],"3":["c"],"4":["d","e"],"6":["f"],"8":["g"],"12":["h"],"16":["i"]}},"Normal":{"info":{"Title":"Song Title","Artist":"Song Artist","pp":"222"},"diff":"normal","snaps":{"1":["j"],"2":["k"],"3":["l"],"4":["m"],"6":["n","o"],"8":["p"],"12":["q"],"16":["r"]}},"Hard":{"info":{"Title":"Song Title","Artist":"Song Artist","pp":"333"},"diff":"hard","snaps":{"1":["0"],"2":["1"],"3":["2","3"],"4":["4"],"6":["5"],"8":["6"],"12":["7"],"16":["8"]}}}}'
    return text
}
