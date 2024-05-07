const cars = document.querySelector(".cars"),
firstImg = cars.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff ;



const showHideIcons = () => {
    // showing and hiding prev/next icon according to cars scrollleft value
    let scrollWidth = cars.scrollWidth - cars.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = cars.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = cars.scrollLeft == scrollWidth ? "none" : "block";
}
arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; //getting first img width and adding 14 margin value
        //if clicked icon is left,reduce width value from the car scroll left else add to it
        cars.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHidden icons after 60ms
    });
});
const autoSlide = () => {
    // if there is no image to scroll then return from here
    if(cars.scrollLeft== (cars.scrollWidth - cars.clientWidth)) return;
    positionDiff = Math.abs(positionDiff); // making positionDiff  value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs toadd or reduce from cars left to take middle img centre
    let valDifference = firstImgWidth - positionDiff;

    if(cars.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return cars.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    //if user is scrolling to the left
    return cars.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    //updatating global variables on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = cars.scrollLeft;
}

const dragging = (e) => {
    //scrolling images/cars to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    cars.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    cars.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    cars.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false
    autoSlide();
} 

cars.addEventListener("mousedown", dragStart);
cars.addEventListener("touchstart", dragStart);

cars.addEventListener("mousemove", dragging);
cars.addEventListener("touchmove", dragging);

cars.addEventListener("mouseup", dragStop);
cars.addEventListener("mouseleave", dragStop);
cars.addEventListener("touchend", dragStop);