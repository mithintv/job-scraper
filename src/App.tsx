import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import { insertRow, insertData, getAuth, getLinksColumn } from "./lib/sheets";
import { DataObj, ProfileObj } from "./lib/types";
// import { authorize, appendValues } from "./lib/auth";

const spreadsheetId = process.env.REACT_APP_SPREADSHEET_ID!;
const sheetId = parseInt(process.env.REACT_APP_SHEET_ID!);
const networkSheetId = parseInt(process.env.REACT_APP_NETWORK_SHEET_ID!);
const sheetTitle = process.env.REACT_APP_SPREADSHEET_NAME!;
const networkSheetTitle = process.env.REACT_APP_NETWORK_SPREADSHEET_NAME!;

function App() {
  const [url, setUrl] = useState<string>("");
  const [data, setData] = useState<DataObj>({
    date: "",
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    platform: "",
  });
  const [profileData, setProfileData] = useState<ProfileObj>({
    date: "string",
    name: "string",
    title: "string",
    company: "string",
    link: "string",
    connectionDegree: "string",
  });

  const getData = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    console.log("sending message");
    chrome.runtime.lastError;
    const response = await chrome.tabs.sendMessage(tab.id!, {
      data: "getData",
    });

    if (response) {
      setData(response);
      console.log(response);
      const values = [
        [
          response.date,
          response.title,
          response.company,
          response.location,
          response.salary,
          response.description,
          response.platform,
        ],
      ];
      const token = await getAuth();
      const { updatedSpreadsheet } = await insertRow(
        token!,
        spreadsheetId,
        sheetId,
        4,
        5
      );
      if (updatedSpreadsheet.spreadsheetId === spreadsheetId) {
        await insertData(token!, spreadsheetId, sheetTitle, values);
      }
    } else {
      console.log("Something went wrong");
    }
  };

  const getProfile = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    console.log("sending message");
    chrome.runtime.lastError;
    const response = await chrome.tabs.sendMessage(tab.id!, {
      data: "getProfile",
    });

    try {
      setData(response);
      console.log(response);
      const values = [
        [
          response.date,
          response.name,
          response.company,
          response.title,
          response.link,
          response.connectionDegree,
        ],
      ];
      const token = await getAuth();
      const { updatedSpreadsheet } = await insertRow(
        token!,
        spreadsheetId,
        networkSheetId,
        1,
        2
      );
      if (updatedSpreadsheet.spreadsheetId === spreadsheetId) {
        await insertData(
          token!,
          spreadsheetId,
          networkSheetTitle,
          values,
          `'${networkSheetTitle}'!A2:F`
        );
      }
    } catch (error) {
      console.log("Something went wrong: ", error);
    }
  };

  const updateData = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    console.log("sending message");
    chrome.runtime.lastError;
    const response = await chrome.tabs.sendMessage(tab.id!, {
      data: "getData",
    });
    console.log(response);
    if (response) {
      setData(response);
      const values = [
        [
          response.date,
          response.title,
          response.company,
          response.location,
          response.salary,
          response.description,
          response.platform,
        ],
      ];
      const token = await getAuth();
      const { values: linkColumn } = await getLinksColumn(
        token!,
        spreadsheetId,
        sheetTitle
      );
      let row;
      const checkLink = () => {
        let index = linkColumn[0].indexOf(response.description);
        if (index === -1) {
          index = linkColumn[0].indexOf(
            response.description.slice(0, response.description.length - 1)
          );
        }
        return index;
      };
      row = checkLink();
      if (row === -1) console.log("Link not found in sheet");
      else {
        const a1Notation = `A${row + 1}:G`;
        await insertData(token!, spreadsheetId, sheetTitle, values, a1Notation);
      }
    } else console.error("Couldn't receive response");
  };

  useEffect(() => {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      setUrl(tab.url!);
    });

    chrome.runtime.onMessage.addListener(async function (
      request,
      sender,
      sendResponse
    ) {
      if (request.type === "JOB") {
        try {
          sendResponse("received");
          setData(request.payload);
          const values = [
            [
              request.payload.date,
              request.payload.title,
              request.payload.company,
              request.payload.location,
              request.payload.salary,
              request.payload.description,
              request.payload.platform,
            ],
          ];
          const token = await getAuth();
          const { updatedSpreadsheet } = await insertRow(
            token!,
            spreadsheetId,
            sheetId,
            4,
            5
          );
          if (updatedSpreadsheet.spreadsheetId === spreadsheetId) {
            await insertData(token!, spreadsheetId, sheetTitle, values);
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (request.type === "PROFILE") {
        try {
          sendResponse("received");
          setData(request.payload);
          const values = [
            [
              request.payload.date,
              request.payload.name,
              request.payload.title,
              request.payload.company,
              request.payload.link,
              request.payload.connectionDegree,
            ],
          ];
          const token = await getAuth();
          const { updatedSpreadsheet } = await insertRow(
            token!,
            spreadsheetId,
            networkSheetId,
            1,
            2
          );
          if (updatedSpreadsheet.spreadsheetId === spreadsheetId) {
            await insertData(token!, spreadsheetId, networkSheetTitle, values);
          }
        } catch (error) {
          console.log(error);
        }
      }
    });

    // chrome.runtime.onMessage.addListener(function (
    //   request,
    //   sender,
    //   sendResponse
    // ) {
    //   console.log(
    //     sender.tab
    //       ? "from a content script:" + sender.tab.url
    //       : "from the extension"
    //   );
    //   console.log(request);
    // });
  });

  // useEffect(() => {
  //   const queryInfo = { active: true, lastFocusedWindow: true };

  //   chrome.tabs &&
  //     chrome.tabs.query(queryInfo, (tabs) => {
  //       const url = tabs[0].url;
  //       setUrl(url!);
  //     });
  // }, [url]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{data.date}</p>
        <p>{data.title}</p>
        <p>{data.company}</p>
        <p>{data.location}</p>
        <p>{data.salary}</p>
        {data.description !== "" && <a href={data.description}>Description</a>}
        <p>{data.platform}</p>
        <button onClick={getData}>Get Data</button>
        <button onClick={updateData}>Update Data</button>
        <button onClick={getProfile}>Get Profile</button>
      </header>
    </div>
  );
}

export default App;
