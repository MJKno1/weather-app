var api_key = "699962dfc3ecfed611e78fb94fdbcc8b";
var celc = false;
var wd;

function displayTemp(fTemp, c){
  if(c)return Math.round((fTemp-32) * (5/9)) + " C";
  return Math.round(fTemp) + " F";
  
}

function render(wd, celc){
    var currentLoc = wd.name;
    var currentWeather = wd.weather[0].description;
    var currentTemp = displayTemp(wd.main.temp, celc);
    var icon = wd.weather[0].icon;
    
    $("#location").html(currentLoc);
    $("#weather").html(currentWeather);
    $("#temp").html(currentTemp);
 
    var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png";
    $("#temp").prepend('<img src="' + iconSrc + '">');
}

$(function(){
  
  var loc;
  
$.getJSON('http://ipinfo.io', function(d){
  console.log("Assigning new data...")
  loc = d.loc.split(",");
  console.log(loc);
  
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" + loc[0] + "&lon=" + loc[1] +"&APPID=" + api_key, function(apiData){ 
    wd = apiData;
 
    render(apiData, celc);
    
      $("#toggle").click(function(){
      celc = !celc;
      render(wd, celc);   
      });
    })
  })
})
 
