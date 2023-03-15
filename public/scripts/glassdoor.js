const getTitle = () => {
  return document
    .querySelectorAll("article")[1]
    .querySelector('[data-test="jobTitle"]').textContent;
};

const getCompany = () => {
  return document
    .querySelectorAll("article")[1]
    .querySelector('[data-test="employerName"]').textContent;
};

const getLocation = () => {
  return document
    .querySelectorAll("article")[1]
    .querySelector('[data-test="location"]').textContent;
};

const getSalary = () => {
  const fullSalary = document
    .querySelectorAll("article")[1]
    .querySelector('[data-test="detailSalary"]').textContent;
  return fullSalary.slice(fullSalary.indexOf(":") + 1).trim();
};

const getLink = () => {
  if (document.querySelector("a.gd-ui-button.css-oh18q9"))
    return document.querySelector("a.gd-ui-button.css-oh18q9").href;
  else return document.URL;
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const url = document.URL;
  console.log(url);
  const send = {
    date: new Date().toLocaleString("en-US"),
    title: getTitle(),
    company: getCompany(),
    location: getLocation(),
    salary: getSalary(),
    description: getLink(),
    platform: "Glassdoor",
  };
  console.log(send);
  if (request.data === "getData") sendResponse(send);
});
