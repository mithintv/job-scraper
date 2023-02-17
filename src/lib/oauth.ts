const body = {
  range: "'Saved Jobs'!A2:F",
  majorDimension: "ROWS",
  values: [
    [
      new Date().toLocaleString("en-US"),
      "hello",
      "Geerber",
      "Plymouth",
      "fdsfsfsfd",
    ],
  ],
};

export const getAuth = async () => {
  const auth = await chrome.identity.getAuthToken({ interactive: true });
  // @ts-ignore: Unreachable code error
  console.log(auth.token!);
  // @ts-ignore: Unreachable code error
  return auth.token;
};

export const getSheet = async (spreadsheetId: string) => {};

export const insertRow = async (
  token: string,
  spreadsheetId: string,
  sheetId: number
) => {
  let init = {
    method: "POST",
    async: true,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    contentType: "json",
    body: JSON.stringify({
      requests: [
        {
          insertDimension: {
            range: {
              sheetId: sheetId,
              dimension: "ROWS",
              startIndex: 1,
              endIndex: 2,
            },
          },
        },
      ],
      includeSpreadsheetInResponse: true,
    }),
  };
  const response = fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`,
    init
  )
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      return data;
    })
    .catch((error) => {
      return error;
    });
  return response;
};

export const insertData = (
  token: string,
  spreadsheetId: string,
  sheetTitle: string,
  values: number | string[][]
) => {
  let init = {
    method: "PUT",
    async: true,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    contentType: "json",
    body: JSON.stringify({
      range: `'${sheetTitle}'!A2:F`,
      majorDimension: "ROWS",
      values,
    }),
  };
  const response = fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'${sheetTitle}'!A2:F?valueInputOption=USER_ENTERED`,
    init
  )
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      return data;
    })
    .catch((error) => {
      return error;
    });
  return response;
};

export const appendData = (token: string, spreadsheetId: string, body: any) => {
  let init = {
    method: "POST",
    async: true,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    contentType: "json",
    body: JSON.stringify(body),
  };
  const response = fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'Saved Jobs'!A2:F:append?insertDataOption=INSERT_ROWS&valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    init
  )
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      return data;
    })
    .catch((error) => {
      return error;
    });
  return response;
};
