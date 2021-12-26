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
let flag = true;

//Initialization of Previous
var prev = document.createElement("div");
prev.setAttribute("class", "prev");
prev.innerHTML = '&#60;';
carouselWrapper.appendChild(prev);

//Attaching Click Event to Previous button
prev.onclick = function() {
    flag = false;
    // clearInterval(auto_animate);
    if (currentIndex == 0) {
        targetIndex = imgCount - 1;
    }
    // currentIndex--;
    else {
        targetIndex = currentIndex - 1;
    }


    animateTransition(currentIndex, targetIndex);
    currentIndex = targetIndex;
    setTimeout(function() {
        flag = true;
    }, 1000);

}

// Initialization of next button
var next = document.createElement("div");
next.setAttribute("class", "next");
next.innerHTML = '&#62;';
carouselWrapper.appendChild(next);


//Attaching click event to Next Button
next.onclick = function() {
    flag = false;
    if (currentIndex == imgCount - 1 && targetIndex == 0) {
        currentIndex = 0;
        targetIndex = 0
    } else {
        targetIndex = currentIndex + 1;

        if (targetIndex == imgCount) {
            targetIndex = 0;
        }
    }

    animateTransition(currentIndex, targetIndex);
    currentIndex = targetIndex;
    setTimeout(function() {
        flag = true;
    }, 1000);

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
        flag = false;
        targetIndex = i;
        animateTransition(currentIndex, targetIndex);
        currentIndex = targetIndex;
        setTimeout(function() {
            flag = true;
        }, 1000);


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
let currentLeft;
let timer;
let transitionTime;
let transitionDelay;
let dx;

function animateTransition(currentIndex, targetIndex) {
    setCurrentDot();
    console.log(currentIndex, targetIndex);
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


auto_animate = setInterval(() => {
    if (flag) {

        if (targetIndex == imgCount) {
            targetIndex = 0;
        }
        // targetIndex++;

        animateTransition(currentIndex, targetIndex);
        currentIndex = targetIndex;
        targetIndex++
    }
    // targetIndex = targetIndex + 1;
}, 3000);

/*
auto_animate = setInterval(() => {

    slideShow();
}, 1000);


function slideShow() {
    dotArr[0].setAttribute('class', 'dot active');
    setCurrentDot();
    dx = Math.abs((targetIndex - currentIndex) * imgWidth) / transitionTime;
    // console.log(currentIndex, targetIndex);
    if (targetIndex === imgCount) { targetIndex = 0 };
    carouselImages.style.left = `-${targetIndex*imgWidth}px`;
    // carouselImages.style.left = `-${currentLeft+dx}px`;
    currentIndex = targetIndex;
    targetIndex++;
}*/