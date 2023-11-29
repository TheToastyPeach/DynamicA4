

function extendPageHeight() {
    let height = 100;
    // how many pixels will be added after each delay
    const increasePix = 1; 

    const increaseHeight = () => {
        height += increasePix;
        document.getElementById('length').style.height = height + "px";
        // settimout to delay the recursion
        setTimeout(increaseHeight, 50); 
    };

    //calling the increase height function again so that it loops infinetly 
    increaseHeight(); 
}



// document.addEventListener("visibilitychange", function() {
//     if (document.hidden) {
//         console.log("The tab is not active, extending");
//         extendPageHeight();
//     } else {
//         console.log("The tab is active");
//     }
// });

let start;
var totalUnfocusedTime = 0;

//checks when a tab is not the focus anymore
document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        //starts a timer with "date.now()" 
        start = Date.now();
    } else {
        if (start) {
            //calulates the total time in what I assume are milliseconds
            totalUnfocusedTime += Date.now() - start;
            //resets the start value
            start = null;
            document.getElementById('length').style.height = ((totalUnfocusedTime + document.getElementById('length').offsetHeight) / 10) + "px";
            console.log(totalUnfocusedTime);
            extendPageHeight();
        }
    }
});

