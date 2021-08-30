let weather = {
    apiKey: "3fdc05da2835d63ce705124d6d83c987", // API for openweathermap.org
    fetchWeather: function (city,countryCode) {
      fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
      + city 
      + "&units=metric&zip=" + countryCode + "&appid=" 
      + this.apiKey
      )

      /* condition if the city is valid */
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },

    /* getting the corresponding value according to openweathermap.com */
    displayWeather: function (data) {
      const { name } = data; 
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      const { country } = data.sys;

      /* displays the value to the UI */
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = Math.round(temp) + "°C";
      document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
      document.querySelector(".countryCode").innerText = "Country Code: " + country;
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };

/* ------------------------------- Details ----------------------------------*/

  let countryInfo = {

    // API for foursquare.com
    
    client_ID: "IQW5XX1GWYS5ATIIAAFYSYFEWO4040YFANZ2JK0BUPM4ZOXA",
    client_Secret: "GANT42KN1PKGPOORWECHTKPAXY3WG22MXABRKPGBKWKM1535",

    displayDetail: function(city) {
        fetch("https://api.foursquare.com/v2/venues/explore?VENUE_ID&cat=trending&near=" + city + "&client_id=" 
        + this.client_ID + "&client_secret=" 
        + this.client_Secret 
        +"&v=20120609"
        )
        /* condition if the city is valid */
          .then((response2) => {
             if(!response2.ok){
                 alert("There has no info!.");
                 throw new Error ("There has no info!.");
             }
             return response2.json();
         })
         .then((data2) => this.displayInfo(data2));
    },
    /* Getting the value inside the search bar */
    search: function(){
      this.displayDetail(document.querySelector(".search-bar").value) 
    },

    /* getting the corresponding value according to foursquare.com */
    displayInfo: function(data2) {
        const { name } = data2.response.groups[0].items[0].venue;
        const { address, crossStreet } = data2.response.groups[0].items[0].venue.location;
        const { phone, formattedPhone } = data2.response.groups[0].items[0].venue.contact;
        const { postalCode } = data2.response.groups[0].items[0].venue.location.postalCode;
    
        /* displays the value to the UI */
        document.querySelector(".cityName").innerText = "Name: " + name;
        document.querySelector(".address").innerText = "Address: " + address;
        document.querySelector(".crossStreet").innerText = "Cross Street: " + crossStreet;
        document.querySelector(".mobileNumber").innerText = "Mobile No.: " + phone;
        document.querySelector(".phoneNumber").innerText = "Phone No.: " + formattedPhone;
        document.querySelector(".postalCode").innerText = "Postal Code: " + postalCode;
        
        
    }

  }
   
  /* ----------------------------- Button and Search Bar ---------------------------------- */

  // adding event listener click to the button

  document.querySelector(".search button").addEventListener("click", function () {
    weather.search(); // executing the search method inside the weather syntax
    countryInfo.search(); // executing the search method inside the countryInfo syntax
  });
  
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) { // event listener for enter key
      if (event.key == "Enter") {
        weather.search(); 
        countryInfo.search(); 
      }
    });
  
  weather.fetchWeather("Denver"); // default city 



  
  