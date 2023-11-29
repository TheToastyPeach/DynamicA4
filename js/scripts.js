

function extendPageHeight() {
    let height = 2000; // initial height in pixels
    const increasePerSecond = 1; // increase in pixels per second

    const increaseHeight = () => {
        height += increasePerSecond;
        document.getElementById('length').style.height = height + "px";
        setTimeout(increaseHeight, 100);
    };

    increaseHeight(); 
}

extendPageHeight();