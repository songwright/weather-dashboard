$("#find-city").on("click", function(event) {
  event.preventDefault();

  const APIKey = "166a433c57516f51dfab1f7edaed8413";
  let city = $("#city-input").val();
  let fiveDayQueryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city},us&units=imperial&appid=${APIKey}`;
  let mainQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},us&units=imperial&appid=${APIKey}`;

  $.ajax({
      url: fiveDayQueryURL,
      method: "GET"
  }).then(function(response) {
      showFiveDayWeather(response);
  })

  $.ajax({
      url: mainQueryURL,
      method: "GET"
  }).then(function(response) {
    showMainWeather(response);
  })
});


function showMainWeather(response) {
  // Display main weather report
  let cityName = response.name;
  let cityDate = moment().format('l');
  let cityIcon = response.weather[0].icon;
  let cityTemp = Math.round(response.main.temp);
  let cityHumid = response.main.humidity;
  let cityWind = Math.round(response.wind.speed);
  let cityCondition = response.weather[0].main;
  let cityIconEl = $("<img>").attr("src", `https://openweathermap.org/img/w/${cityIcon}.png`)
  $("#city-name").text(cityName + ' (' + cityDate + ')').append(cityIconEl);
  $("#city-temp").text(cityTemp);
  $("#city-humid").text(cityHumid);
  $("#city-wind").text(cityWind);
  $("#city-condition").text(cityCondition);
  console.log(response);
}

function showFiveDayWeather(response) {
  // Display 5-day weather report

  $(".card-deck").empty();
  for (let i = 3; i < 43 ; i += 8) {
    let cardDate = response.list[i].dt_txt;
    let date = new Date(cardDate).toLocaleDateString('en-US', {
      day : 'numeric',
      month : 'numeric',
      year : 'numeric'
    });
    let cardTemp = Math.round(response.list[i].main.temp);
    let cardHumid = Math.round(response.list[i].main.humidity);
    let iconSource = response.list[i].weather[0].icon;

    let cardBodyEl = $("<div>").attr("class", "card-body five-card");
    let cardEl = $("<div>").attr("class", "card");
    let cardTitleEl = $("<h5>").attr("class", "card-title").text(date);
    // let cardIcon = $("<img>").attr("src", `https://openweathermap.org/img/w/${iconSource}.png`).attr("class", "img-fluid");
    let cardIcon = $("<img>").attr("src", `https://openweathermap.org/img/w/${iconSource}.png`);
    let cardTempEl = $("<p>").attr("class", "card-text").text(`Temp: ${cardTemp} °F`);
    let cardHumidEl = $("<p>").attr("class", "card-text").text(`Humidity: ${cardHumid}%`);
    cardEl.append(cardBodyEl);
    cardBodyEl.append(cardTitleEl).append(cardIcon).append(cardTempEl).append(cardHumidEl);
    $(".card-deck").append(cardEl);
  }
}
// https://openweathermap.org/weather-conditions
// https://openweathermap.org/forecast5
// file:///C:/Users/songw/Documents/Boot%20Camp%20classwork/03%20Week/Homework%202/Assets/06-Server-Side-APIs-homework-demo.png
// https://samples.openweathermap.org/data/2.5/forecast?zip=94040&appid=166a433c57516f51dfab1f7edaed8413
// https://openweathermap.org/widgets-constructor
