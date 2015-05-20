$(document).ready(function(){
    //doc ready to go
    console.log('loaded');

    //ajax the calc method so we don't reload the whole page
    //attach keydown callback to input area
    $('#decimalNumber').keydown(function(e){
        //if you hit enter perform the calc
        if(e.which == 13) {

            $('#mainDisplay').html('');

            //get value from input
            $.getJSON($SCRIPT_ROOT + '/performCalc/' + $(this).val(),{

            })
                .done(function(data) {
                    if(data == 'Please enter a number, between 1-3999'){
                        $('#mainDisplay').text(data);
                    }
                    else{
                        //when done, add the data
                        for(var i = 0; i < String(data).length; i++ ){
                            $('#mainDisplay').append('<img src = "static/images/' + String(data).charAt(i) + '.png' + '"' + ' style="display: none">');

                        }

                        //after adding the items recursively go through each one and animate-display them using jquery
                        tempCount = $('#mainDisplay').children().length;
                        recursiveAnimate(tempCount);
                    }
                })
                .error(function(error){
                    //log error if error
                    console.log(error);
                });
        }
    });

});

//the function is recursive so we load them progressively for a cooler effect, could add a class to img and do a class for each
function recursiveAnimate(length){

    //if we still have more items keep going
    if(length != 0 ) {
        //add a bit of randomness to the fading time
        $('#mainDisplay img:nth-child('+ length + ')').fadeToggle((Math.random() * 300) + 300, 'linear', function () {

            //create a new audio object each time so it overlaps sounds
            var audio = new Audio('static/images/slam.wav');
            audio.play();

            //keep going with recursion
            recursiveAnimate(length - 1);

            $('#mainDisplay').effect("shake", {times:2} , 60);

            //console.log('shaking');
        });
    }
}