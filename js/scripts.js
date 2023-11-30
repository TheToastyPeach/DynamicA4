

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

