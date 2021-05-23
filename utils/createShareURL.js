const createShareURL = async (url) => {
  var myHeaders = new Headers();
  let bt = process.env.NEXT_PUBLIC_BITLY_ACCESS_TOKEN;
  let short_url = "https://furls.herokuapp.com/";
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("GET", "POST", "OPTIONS");
  var raw = JSON.stringify({ url: url });
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let response = await fetch(
    "https://furls.herokuapp.com/api/urls",
    requestOptions
  );
  let res_json = await response.json();
  short_url += await res_json.short;
  return await short_url;
};

const bitlyURL = async (url) => {
  var myHeaders = new Headers();
  let bt = process.env.NEXT_PUBLIC_BITLY_ACCESS_TOKEN;
  myHeaders.append("Authorization", "Bearer " + bt);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    group_guid: process.env.NEXT_PUBLIC_BITLY_GROUP_GUID,
    domain: "bit.ly",
    long_url: url,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let response = await fetch(
    "https://api-ssl.bitly.com/v4/shorten",
    requestOptions
  );
  let res_json = await response.json();
  let short_url = await res_json.link;
  return short_url;
};

export { createShareURL, bitlyURL };
