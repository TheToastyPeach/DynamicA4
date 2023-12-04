

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



//animating the dots
const dots = document.querySelectorAll('.element');


animate = anime({
        targets: dots,
        rotateZ: anime.stagger(10, {grid: [25, 6], from: 'center', axis: 'x'}),
        borderRadius: ['0%', '50%'],
        loop: true,
        duration: 10000,
        easing: 'easeInOutSine',
        direction: 'alternate',
});




//Get the buttons 
let buttonS = document.getElementById('space');
let buttonH = document.getElementById('held');
let buttonC = document.getElementById('custom');

//Button events 
buttonS.addEventListener('click', function() {
    animate.restart(); 
    reanime(30, 50, 2, 0.5);
});

buttonH.addEventListener('click', function() {
    animate.restart();
    reanime(0, 15, 3, 3);
});


buttonC.addEventListener('click', function() {
    slider.style.display = 'flex';
    animate.restart();
    reanime(30, 50, range1Value * 0.1, range1Value * 0.09);
});

//pop up sliders 
let slider = document.getElementById('customSpeedSlider');
let range1 = document.getElementById('range1');
let range1Value = range1.value;

//getting the range of slider 1 and 2 
range1.addEventListener('input', function() {
    range1Value = this.value;
    console.log(range1Value);
});

let range2 = document.getElementById('range2');
let range2Value = range2.value;

range2.addEventListener('input', function() {
    range2Value = this.value;
    console.log(range2Value);
});



//reanimate the dots with the new values
function reanime(borderRadiusStart, borderRadiusEnd, breathDurationMultiplier, breathHold) {
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
        borderRadius: [borderRadiusStart + '%', borderRadiusEnd + '%'],
    
        //how long the animation pauses at the peak
        endDelay: breathHold * 1000,
        direction: 'alternate',
        loop: true,
    });
}