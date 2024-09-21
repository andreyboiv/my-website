$(document).ready(function(){


if (!window.localStorage){

}else{
  load_settings();
}


function load_settings(){
  var style_seite = localStorage.getItem("style_seite");

  apply_preferences_to_page(style_seite);
};

$( "#action-0" ).click(function() {

 $('link[href="css/style_1.css"]').attr('href','css/style_0.css');
 $('link[href="css/style_2.css"]').attr('href','css/style_0.css');
 $('link[href="css/style_3.css"]').attr('href','css/style_0.css');

 var a = "action_0";

 save_settings(a);
});



$( "#action-1" ).click(function() {

 $('link[href="css/style_0.css"]').attr('href','css/style_1.css');
 $('link[href="css/style_2.css"]').attr('href','css/style_1.css');
 $('link[href="css/style_3.css"]').attr('href','css/style_1.css');

 var a = "action_1";

 save_settings(a);
});

$( "#action-2" ).click(function() {

 $('link[href="css/style_0.css"]').attr('href','css/style_2.css');
 $('link[href="css/style_1.css"]').attr('href','css/style_2.css');
 $('link[href="css/style_3.css"]').attr('href','css/style_2.css');

 var a = "action_2";

 save_settings(a);
});

$( "#action-3" ).click(function() {

 $('link[href="css/style_0.css"]').attr('href','css/style_3.css');
 $('link[href="css/style_1.css"]').attr('href','css/style_3.css');
 $('link[href="css/style_2.css"]').attr('href','css/style_3.css');

 var a = "action_3";
  
 save_settings(a);
});

  function save_settings(a) {

    if (a=="action_1"){
      localStorage.setItem("style_seite", "action_1");
    }
     else if (a=="action_2"){
      localStorage.setItem("style_seite", "action_2"); 
    }
    else if (a=="action_3"){
          localStorage.setItem("style_seite", "action_3"); 
    }
    else if (a=="action_0"){
          localStorage.setItem("style_seite", "action_0"); 
    }
};

function apply_preferences_to_page(style_seite){


if (style_seite == "action_1"){

 $('link[href="css/style_0.css"]').attr('href','css/style_1.css');
 $('link[href="css/style_2.css"]').attr('href','css/style_1.css');
 $('link[href="css/style_3.css"]').attr('href','css/style_1.css');

 var a = "action_1";

 save_settings(a);

}
else if (style_seite == "action_2"){

 $('link[href="css/style_0.css"]').attr('href','css/style_2.css');
 $('link[href="css/style_1.css"]').attr('href','css/style_2.css');
 $('link[href="css/style_3.css"]').attr('href','css/style_2.css');

 var a = "action_2";

 save_settings(a);

}
else if (style_seite == "action_3") {

 $('link[href="css/style_0.css"]').attr('href','css/style_3.css');
 $('link[href="css/style_1.css"]').attr('href','css/style_3.css');
 $('link[href="css/style_2.css"]').attr('href','css/style_3.css');

 var a = "action_3";
  
 save_settings(a);

}

};

})
