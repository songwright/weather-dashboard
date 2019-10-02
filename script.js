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
  let cityTemp = Math.round(response.main.temp);
  let cityHumid = response.main.humidity;
  let cityWind = Math.round(response.wind.speed);
  let cityCondition = response.weather[0].main;
  $("#city-name").text(cityName + ' (' + cityDate + ')');
  $("#city-temp").text(cityTemp);
  $("#city-humid").text(cityHumid);
  $("#city-wind").text(cityWind);
  $("#city-condition").text(cityCondition);
}

function showFiveDayWeather(response) {
  // Display 5-day weather report
  // let temp = response.list[4].main.temp;
  console.log(response);
  for (let i = 3; i < 43 ; i += 8) {
    let cardBody = $("<div>").attr("class", "card-body").attr("id", `card${i}`);
    let card = $("<div>").attr("class", "card");
    card.append(cardBody);
    $(".card-deck").append(card);

    console.log(i);
  }
}
// https://openweathermap.org/weather-conditions
// https://openweathermap.org/forecast5
// file:///C:/Users/songw/Documents/Boot%20Camp%20classwork/03%20Week/Homework%202/Assets/06-Server-Side-APIs-homework-demo.png
// https://samples.openweathermap.org/data/2.5/forecast?zip=94040&appid=166a433c57516f51dfab1f7edaed8413
// https://openweathermap.org/widgets-constructor

// new Date('2010-02-01 19:30').toLocaleDateString('en-US', {
//   day : 'numeric',
//   month : 'numeric',
//   year : 'numeric'
// })