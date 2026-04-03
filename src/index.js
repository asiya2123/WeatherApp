let searchButton = document.querySelector("#searchButton");

function fetchingResponce(response) {
  let cityName = document.querySelector("#cityName");
  let dayTime = document.querySelector(".time");
  let description = document.querySelector(".description");
  let humidity = document.querySelector(".humidity");
  let windspeed = document.querySelector(".windspeed");
  let icon = document.querySelector(".icon");
  let temparature = document.querySelector(".number");

  cityName.innerHTML = response.data.city;
  let date = new Date(response.data.time * 1000); // Convert timestamp to milliseconds
  dayTime.innerHTML = formateDate(date);
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = `Humidity:<span class="color">${response.data.temperature.humidity}%</span>`;
  windspeed.innerHTML = `Wind: <span class="color">${response.data.wind.speed}km/h</span>`;
  icon.innerHTML = ` <img
                src="${response.data.condition.icon_url}"
                alt=""
                id="icon"
              />`;
  temparature.innerHTML = Math.round(response.data.temperature.current);
  console.log(response.data);
}

function searchCity(city) {
  const apikey = "fa802d0et31047o097e3a46943abb4fe";
  const url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=metric`;
  axios.get(url).then(fetchingResponce);
  getForecast(city);

}


function formateDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes <= 9) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function weatherDataUpdate(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchInput");
  searchCity(searchInput.value);               
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", weatherDataUpdate);
searchCity("Paris");
        function getForecast(city){
  const apiKey="fa802d0et31047o097e3a46943abb4fe";
    const apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
    
}

function findDay(timestamp){
  let date = new Date(timestamp*1000);
  let days=['sun','mon','tue','wed','thu','fri','sat'];
  return days[date.getDay()];
  
}

function displayForecast(response){

          console.log(response.data);
          let forecasHtml="";
       response.data.daily.forEach(function(day , index){
        if(index <5){
            forecasHtml += `<div class="forecast-data">
              <div class="day">${findDay(day.time)}</div>
              <div class="icons"><img src='${day.condition.icon_url}'></div>
              <div class="forecast-points"><strong class="color1">${Math.round(day.temperature.maximum)}°</strong>   <span class="color1">${Math.round(day.temperature.minimum)}°</span></div></div>`;

   }   } ); 
let weatherForecast = document.querySelector('#weather-forecast');
weatherForecast.innerHTML = forecasHtml;

        }
        // displayForecast();
        
        