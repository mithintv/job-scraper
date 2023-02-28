const getTitle = () => {
  return document.getElementsByClassName("jobs-unified-top-card__job-title")[0]
    .textContent;
};

const getCompany = () => {
  return document
    .getElementsByClassName("jobs-unified-top-card__company-name")[0]
    .textContent.replaceAll("\\n")
    .trim();
};

const getLocation = () => {
  return document
    .getElementsByClassName("jobs-unified-top-card__bullet")[0]
    .textContent.replaceAll("\\n")
    .trim();
};

const getLink = () => {
  return document
    .getElementsByClassName("jobs-unified-top-card__content--two-pane")[0]
    .getElementsByTagName("a")[0].href;
};

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const url = document.URL;
  console.log(url);
  if (request.data === "getData") {
    sendResponse({
      date: new Date().toLocaleString(),
      title: getTitle(),
      company: getCompany(),
      location: getLocation(),
      description: getLink(),
      platform: "Linkedin",
    });
  }
});
