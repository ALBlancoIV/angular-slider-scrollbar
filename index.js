(function() {
  window.kapamilya = {};

  const content = document.querySelector("div.content");
  const resourceCount = 39;
  const config = {
    url: "https://dev-api-content.azurewebsites.net/api/v01",
    urlBlob: "https://content-micro-all.azureedge.net",
    urlProfile:
      "https://dev-api-userprofilemanagment.azurewebsites.net/api/v01",
    siteCode: "OTT",
    countryCode: "PH",
    device: "",
    localStorage: "any"
  };

  var getMovies = function() {
    let xmlhttp = new XMLHttpRequest();
    let requestUrl =
      config.url +
      "/world/by-limit?siteCode=" +
      config.siteCode +
      "&size=2&page=2&countryCode=" +
      config.countryCode +
      "&pageCode";

    console.log(requestUrl);
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var JSONData = JSON.parse(this.responseText);
        generateSlide(JSONData.data.worlds);
      }
    };
    xmlhttp.open("GET", requestUrl, true);
    xmlhttp.send();
  };

  var generateSlide = function(arr) {
    arr.forEach(function(slideData) {
      let headerData = slideData.headers;
      let contentData = slideData.contents;

      // create header
      let slideDiv = document.createElement("div");
      let slideHeader = document.createElement("h2");
      slideHeader.innerText = headerData.headerLabel;
      slideDiv.appendChild(slideHeader);

      //create content
      let card = document.createElement("div");
      console.log(contentData);
      for (var row = 0; row < contentData.length; row++) {
        rowData = contentData[row];

        let cardTitle = document.createElement("h3");
        cardTitle.innerText = rowData.textHead;
        let cardImg = document.createElement("img");
        cardImg.src = rowData.mobileThumbnail;
        let cardText = document.createTextNode(rowData.textBody);
        card.appendChild(cardTitle);
        card.appendChild(cardImg);
        card.appendChild(cardText);
      }
      slideDiv.appendChild(card);

      // append all into content
      content.appendChild(slideDiv);
    });
  };

  var loadResource = function() {};

  var init = {
    getMovies: getMovies,
    generateCards: generateSlide
  };

  window.kapamilya.init = init || {};
})();
