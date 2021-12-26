const carouselWrapper = document.getElementById('carousel-wrapper');
const carouselImages = document.getElementById('carousel-images');
const images = document.querySelector('img');

let imgCount = carouselImages.children.length;
let imgWidth = images.naturalWidth;
let imgHeight = images.naturalHeight;

carouselWrapper.style.width = imgWidth + 'px';
carouselWrapper.style.height = imgHeight + 'px';


carouselImages.style.width = `${imgCount*imgWidth}`;

for (let i = 0; i < imgCount; i++) {
    const img = carouselImages.children[i];
    img.style.left = `${i*imgWidth}px`;
}

let currentIndex = 0;
let targetIndex = 0;

//Initialization of Previous
var prev = document.createElement("div");
prev.setAttribute("class", "prev");
prev.innerHTML = '&#60;';
carouselWrapper.appendChild(prev);

//Attaching Click Event to Previous button
prev.onclick = function() {
    if (currentIndex == 0) {
        targetIndex = imgCount - 1;
    }
    // currentIndex--;
    else {
        targetIndex = currentIndex - 1;
    }


    animateTransition(currentIndex, targetIndex);
    currentIndex = targetIndex;

}

// Initialization of next button
var next = document.createElement("div");
next.setAttribute("class", "next");
next.innerHTML = '&#62;';
carouselWrapper.appendChild(next);


//Attaching click event to Next Button
next.onclick = function() {
    targetIndex = currentIndex + 1;
    if (targetIndex == imgCount) {
        targetIndex = 0;
    }

    animateTransition(currentIndex, targetIndex);
    currentIndex = targetIndex;

}


//Dot Navigation
let dotContainer = document.createElement('div');
dotContainer.setAttribute('class', 'dots');
var dotArr = [];
for (let i = 0; i < imgCount; i++) {
    var dot = document.createElement('span');
    dot.setAttribute('class', 'dot');
    dot.innerHTML = ". &nbsp;";
    dot.onclick = function() {
        targetIndex = i;
        animateTransition(currentIndex, targetIndex);
        currentIndex = targetIndex;
    }
    dotArr.push(dot);
    dotContainer.appendChild(dot);

}
carouselWrapper.appendChild(dotContainer);

// setting firt child active
dotArr[0].setAttribute('class', 'dot active');
var setCurrentDot = function(activeIndex) {
    for (var dotIndex = 0; dotIndex < dotArr.length; dotIndex++) {
        if (dotIndex === targetIndex) dotArr[dotIndex].setAttribute("class", "dot active");
        else dotArr[dotIndex].setAttribute("class", "dot");
    }
}

// Transition animation
let targetLetf;
let timer;
let transitionTime;
let transitionDelay;
let dx;

function animateTransition(currentIndex, targetIndex) {
    setCurrentDot();
    dx = Math.abs((targetIndex - currentIndex) * imgWidth) / transitionTime;
    currentLeft = currentIndex * imgWidth;
    targetLetf = targetIndex * imgWidth;
    // carouselImages.style.left = `-${targetIndex*imgWidth}px`;

    timer = setInterval(() => {

        if (currentIndex < targetIndex || (currentIndex == 0 && targetIndex == imgCount)) {
            if (currentLeft >= targetLetf) {
                clearInterval(timer);
            } else {
                carouselImages.style.left = `-${currentLeft+dx}px`;
                currentLeft += dx;
            }
        } else if (currentIndex > targetIndex) {
            if (currentLeft <= targetLetf) {
                clearInterval(timer);
            } else {
                carouselImages.style.left = `-${currentLeft-dx}px`;
                currentLeft -= dx;
            }
        }
    }, transitionDelay);
}


// transition properties

({ transitionTime, transitionDelay } = { transitionTime: 50, transitionDelay: 10 });