var prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    carousel = document.querySelector(".carousel"),
    position = 0,
    width = 200,
    count = 4,
    listElems = carousel.querySelectorAll('.carousel-item');

prev.onclick = function() {
    position = Math.min(position + width * count, 0);
    carousel.style.marginLeft = position + 'px';
}

next.onclick = function() {
    position = Math.max(position - width * count, -width * (listElems.length - count));
    carousel.style.marginLeft = position + 'px';
}