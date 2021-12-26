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



//Initialization of Previous
var prev = document.createElement("div");
prev.setAttribute("class", "prev");
prev.textContent = '<';
carouselWrapper.appendChild(prev);


var next = document.createElement("div");
next.setAttribute("class", "next");
next.textContent = '>';
carouselWrapper.appendChild(next);


let currentIndex = 0;
// let timer;
// let dx = 0;
// let target;
next.onclick = function() {
    currentIndex++;

    if (currentIndex == imgCount) {
        currentIndex = 0;
        // dx = 0;
    }
    // target = `${currentIndex*imgWidth}`;
    // timer = setInterval(() => {
    //     dx++;
    //     if (dx >= target) {
    //         clearInterval(timer);
    //     } else {
    //         carouselImages.style.left = `-${dx}px`
    //     }


    // }, 1);

    console.log(currentIndex);

    carouselImages.style.left = `-${currentIndex*imgWidth}px`;
}




//Attaching Click Event to Next button
prev.onclick = function() {
    if (currentIndex == 0) currentIndex = imgCount;
    currentIndex--;
    // target = `${target-(currentIndex*imgWidth)}`;
    carouselImages.style.left = `-${currentIndex*imgWidth}px`;
    // console.log(currentIndex);
    // timer = setInterval(() => {
    //                 dx--;
    //                 carouselImages.style.left = `-${dx}px`
    //                 if (dx >= target) {
    //                     clearInterval(timer);
    //                 }
    //             }, 1);
}