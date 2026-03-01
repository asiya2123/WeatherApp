let searchInput = document.querySelector("#searchInput");
let searchButton = document.querySelector("#searchButton");
let cityName = document.querySelector("#cityName");
let dayTime = document.querySelector(".time");
let description = document.querySelector(".description");
let humidity = document.querySelector(".humidity");
let windspeed = document.querySelector(".windspeed");
let icon = document.querySelector(".icon");
let temparature = document.querySelector(".number");
let searchForm = document.querySelector("#searchForm");
function weatherDataUpdate(e) {
  e.preventDefault();
  const apikey = "fa802d0et31047o097e3a46943abb4fe";
  let city = searchInput.value;

  const url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=metric`;
  axios.get(url).then((response) => {
    // let now = data.time;
    // let now = new Date();
    cityName.innerHTML = response.data.city;
    let now = new Date(response.data.time * 1000); // Convert timestamp to milliseconds
    let day = now.getDay();
    let time = now.getHours();
    let minutes = now.getMinutes();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    for (let i = 0; i < 7; i++) {
      if (minutes <= 9) {
        minutes = `0${minutes}`;
      }
      dayTime.innerHTML = `${days[day]} ${time}:${minutes}`;
    }
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
  });
}
searchForm.addEventListener("click", weatherDataUpdate);
