window.addEventListener('load', ()=> {
let long;
let lat;
let temperatureDescription = document.querySelector('.temperature-description');
let temperatureDegree = document.querySelector('.temperature-degree');
let locationTimeZone = document.querySelector('.location-timezone');
let temperatureSection = document.querySelector('.temperature-section');
let temperatureSpan = document.querySelector('.temperature-section span');

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        //using dark sky api
        const proxy = "https://cors-anywhere.herokuapp.com";
        const api = `${proxy}https://api.darksky.net/forecast/37262f62caa451af98fd3cd4d0f8cd62/${lat},${long}`;
        
        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const { temperature, summary, icon } = data.currently;

                //Set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimeZone.textContent = data.timezone;
                    //Formula for C
                    let celsius = (temperature-32)*(5/9)
                //set icon
                setIcons(icon, document.querySelector(".icon"));

                //change temperature to c/f
                temperatureSection.addEventListener('click', () =>{
                    if (temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                });
            })
        });
    }
            //Using skycons
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});