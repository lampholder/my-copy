browser.runtime.onMessage.addListener(message => {
    var blob = new Blob(
    [ message.content ],
        {
            type : "text/plain;charset=utf-8"
        }
    );

    downloadUrl = URL.createObjectURL( blob );
    try {
        browser.downloads.download({
            url: downloadUrl,
            filename: message.filename,
            saveAs: message.saveAs
        });
    }
    catch (e) {
        console.error(e);
    }
});
