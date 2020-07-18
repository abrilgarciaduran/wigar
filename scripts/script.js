const slideImages = document.querySelectorAll('.slide-in')

function debounce(func, wait = 20, immediate = true) {
    //Es una funcion que controla el scroll (o la funcion que le pase como parametro). 
    //Evalua la funcion en base al segundo parametro. Conrtola el tiempo
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function checkSlide(e) {
    slideImages.forEach(image => {
        const slideInAt = (window.scrollY + window.innerHeight) - image.height / 2; //A la mitad de la imagen
        const imageBottom = image.offsetTop + image.height; //Bottom de la imagen
        const isHalfShown = slideInAt > image.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom
        if (isHalfShown && isNotScrolledPast) {
            image.classList.add("active");
        }
        else {
            image.classList.remove("active")
        }
    })
}

window.addEventListener('scroll', debounce(checkSlide))