chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const url = document.URL;
    console.log(url);
    if (request.data === "getData")
        sendResponse({
            date: new Date().toLocaleString(),
            title: 'this is google',
            company: 'this is google',
            location: 'this is google',
            description: 'this is google',
            platform: "Google"
        });

});
