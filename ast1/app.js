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
    if (currentIndex == 0) currentIndex = imgCount;
    // currentIndex--;
    targetIndex = currentIndex - 1;
    animateTransition(targetIndex);
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

    animateTransition(targetIndex);
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
        animateTransition(i);
    }


    dotArr.push(dot);
    dotContainer.appendChild(dot);

}
carouselWrapper.appendChild(dotContainer);


let targetLetf;
let dx = 0;
let timer;

var getStyle = function(element, style) {
    return parseFloat(window.getComputedStyle(element).getPropertyValue(style));
};

function animateTransition(index) {
    // currentLeft = getStyle(carouselImages.children[index], 'left');
    // console.log(currentLeft);
    // targetLetf = index * imgWidth;
    carouselImages.style.left = `-${index*imgWidth}px`;
    // console.log(targetLetf);
    // timer = setInterval(() => {

    //     if (dx >= targetLetf + 1) {
    //         clearInterval(timer);
    //         dx = currentLeft;
    //     }
    //     carouselImages.style.left = `-${dx}px`;
    //     dx += 10;
    // }, 1);

}