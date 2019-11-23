//c7653ece574413d1f94171d5a4d625df


$( document ).ready(function() {
    
    //API KEY FOR WEATHER
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=c7653ece574413d1f94171d5a4d625df",
    function(data) {
        console.log(data);
        var temp =data.main.temp;
        console.log(`Todays weather in toronto is ${temp}`);
    });
    //********************************************************** */
        
    

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

console.log(moment().subtract(10, 'days').calendar());

var insertSchedule = function() {
    var htmlComponent,newHtml, time;
    
    htmlComponent = '<div id = "schedule" class = "col-12 p-0 my-2"><div id = "each-hour" class="row p-0 m-0 "><div class="exact-hour col-2 d-flex align-items-center justify-content-center ">%time%:00</div><div class="hourly-input col-9"><input class="sched-input" type="text" placeholder="Enter your new plan"></div><div class="delete-input col-1 d-flex justify-content-center"><button type="button" class="btn btn-outline-danger">Delete</button> </div></div></div>';
    for(var x = 7; x < 24; x++) {
        newHtml = htmlComponent.replace("%time%",x);
        $("#main").append(newHtml);  
    }
 
}

insertSchedule();

});




