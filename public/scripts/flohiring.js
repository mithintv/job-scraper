const getTitleAndCompany = () => {
    const fullTitle = document.getElementsByClassName("job-details-header")[0].textContent;
    const fullCompany = document.getElementsByClassName("job-details-company-name")[0].textContent;
    const titleAndCompany = {
        title: fullTitle,
        company: fullCompany
    };
    console.log(titleAndCompany.title, titleAndCompany.company);
    return titleAndCompany;
};

const getLocation = () => {
    const location = document.getElementsByClassName("jobdata-details")[0].textContent;
    console.log(location);
    return location;
};

const getSalary = () => {
    const salaryBlock = document.getElementsByClassName("jobdata-details")[3].textContent;
    const salary = salaryBlock ? salaryBlock : "N/A";
    console.log(salary);
    return salary;
};

const getLink = () => {
    const link = document.URL;
    return link;
};

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
            platform: 'Flo Hiring'
        });

});
