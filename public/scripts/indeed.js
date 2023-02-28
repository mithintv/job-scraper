const getTitle = () => {
  return document.getElementsByClassName("jobsearch-JobInfoHeader-title")[0].textContent;
};

const getCompany = () => {
  return document.getElementsByClassName("jobsearch-InlineCompanyRating")[0].getElementsByTagName('a')[0].textContent;
};

const getLocation = () => {
  return document.getElementsByClassName("jobsearch-jobLocationHeader-location")[0].textContent;
};

const getLink = () => {
  return document.getElementsByClassName("vjs-highlight")[0].getElementsByTagName('a')[0].href;
};

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const url = document.URL;
  console.log(url);
  if (request.data === "getData")
    sendResponse({
      date: new Date().toLocaleString(),
      title: getTitle(),
      company: getCompany(),
      location: getLocation(),
      description: getLink(),
    });

});
