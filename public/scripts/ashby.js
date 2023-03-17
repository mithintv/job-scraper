window.addEventListener("load", main, false);

function main() {
  const getTitle = () => {
    return document.querySelector("h1.ashby-job-posting-heading").textContent;
  };

  const getCompany = () => {
    return document.querySelector("img._navLogoWordmarkImage_1som9_101").alt;
  };

  const headings = [
    ...document.querySelectorAll("div.ashby-job-posting-left-pane > div > h2"),
  ];
  const content = [
    ...document.querySelectorAll("div.ashby-job-posting-left-pane > div > p"),
  ];

  const getLocation = () => {
    let index = headings.findIndex(
      (heading) => heading.textContent === "Location"
    );
    return index > -1 ? content[index].textContent : "";
  };

  const getSalary = () => {
    let index = headings.findIndex(
      (heading) => heading.textContent === "Compensation"
    );
    return index > -1
      ? document.querySelector(
          "div.ashby-job-posting-left-pane > div > ul > li > span"
        ).textContent
      : "";
  };
  const getLink = () => {
    return document.URL;
  };

  const jobData = {
    date: new Date().toLocaleString(),
    title: getTitle(),
    company: getCompany(),
    location: getLocation(),
    salary: getSalary(),
    description: getLink(),
    platform: "Direct (Ashby)",
  };

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    const url = document.URL;
    console.log(url);
    if (request.data === "getData") {
      console.log(jobData);
      sendResponse(jobData);
    }
  });
}
