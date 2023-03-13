const getTitleAndCompany = () => {
  const fullTitle = document.querySelector(
    '[data-testid="job-title"]'
  ).textContent;
  const separator = fullTitle.indexOf(",");
  const titleAndCompany = {
    title: fullTitle.slice(0, separator),
    company: fullTitle.slice(separator + 2),
  };
  console.log(titleAndCompany.title, titleAndCompany.company);
  return titleAndCompany;
};

const getLocation = () => {
  const locations = document.querySelectorAll('[data-testid="job-locations"]');
  let locationText = "";
  if (locations.length > 1) {
    const arr = locations.map((location) => location.textContent);
    locationText = arr.join(",");
  } else locationText = locations[0].textContent;
  console.log(locationText);
  return locationText;
};

const getSalary = () => {
  const salaryBlock = document.querySelectorAll(
    '[data-testid="salary-section"]'
  );
  const salary = salaryBlock.length !== 0 ? salaryBlock[0].textContent : "N/A";
  console.log(salary);
  return salary;
};

const getLink = () => {
  if (document.querySelector('[data-testid="apply-modal-external-button"]'))
    return document.querySelector('[data-testid="apply-modal-external-button"]')
      .parentElement.href;
  else
    return document.getElementsByClassName("sc-fnykZs")[
      document.getElementsByClassName("sc-fnykZs").length - 1
    ].children[0].children[0].href;
};

window.addEventListener(
  "load",
  () => {
    setTimeout(() => {
      document
        .querySelector('[data-testid="apply-button"]')
        .addEventListener("click", () => {
          console.log("First Button!");
          setTimeout(() => {
            document
              .querySelector('[data-testid="apply-modal-external-button"]')
              .addEventListener("click", () => {
                console.log("Second Button!");
              });
          }, 1000);
        });
      console.log("added");
    }, 1000);
  },
  false
);

// const sendData = async () => {
//   // eslint-disable-next-line no-undef
//   const response = await chrome.runtime.sendMessage({
//     date: new Date().toLocaleString('en-US'),
//     title: getTitle(),
//     company: getCompany(),
//     location: getLocation(),
//     description: getLink(),
//   });
//   console.log(response);
// };

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const url = document.URL;
  console.log(url);

  if (request.data === "getData")
    sendResponse({
      date: new Date().toLocaleString("en-US"),
      title: getTitleAndCompany().title,
      company: getTitleAndCompany().company,
      location: getLocation(),
      salary: getSalary(),
      description: getLink(),
      platform: "Otta",
    });
});
