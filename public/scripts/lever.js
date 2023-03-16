const getTitle = () => {
  return document.querySelector(".posting-headline > h2").textContent;
};

const getCompany = () => {
  const fullCompanyLink = document.querySelector(
    ".main-footer-text a"
  ).textContent;
  if (fullCompanyLink === "Jobs powered by ") {
    const url = document.URL;
    const sliced = url.slice(22);
    return sliced[0].toUpperCase() + sliced.slice(1, sliced.indexOf("/"));
  } else return fullCompanyLink.slice(0, fullCompanyLink.indexOf("Home") - 1);
};

const getLocation = () => {
  const fullCategory = document.querySelector(
    ".posting-categories"
  ).textContent;
  return fullCategory.slice(0, fullCategory.indexOf("/") - 1);
};

const getSalary = () => {
  return "";
};

const getLink = () => {
  return document.URL;
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const url = document.URL;
  console.log(url);
  if (request.data === "getData") {
    const response = {
      date: new Date().toLocaleString(),
      title: getTitle(),
      company: getCompany(),
      location: getLocation(),
      salary: getSalary(),
      description: getLink(),
      platform: "Direct (Lever)",
    };
    console.log(response);
    sendResponse(response);
  }
});
