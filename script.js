//c7653ece574413d1f94171d5a4d625df


$( document ).ready(function() {//****************************************************************************************************************************************************************************** */

    var schedArr = [];
    if(localStorage.getItem("schedule")) {
        schedArr = JSON.parse(localStorage.getItem("schedule"));
    } else {
        schedArr = [""];
        localStorage.setItem("schedule", JSON.stringify(schedArr))
        schedArr = JSON.parse(localStorage.getItem("schedule"));
    }
    
    //Display the time and the hour of the day
    var timeNow = moment().format('LT'); 
    $(".timeofDay").text(timeNow);
    var hourNow = moment().hour();
    console.log(hourNow);
    //The todo list
    $('ul').on('click','li', function() {
        $(this).toggleClass("completed");
    });

    $("ul").on('click','span', function(event) {
        $(this).parent().fadeOut(300, function() {
            $(this).remove();
        });
        event.stopPropagation();
        
    });
    $("#new-todo").on("keypress",function(event){
        if(event.which === 13){
            var newItem = $(this).val();
            $(this).val("");
            $("ul").append("<li><span><img src='https://img.icons8.com/material-outlined/26/000000/clear-symbol.png'></span> "+newItem+"</li>");
        }    
    }); 
    $("#toggle-todo").on('click', function() {
        $("ul").toggleClass("remove-todo");
    });


//Working with the schedule
var insertSchedule = function() {
    var htmlComponent,newHtml;
    
    htmlComponent = '<div id = "schedule" class = "col-12 p-0 my-2"><div id = "each-hour" class="row p-0 m-0 "><div class="%exact-hour% col-2 d-flex align-items-center justify-content-center ">%time%:00</div><div class="hourly-input col-9"><input id="%id%" class="sched-input" type="text" placeholder="..." value="%value%" ></div><div class="delete-input col-1 d-flex justify-content-center"><button type="button" class="btn btn-outline-danger">Delete</button> </div></div></div>';
    for(var x = 7; x < 24; x++) {
        newHtml = htmlComponent.replace("%time%",x);
        newHtml = newHtml.replace("%id%", x-7);//since the counter starts at 7 i subtract 7 to get it down to 0 for the array reference
        
        if(schedArr[x-7]!== null && schedArr[x-7]!== undefined){
            newHtml = newHtml.replace("%value%",schedArr[x-7]);//since the counter starts at 7 i subtract 7 to get it down to 0 for the array reference
        }else {
            newHtml = newHtml.replace("%value%","");
        }
         
         if(x<hourNow) {
            newHtml = newHtml.replace("%exact-hour%","exact-hour1");
        }else if(x > hourNow) {
            newHtml = newHtml.replace("%exact-hour%","exact-hour3");
        }else {
            newHtml = newHtml.replace("%exact-hour%","exact-hour2");
        }
        $("#main").append(newHtml);

    }
  
}

insertSchedule();

//Add an event listener to my box and look for an id value and fill that info into my array
    $('#main').on('keypress', function(event){
        if(event.keyCode === 13){
          schedArr[event.target.id] = event.target.value;

          localStorage.setItem("schedule", JSON.stringify(schedArr));
          schedArr = JSON.parse(localStorage.getItem("schedule"));

          event.target.blur();
        }
       
    
    });
//Add an event listener for the delete event
$('#main').on('click', function(event){
    var relatedInput = event.target.parentNode.previousSibling.firstChild;

    if(event.target.type === 'button'){

        relatedInput.value = "";
        schedArr[relatedInput.id] = null;

        localStorage.setItem("schedule", JSON.stringify(schedArr));
        schedArr = JSON.parse(localStorage.getItem("schedule"));

        event.target.blur();
      }
    

});

var queryURL="http://quotes.stormconsultancy.co.uk/random.json"
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      var newQuote = response.quote;
      var newAuthor = response.author;
      $(".quote-of-day").text(newQuote+"      --" + newAuthor);
    console.log(JSON.stringify(response));
  });


//******************************************************************************************************************************************************************************************************************** */
});


