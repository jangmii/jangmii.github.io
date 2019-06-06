const weather = document.querySelector(".js-weather");

const API_KEY = "206f1745cf0fad1c29d3fcade872d431";
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch(`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`
    ).then(function(response) {
        return response.json();
        })
        .then(function(json){ 
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`;
        });
}
function saveCoords(CoordsObj){
    localStorage.setItem(COORDS, JSON.stringify(CoordsObj));
} 

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const CoordsObj = {
        latitude,
        longitude
    };
    saveCoords(CoordsObj);
    getWeather(latitude, longitude);
} 

function handleGeoError(){
    console.log('Cannot access geo location');
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function loadCoords(){
    const loadCoords = localStorage.getItem(COORDS);
    if(loadCoords === null) {
        askForCoords();
    } else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();