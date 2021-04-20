/* Functions to complete DOM */

/* Function to complete DOM for a movie */
function fillMovieDom(modal){
    return "<img class='movie' src='' onclick='openModal(" + modal + ")'><div id='" + modal + "' class='modal'>"
    +"<div class='modal-content'><span class='close' onclick='closeModal(" + modal + ")'>&times;</span>"
    +"<img class='modal-picture' src=''><p></p></div></div>";
}

/* Function to complete DOM for a category (one category = 4 movies) */
function fillCarouselDom(modal1, modal2, modal3, modal4){
    return fillMovieDom(modal1) + fillMovieDom(modal2) + fillMovieDom(modal3) + fillMovieDom(modal4);
}

const bestMoviesCarousel = document.querySelector("#best-rated-movies .carousel-movies");
const firstCategoryCarousel = document.querySelector("#first-category .carousel-movies");
const secondCategoryCarousel = document.querySelector("#second-category .carousel-movies");
const thirdCategoryCarousel = document.querySelector("#third-category .carousel-movies");

bestMoviesCarousel.innerHTML= fillCarouselDom('modal1', 'modal2', 'modal3', 'modal4');
firstCategoryCarousel.innerHTML= fillCarouselDom('modal5', 'modal6', 'modal7', 'modal8');
secondCategoryCarousel.innerHTML= fillCarouselDom('modal9', 'modal10', 'modal11', 'modal12');
thirdCategoryCarousel.innerHTML= fillCarouselDom('modal13', 'modal14', 'modal15', 'modal16');

const modals = [modal1, modal2, modal3, modal4, modal5, modal6, modal7, modal7, modal8, modal9, modal10,
modal11, modal12, modal13, modal14, modal15, modal16, modalBestMovie];

/* Function to open the modal on click */
function openModal(modal) {
    modal.style.display = "block";
}

/* Function to close the modal on click */
function closeModal(modal) {
    modal.style.display = "none";
}

/* Function to close the modal when clicking outside */
window.onclick = function(event) {
    for (modal of modals){
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
