

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


let container = document.querySelector('.container'); 
for (let i = 1; i <= 200; i++){
    let dot = document.createElement('div');
    dot.classList.add('element');
    container.appendChild(dot);
}


const dots = document.querySelectorAll('.element');
anime({
    targets: dots,
    scale: [
        {value: .1, duration: 200, easing: 'easeOutSine'},
        {value: 1, duration: 400, easing: 'easeInOutQuad'}
    ],
    translateX: anime.stagger(10, {grid: [25, 8], from: 'center', axis: 'x'}),
    translateY: anime.stagger(10, {grid: [25, 8], from: 'center', axis: 'y'}),
    delay: anime.stagger(70, {grid: [25, 8], from: 'center'}),
    direction: 'alternate',
    loop: true,
})




