//some variables 
let start;
let totalUnfocusedTime = 0;
let oldHeight = 0;

//checks when a tab is not the focus anymore
document.addEventListener("visibilitychange", function() {

    let messageDiv = document.getElementById('message');
    let h2 = messageDiv.getElementsByTagName('h2')[0];

    if (document.hidden) {

        //starts a timer with "date.now()" 
        start = Date.now();
        // oldHeight = document.documentElement.scrollHeight;
        if (h2) {
            messageDiv.removeChild(h2);
        }
    //when tabbed back in 
    } else {
        if (start) {
            //ensures that the page is at the top when tabbed back in
            window.scrollTo(0, 0);

            //calulates the total time in what I assume are milliseconds
            totalUnfocusedTime += Date.now() - start;

            //sets the height of the div to the total time in milliseconds divided by 10
            document.getElementById('length').style.height = ((totalUnfocusedTime + oldHeight) / 4) + "px";
            console.log(totalUnfocusedTime);

            //adds the total time to the old height so the page doesn't reset
            oldHeight = totalUnfocusedTime + oldHeight;
            console.log(oldHeight);

            createMessage(totalUnfocusedTime / 1000);
            createArrow();

            //resets the start values
            start = null;
            totalUnfocusedTime = 0;

        };
    };
});

//creating dot elements on the page (150 of them)
let container = document.querySelector('.container'); 
for (let i = 1; i <= 150; i++){
    //main moving elements
    let dot = document.createElement('div');
    dot.classList.add('element');
    container.appendChild(dot);
};


//animating the dots
const dots = document.querySelectorAll('.element');

//initial animation for when the page loads 
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


//----------------Button events------------------
buttonS.addEventListener('click', function() {
    //if you don't restart the animation and remove the dots, they will lag the computer 
    animate.restart();
    animate.remove(dots);
    reanime(30, 50, 2, 0.5);
    slider.style.display = 'none';
});

buttonH.addEventListener('click', function() {
    animate.restart();
    animate.remove(dots);
    reanime(0, 15, 3, 3);
    slider.style.display = 'none';
});


buttonC.addEventListener('click', function() {
    slider.style.display = 'flex';
});
//------------------------------------------------


//pop up sliders 
let slider = document.getElementById('customSpeedSlider');
let range1 = document.getElementById('range1');
let range1Value = range1.value;



//------------------getting the range of slider 1 and 2 ------------------
range1.addEventListener('input', function() {
    range1Value = this.value;
    console.log(range1Value);
    animate.restart();
    animate.remove(dots);
    reanime(30, 50, range1Value * 0.1, range1Value * 0.05);
});

let range2 = document.getElementById('range2');
let range2Value = range2.value;

range2.addEventListener('input', function() {
    range2Value = this.value;
    console.log(range2Value);
    animate.restart();
    animate.remove(dots);
    reanime(30, 50, range1Value * 0.1, range1Value * 0.05);
});
//------------------------------------------------------------------------


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
};


//create a message on the page, above the graphic content 
function createMessage(offPageTime) {
    let messageDiv = document.getElementById('message');


    let h2 = document.createElement('h2');
    h2.textContent = "You were off this page for " + Math.round(offPageTime) + " seconds";

    let button = document.createElement('button');
    button.textContent = 'Back to Top'; 

    // Add an event listener to the button
    button.addEventListener('click', function() {
        changeMessage("Lets take a moment to breathe");
        shrinkPage();
        button.style.display = 'none';
    });

    messageDiv.appendChild(h2);
    messageDiv.appendChild(button);
};

//change the created message with animations! 
function changeMessage(newText) {
    let messageDiv = document.getElementById('message');
    let h2 = messageDiv.getElementsByTagName('h2')[0];

    // Check if h2 exists
    if (h2) {
        // Change the text of the existing h2
        h2.textContent = newText;
    } else {
        // Create a new h2
        h2 = document.createElement('h2');
        h2.textContent = newText;
        messageDiv.appendChild(h2);
    }

    // Fade in the h2 element
    anime({
        targets: h2,
        opacity: 1,
        duration: 1000, 
        easing: 'easeInOutQuad'
    });
};

//Slowly shrinks the page back to the smallest defined height in the css 
function shrinkPage() {
    const decreasePix = 15; 
    let lengthElement = document.getElementById('length');
    // Get the height of the 'length' div
    let currentHeight = lengthElement.offsetHeight; 

    const decreaseHeight = () => {
        if (currentHeight > 430) {
            currentHeight -= decreasePix;
            lengthElement.style.height = currentHeight + "px";
            //Delay the recursion
            setTimeout(decreaseHeight, 15); 
        }
        else if (currentHeight < 450) {
        let messageDiv = document.getElementById('message');
        let but = messageDiv.getElementsByTagName('button')[0];
        messageDiv.removeChild(but);

        changeMessage("Welcome back to the top!");
        }
    };
    //Start decreasing the height
    decreaseHeight(); 


};




//just for fun, creates a div and spins it on the selected option 
function animateSpinningShape(button) {
    // Remove existing spinning shape if it exists
    let existingShape = document.getElementById('spinningShape');
    if (existingShape) {
        existingShape.remove();
    };
    let shape = document.createElement('div');
    shape.id = 'spinningShape';

    // Apply CSS to position the shape under the button and style it
    // I tried to use the css and html files, but it was messing with the animation, easier
    // to apply everything here and reset it 
    shape.style.position = 'absolute';
    shape.style.width = '50px';
    shape.style.height = '50px';
    shape.style.borderRadius = '25%';
    shape.style.backgroundColor = '#f0a7a04b';
    shape.style.top = button.offsetTop + 'px';

    //This is rough but its a ton of work to center all the buttons,
    //more lines of code than the function already is...
    shape.style.left = button.offsetLeft + 60 + 'px';

    document.body.appendChild(shape);

    anime({
        targets: '#spinningShape',
        rotate: 360,
        duration: 3000,
        loop: true,
        easing: 'linear',
        borderRadius: ['25%', '45%', '25%'],
        scale: [
            {value: 0.1},
            {value: 1}
        ],

    });
};

// Add event listener to each of the top 3 buttons for the shape command
let buttons = document.getElementsByTagName('button');
for (let button of buttons) {
    button.addEventListener('click', function() {
        animateSpinningShape(button);
    });
};


//makes a floating arrow to indicate to scroll down the page 
function createArrow () {
    // Show the arrow when the page loads
    let arrow = document.getElementById('scrollArrow');
    arrow.style.display = 'block';

    // Animate the arrow
    anime({
        targets: '#scrollArrow',
        translateY: [-25, 0],
        duration: 500,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
    });

    // Hide the arrow when the user scrolls to the bottom
    window.onscroll = function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            arrow.style.display = 'none';
        }
    };
};

//rotating circle 
let circles = document.querySelectorAll('.circle');

anime({
  targets: circles,
  rotate: 360,
  loop: true,
  easing: 'linear',
  duration: 5000,
});




//----------------------------Old Idea--------------------------

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
//----------------------------------------------------------------
