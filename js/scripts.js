

// function extendPageHeight() {
//     let height = 100;
//     // how many pixels will be added after each delay
//     const increasePix = 1; 

//     const increaseHeight = () => {
//         height += increasePix;
//         document.getElementById('length').style.height = height + "px";
//         // settimout to delay the recursion
//         setTimeout(increaseHeight, 50); 
//     };

//     //calling the increase height function again so that it loops infinetly 
//     increaseHeight(); 
// }



// document.addEventListener("visibilitychange", function() {
//     if (document.hidden) {
//         console.log("The tab is not active, extending");
//         extendPageHeight();
//     } else {
//         console.log("The tab is active");
//     }
// });




let start;
let totalUnfocusedTime = 0;
let oldHeight = 0;

//checks when a tab is not the focus anymore
document.addEventListener("visibilitychange", function() {
    if (document.hidden) {

        //starts a timer with "date.now()" 
        start = Date.now();
        // oldHeight = document.documentElement.scrollHeight;
    } else {
        if (start) {
            //ensures that the page is at the top when tabbed back in
            window.scrollTo(0, 0);

            //calulates the total time in what I assume are milliseconds
            totalUnfocusedTime += Date.now() - start;

            //sets the height of the div to the total time in milliseconds divided by 10
            document.getElementById('length').style.height = ((totalUnfocusedTime + oldHeight) / 20) + "px";
            console.log(totalUnfocusedTime);

            //adds the total time to the old height so the page doesn't reset
            oldHeight = totalUnfocusedTime + oldHeight;
            console.log(oldHeight);

            //resets the start values
            start = null;
            totalUnfocusedTime = 0;
        }
    }
});

//creating dot elements on the page ( of them)
let container = document.querySelector('.container'); 
for (let i = 1; i <= 150; i++){
    //main moving elements
    let dot = document.createElement('div');
    dot.classList.add('element');
    container.appendChild(dot);
}


let breathDurationMultiplier = 2;
let breathHold = 5;

//animating the dots
const dots = document.querySelectorAll('.element');


animate = anime({
        targets: dots,
        scale: [
            {value: .1, duration: breathDurationMultiplier * 100, easing: 'easeOutSine'},
            {value: 1, duration: breathDurationMultiplier * 400, easing: 'easeInOutQuad'}
        ],
        translateX: anime.stagger(5, {grid: [25, 6], from: 'center', axis: 'x'}),
        translateY: anime.stagger(5, {grid: [25, 6], from: 'center', axis: 'y', duration: breathDurationMultiplier * 100}),
    
        delay: anime.stagger( breathDurationMultiplier * 50, {grid: [25, 6], from: 'center', duration: breathDurationMultiplier * 100}),
    
        //transition effects for dots
        backgroundColor: '#ffffff',
        borderRadius: ['30%', '50%'],
    
        //how long the animation pauses at the peak
        endDelay: breathHold * 1000,
        direction: 'alternate',
        loop: true,
});


//Get the buttons 
let buttonS = document.getElementById('space');
let buttonH = document.getElementById('held');
let buttonC = document.getElementById('custom');

//Button events 
buttonS.addEventListener('click', function() {
    breathDurationMultiplier = 2;
    breathHold = 0;
    console.log(breathDurationMultiplier);
    console.log(breathHold);
    animate.restart(); 
    reanime();
});

buttonH.addEventListener('click', function() {
    breathDurationMultiplier = 3;
    breathHold = 2;
    console.log(breathDurationMultiplier);
    console.log(breathHold);
    animate.restart();
    reanime();

});

buttonC.addEventListener('click', function() {
 
});

//reanimate the dots with the new values
function reanime() {
    animate = anime({
        targets: dots,
        scale: [
            {value: .1, duration: breathDurationMultiplier * 100, easing: 'easeOutSine'},
            {value: 1, duration: breathDurationMultiplier * 400, easing: 'easeInOutQuad'}
        ],
        translateX: anime.stagger(5, {grid: [25, 6], from: 'center', axis: 'x'}),
        translateY: anime.stagger(5, {grid: [25, 6], from: 'center', axis: 'y', duration: breathDurationMultiplier * 100}),
    
        delay: anime.stagger( breathDurationMultiplier * 50, {grid: [25, 6], from: 'center', duration: breathDurationMultiplier * 100}),
    
        //transition effects for dots
        backgroundColor: '#ffffff',
        borderRadius: ['30%', '50%'],
    
        //how long the animation pauses at the peak
        endDelay: breathHold * 1000,
        direction: 'alternate',
        loop: true,
    });
}