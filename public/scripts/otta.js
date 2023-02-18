const getTitleAndCompany = () => {
  const fullTitle = document.getElementsByClassName("kShVjO")[0].textContent;
  const separator = fullTitle.indexOf(',');
  const titleAndCompany = {
    title: fullTitle.slice(0, separator),
    company: fullTitle.slice(separator + 2)
  };
  console.log(titleAndCompany.title, titleAndCompany.company);
  return titleAndCompany;
};

const getLocation = () => {
  const location = document.getElementsByClassName("sc-hgZZql")[0].textContent;
  console.log(location);
  return location;
};

const getSalary = () => {
  const salaryBlock = document.getElementsByClassName("sc-hZgfyJ");
  const salary = salaryBlock.length !== 0 ? salaryBlock[0].textContent : "N/A";
  console.log(salary);
  return salary;
};

const getLink = () => {
  const linkCollection = document.getElementsByClassName("sc-fbPSWO");
  const index = linkCollection.length;
  console.log(linkCollection[index - 1].href);
  return linkCollection[index - 1].href;
};

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementsByClassName('sc-iyOMks')[0].addEventListener('click', () => {
      console.log("First Button!");
      setTimeout(() => {
        document.getElementsByClassName('sc-ksZaOG')[0].addEventListener("click", () => {
          console.log("Second Button!");
        });
      }, 1000);
    });
    console.log('added');
  }, 1000);
}, false);

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
      date: new Date().toLocaleString('en-US'),
      title: getTitleAndCompany().title,
      company: getTitleAndCompany().company,
      location: getLocation(),
      salary: getSalary(),
      description: getLink(),
      platform: 'Otta'
    });

});
