const getTitle = () => {
  const fullHeading =
    document.getElementsByClassName("company-name")[0].textContent;
  const index = fullHeading.indexOf("at");
  const title = fullHeading.slice(0, index - 1);
  return title;
};

const getCompany = () => {
  const aboutSection =
    document.getElementsByClassName("company-section")[0].textContent;
  const company = aboutSection.slice(6);
  return company;
};

const getLocation = () => {
  return document.getElementsByClassName("company-details")[1].children[0]
    .textContent;
};

const getSalary = () => {
  return document
    .getElementsByClassName("company-name")[0]
    .nextSibling.textContent.replace("•", "")
    .trim();
};

const getLink = () => {
  return document.URL;
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const url = document.URL;
  console.log(url);
  if (request.data === "getData") {
    sendResponse({
      date: new Date().toLocaleString(),
      title: getTitle(),
      company: getCompany(),
      location: getLocation(),
      salary: getSalary(),
      description: getLink(),
      platform: "Work at a Startup",
    });
  }
});
