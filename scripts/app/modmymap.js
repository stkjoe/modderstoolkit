function modMyMap(file) {
    var file = new File([file], (file.name + ".zip"), {type: file.zip});
    var zip = new JSZip();
    zip.loadAsync(file)
    .then(function(zip) {});
    // .osz extracted. Begin work.
}
