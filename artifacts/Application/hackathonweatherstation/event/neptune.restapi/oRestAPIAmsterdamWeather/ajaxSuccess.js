var responseData = JSON.parse(xhr.responseText);

AmsterdamWeather = responseData;

var airHumidity = AmsterdamWeather.main.humidity;

console.log("Amsterdam Weather");
console.log(AmsterdamWeather);