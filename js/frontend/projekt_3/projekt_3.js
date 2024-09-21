
function init_projekt_3_stadt1(stadt){

  // var WeatherKey = 'd00d9dbd91a749b983192542173103';
  // var weatherUrl = "http://api.apixu.com/v1/current.json?key=" + WeatherKey + "&q=" + stadt;
 
    var openweathermap_weatherKey = 'cd040ad334dcc1b5bc83ea13a4d9d294';
   
  //  var weatherUrl = "http://api.openweathermap.org/data/2.5/forecast?q="+stadt+"&appid="+openweathermap_weatherKey+"&units=metric";
  
    var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+stadt+"&appid="+openweathermap_weatherKey+"&units=metric";

    var currentDate_0 = new Date();   
    var currentDate_0_string = currentDate_0.toString();   
    var current_day_0 = currentDate_0_string.substring(8,10);
   
    var currentDate_1 = new Date();   
    currentDate_1.setDate(currentDate_1.getDate() + 1);
    var currentDate_1_string = currentDate_1.toString();   
    var current_day_1 = currentDate_1_string.substring(8,10);
  
    var currentDate_2 = new Date();   
    currentDate_2.setDate(currentDate_2.getDate() + 2);
    var currentDate_2_string = currentDate_2.toString();   
    var current_day_2 = currentDate_2_string.substring(8,10);
    
    var currentDate_3 = new Date();   
    currentDate_3.setDate(currentDate_3.getDate() + 3);
    var currentDate_3_string = currentDate_3.toString();   
    var current_day_3 = currentDate_3_string.substring(8,10);
   
    var currentDate_4 = new Date();   
    currentDate_4.setDate(currentDate_4.getDate() + 4);
    var currentDate_4_string = currentDate_4.toString();   
    var current_day_4 = currentDate_4_string.substring(8,10);
    
    var currentDate_5 = new Date();   
    currentDate_5.setDate(currentDate_5.getDate() + 5);
    var currentDate_5_string = currentDate_5.toString();   
    var current_day_5 = currentDate_5_string.substring(8,10);
   
    //  console.log("day_ :"+ day_);

    var tag1=[];
    var tag1_date="";
    var tag1_count_durchschnittl_temp = 0;
    var tag1_count = 0;

    var tag2=[];
    var tag2_date="";
    var tag2_count_durchschnittl_temp = 0;
    var tag2_count = 0;

    var tag3=[];
    var tag3_date="";
    var tag3_count_durchschnittl_temp = 0;
    var tag3_count = 0;

    var tag4=[];
    var tag4_date="";
    var tag4_count_durchschnittl_temp = 0;
    var tag4_count = 0;

    var tag5=[];
    var tag5_date="";
    var tag5_count_durchschnittl_temp = 0;
    var tag5_count = 0;
    

    $.ajax({
      url : weatherUrl,
      type: 'GET',
      dataType : 'json',
  
      success : function(data) {

     // console.log(data);
     $("#wetter_infor").hide();
     $(".wetter_info_").show();


     // var html = 'Wettervorhersage für '+data.city.name +' 5 Tage<p></p>';
     // var html_date ='';


      for (var i = 0; i < data.list.length; i++) {

      var list = data.list[i];

      var a = new Date(list.dt * 1000);
     // var hour = a.getHours()-2;     
      var months = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];      
      var month = months[a.getMonth()];
      var tage_woche = ['SO','MO','DI','MI','DO','FR','SA'];      
      var tag_woche = tage_woche[a.getDay()];
      var date = a.getDate();
      var time = tag_woche+', ' + date + ' ' + month;

    
      var day1 = list.dt_txt;

      var day_substring = day1.substring(8,10);

      day = day1.substring(11,16);

      day_time = day1.substring(11,13);
      
   //   console.log(day_time);


      if(day_time=="03"||day_time=="09"||day_time=="12"||day_time=="15"||day_time=="18"||day_time=="21"){   
     
      if(day_substring == current_day_0){
        var iconCode = list.weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
        
        ++tag1_count;
        tag1_count_durchschnittl_temp = tag1_count_durchschnittl_temp + Math.round(list.main.temp);      
        tag1_date = time +' ('+Math.round(tag1_count_durchschnittl_temp/tag1_count)+' °C)';

        day = day+'   '+ Math.round(list.main.temp) +" °C "+ "<img src="+iconUrl+" alt='wetter'>"+'<br>';
        tag1.push(day);
      }
       else if(day_substring == current_day_1){
        var iconCode = list.weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";

        ++tag2_count;
        tag2_count_durchschnittl_temp = tag2_count_durchschnittl_temp + Math.round(list.main.temp);      
        tag2_date = time +' ('+Math.round(tag2_count_durchschnittl_temp/tag2_count)+' °C)';

        day = day+'   '+ Math.round(list.main.temp) +" °C "+ "<img src="+iconUrl+" alt='wetter'>"+'<br>';
        tag2.push(day);
      }
       else if(day_substring == current_day_2){
        var iconCode = list.weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png"; 

        ++tag3_count;
        tag3_count_durchschnittl_temp = tag3_count_durchschnittl_temp + Math.round(list.main.temp);      
        tag3_date = time +' ('+Math.round(tag3_count_durchschnittl_temp/tag3_count)+' °C)';

        day = day+'   '+ Math.round(list.main.temp) +" °C "+ "<img src="+iconUrl+" alt='wetter'>"+'<br>';
        tag3.push(day);
      }
       else if(day_substring == current_day_3){
        var iconCode = list.weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";

        ++tag4_count;
        tag4_count_durchschnittl_temp = tag4_count_durchschnittl_temp + Math.round(list.main.temp);      
        tag4_date = time +' ('+Math.round(tag4_count_durchschnittl_temp/tag4_count)+' °C)';

        day = day+'   '+ Math.round(list.main.temp) +" °C "+ "<img src="+iconUrl+" alt='wetter'>"+'<br>';
        tag4.push(day);
      }
       else if(day_substring == current_day_4){
        var iconCode = list.weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";

        ++tag5_count;
        tag5_count_durchschnittl_temp = tag5_count_durchschnittl_temp + Math.round(list.main.temp);      
        tag5_date = time +' ('+Math.round(tag5_count_durchschnittl_temp/tag5_count)+' °C)';

        day = day+'   '+ Math.round(list.main.temp) +" °C "+ "<img src="+iconUrl+" alt='wetter'>"+'<br>';
        tag5.push(day);
      }

   }

 //     console.log(list.main.temp);


    
    }

/*
while(tag1.length<6){
    tag1.push("<br>");
}*/

    $('#wetter_info_projekt_3_stadt1_tag1_date').html(tag1_date); 
    $('#wetter_info_projekt_3_stadt1_tag1').html(tag1);  

    $('#wetter_info_projekt_3_stadt1_tag2_date').html(tag2_date); 
    $('#wetter_info_projekt_3_stadt1_tag2').html(tag2);  

    $('#wetter_info_projekt_3_stadt1_tag3_date').html(tag3_date); 
    $('#wetter_info_projekt_3_stadt1_tag3').html(tag3);  
    
    $('#wetter_info_projekt_3_stadt1_tag4_date').html(tag4_date); 
    $('#wetter_info_projekt_3_stadt1_tag4').html(tag4);  

    $('#wetter_info_projekt_3_stadt1_tag5_date').html(tag5_date); 
    $('#wetter_info_projekt_3_stadt1_tag5').html(tag5); 


      },
      error: function(jqXHR, textStatus, errorThrown){
            
             $(".wetter_info_").hide();
             $("#wetter_infor").show();
      }

      });

   

  //   $('#wetter_info_projekt_3_stadt1_tag1').html(html);  




      return false;      
}




$(document).ready(function(){

   $(".wetter_info_").hide();
   $("#wetter_infor").hide();

});