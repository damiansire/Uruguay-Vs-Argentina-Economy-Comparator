!(function(d) {
    // Variables to target our base class,  get carousel items, count how many carousel items there are, set the slideFirst to 0 (which is the number that tells us the frame we're on), and set motion to true which disables interactivity.
    const itemClassName = "carousel__photo";
    const carouselPhotoWidth = document.getElementsByClassName("carousel__photo")[0].width;
    const carouselWidth = document.getElementsByClassName("carousel")[0].offsetWidth;
    const carouselCapacity = 7
    items = d.getElementsByClassName(itemClassName),
        totalItems = items.length,
        slideFirst = 0,
        moving = true;

    // To initialise the carousel we'll want to update the DOM with our own classes
    function setInitialClasses() {
        // Target the last, initial, and next items and give them the relevant class.
        // This assumes there are three or more items.
        for (let index = 0; index < 7; index++) {
            items[index].classList.add("active");
        }
    }

    // Set click events to navigation buttons

    function setEventListeners() {
        var next = d.getElementsByClassName('carousel__button--next')[0],
            prev = d.getElementsByClassName('carousel__button--prev')[0];

        next.addEventListener('click', moveNext);
        prev.addEventListener('click', movePrev);
    }

    // Disable interaction by setting 'moving' to true for the same duration as our transition (0.5s = 500ms)
    function disableInteraction() {
        moving = true;

        setTimeout(function() {
            moving = false
        }, 500);
    }


    // Next navigation handler
    function moveNext() {
        // Check if moving
        if (!moving) {
            slideFirst++;
            slideFirst = slideFirst % totalItems;
            // temporarily disable interactivity
            disableInteraction();
            //Obtengo el index de la anterior a slideFirst
            const slidePrev = slideFirst !== 0 ? slideFirst - 1 : totalItems - 1;
            //Removeme el elemento del carrusel
            items[slidePrev].classList.remove("active");
            //Hallo el index del nuevo item a agregar
            const lastItemIndex = (slideFirst + carouselCapacity - 1) % totalItems;
            //Lo hago visible
            items[lastItemIndex].classList.add("active");
        }
    }

    // Previous navigation handler
    function movePrev() {
        // Check if moving
        if (!moving) {

            let slidePrev;
            if (slideFirst === 0) {
                slideFirst = totalItems - 1;
                slidePrev = 6;
            } else {
                slideFirst--;
                slidePrev = (slideFirst + carouselCapacity) % 14;
            }

            // temporarily disable interactivity
            disableInteraction();

            items[slidePrev].classList.remove("active");
            items[slideFirst].classList.add("active");
        }
    }

    // Initialise carousel
    function initCarousel() {
        setInitialClasses();
        setEventListeners();

        // Set moving to false now that the carousel is ready
        moving = false;
    }

    // make it rain
    initCarousel();

}(document));