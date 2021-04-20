/* AJAX requests to get movies' pictures */

/* Function to sort an array of movies from a category.
Movies are first sorted by descending imdb score.
If two movies have the same imdb score,
they are sorted by descending number of votes. */

function sortMovies(array){
   return(array.sort(function(a, b){
       if (b['imdb_score'] == a['imdb_score']){
           return b['votes']-a['votes'];}
       return b['imdb_score']-a['imdb_score'];}));}

/* Fetch request to get the 10 first movies from a category */

function fetchCategoryMovies(categoryUrls){
    return categoryUrls.map(url => fetch(url));
}

/* Function returning an array with the data (presented as a JSON) of the 7 first movies from a category.
   The function concatenates the 5 movies from the first request with the 2 first movies from the second request.
   As films are sorted only in the sub-arrays, the output list is sorted before being returned. */

async function requestCategoryMovies(categoryRequests){
    const firstResponse = await categoryRequests[0];
    const firstData = await firstResponse.json();
    const firstResults = await firstData.results;
    const secondResponse = await categoryRequests[1];
    const secondData = await secondResponse.json();
    const secondResults = secondData.results;
    const categoryMovies = firstResults.concat(secondResults.slice(0,2));
    const sortedCategoryMovies = sortMovies(categoryMovies);
    return sortedCategoryMovies;
}

/* Function returning an array with the pictures'URLs of the movies from a category */

function extractMoviesPicturesUrls(sortedCategoryMovies){
    return sortedCategoryMovies.map(x => x['image_url']);
}

/* Function filling a carousel with movies' pictures */

function fillCarousel(sortedCategoryUrls, carousel, carouselCategory){
    carousel.category = carouselCategory;
    carousel.pictures = sortedCategoryUrls;
    carousel.fillCategoryMovies(sortedCategoryUrls);
    carousel.fillMoviesList(carouselCategory);
}

/* Function executing extractMoviesPicturesUrls() and fillCarousel() functions successively */

function fillCarouselFromUrls(sortedCategoryMovies, carousel, carouselCategory){
    const sortedCategoryUrls = extractMoviesPicturesUrls(sortedCategoryMovies);
    fillCarousel(sortedCategoryUrls, carousel, carouselCategory);
}

/* Functions to get the title, the picture and the description of the best rated movie */

function getBestMovieTitle(array){
    const bestMovieTitle = array[0].title;
    document.querySelector('section h2').innerHTML = bestMovieTitle;
}

function getBestMoviePicture(array){
    const bestMoviePicture = document.querySelector('.best-movie-picture');
    const bestMovieModalPicture = document.querySelector('.modal-picture');
    bestMoviePicture.src = array[0];
    bestMovieModalPicture.src = array[0];
}

async function getBestMovieDescription(array){
    const bestMovieUrl = array[0].url;
    const requestBestMovie = await fetch(bestMovieUrl);
    const dataBestMovie = await requestBestMovie.json();
    const descriptionBestMovie = dataBestMovie.description;
    document.getElementById('description').innerHTML = descriptionBestMovie;
    const bestMovieModal = document.querySelector('#modalBestMovie p');
    fillModalText(bestMovieModal, dataBestMovie);
}

/* Function executing the three previous functions successively */

function getBestMovieDetails(array1, array2){
    getBestMovieTitle(array1);
    getBestMoviePicture(array2);
    getBestMovieDescription(array1);
}

/* Function to fill the text area of a modal */

function fillModalText(element, data){
    element.innerHTML = "<b>Title: </b>" + data.title + "<br />" + "<b>Genres: </b>" + data.genres + "<br />"
    + "<b>Release Date: </b>" + data.date_published + "<br />" + "<b>Rated: </b>" + data.rated + "<br />"
    + "<b>Imdb score: </b>" + data.imdb_score + "<br />" + "<b>Directed by: </b>" + data.directors + "<br />"
    + "<b>Actors: </b>" + data.actors + "<br />" + "<b>Duration: </b>" + data.duration + "<br />"
    + "<b>Countries: </b>" + data.countries + "<br />" + "<b>Box-Office Result: </b>" + data.metascore + "<br />"
    + "<br />" + "<br />" + data.long_description + "<br />";
}

/* Function to fill the image area of a modal */

function fillModalPicture(img, data){
    img.src = data.image_url;
}

/* Function to fill all the modals from a category for the 4 pictures displayed */

async function fillCategoryModals(array, category){
    const requestFirstMovie = await fetch(array[0].url);
    const requestSecondMovie = await fetch(array[1].url);
    const requestThirdMovie = await fetch(array[2].url);
    const requestFourthMovie = await fetch(array[3].url);

    const dataFirstMovie = await requestFirstMovie.json();
    const dataSecondMovie = await requestSecondMovie.json();
    const dataThirdMovie = await requestThirdMovie.json();
    const dataFourthMovie = await requestFourthMovie.json();
    const dataMovies = [dataFirstMovie, dataSecondMovie, dataThirdMovie, dataFourthMovie];

    const categoryModalsText = document.querySelectorAll(category + ' p');
    const categoryModalsPictures = document.querySelectorAll(category + ' .modal-picture');
    const [firstMovieModalText, secondMovieModalText, thirdMovieModalText, fourthMovieModalText] = categoryModalsText;
    const [firstMovieModalPic, secondMovieModalPic, thirdMovieModalPic, fourthMovieModalPic] = categoryModalsPictures;

    for(i=0;i<=3;i++){
        fillModalText(categoryModalsText[i], dataMovies[i]);
        fillModalPicture(categoryModalsPictures[i], dataMovies[i]);
    }
}

/* Execution of the functions defined above for all categories */

/* Best Rated Movies */

const bestMoviesUrls = ["http://localhost:8000/api/v1/titles/?sort_by=-imdb_score,-votes",
"http://localhost:8000/api/v1/titles/?page=2&sort_by=-imdb_score,-votes"];
const requestsBestMovies = fetchCategoryMovies(bestMoviesUrls);
requestCategoryMovies(requestsBestMovies).then(function(sortedBestMovies){
const sortedBestMoviesUrls = extractMoviesPicturesUrls(sortedBestMovies);
fillCarousel(sortedBestMoviesUrls, carousel1, "best-rated-movies");
carousel1.fillAllModals(sortedBestMovies);
carousel1.displayedModals = carousel1.categoryModals[0];
getBestMovieDetails(sortedBestMovies, sortedBestMoviesUrls);
fillCategoryModals(carousel1.displayedModals, '#best-rated-movies');})

/* First Category Movies */

const firstCategoryUrls = ["http://localhost:8000/api/v1/titles/?&genre=animation&sort_by=-imdb_score,-votes",
"http://localhost:8000/api/v1/titles/?page=2&genre=animation&sort_by=-imdb_score,-votes"];
const requestsFirstCategory = fetchCategoryMovies(firstCategoryUrls);
requestCategoryMovies(requestsFirstCategory).then(function(sortedFirstCategory){
const sortedFirstCategoryUrls = extractMoviesPicturesUrls(sortedFirstCategory);
fillCarousel(sortedFirstCategoryUrls, carousel2, "first-category");
carousel2.fillAllModals(sortedFirstCategory);
carousel2.displayedModals = carousel2.categoryModals[0];
fillCategoryModals(carousel2.displayedModals, '#first-category');})

/* Second Category Movies */

const secondCategoryUrls = ["http://localhost:8000/api/v1/titles/?&genre=drama&sort_by=-imdb_score,-votes",
"http://localhost:8000/api/v1/titles/?page=2&genre=drama&sort_by=-imdb_score,-votes"];
const requestsSecondCategory = fetchCategoryMovies(secondCategoryUrls);
requestCategoryMovies(requestsSecondCategory).then(function(sortedSecondCategory){
const sortedSecondCategoryUrls = extractMoviesPicturesUrls(sortedSecondCategory);
fillCarousel(sortedSecondCategoryUrls, carousel3, "second-category");
carousel3.fillAllModals(sortedSecondCategory);
carousel3.displayedModals = carousel3.categoryModals[0];
fillCategoryModals(carousel3.displayedModals, '#second-category');})

/* Third Category Movies */

const thirdCategoryUrls = ["http://localhost:8000/api/v1/titles/?&genre=fantasy&sort_by=-imdb_score,-votes",
"http://localhost:8000/api/v1/titles/?page=2&genre=fantasy&sort_by=-imdb_score,-votes"];
const requestsThirdCategory = fetchCategoryMovies(thirdCategoryUrls);
requestCategoryMovies(requestsThirdCategory).then(function(sortedThirdCategory){
const sortedThirdCategoryUrls = extractMoviesPicturesUrls(sortedThirdCategory);
fillCarousel(sortedThirdCategoryUrls, carousel4, "third-category");
carousel4.fillAllModals(sortedThirdCategory);
carousel4.displayedModals = carousel4.categoryModals[0];
fillCategoryModals(carousel4.displayedModals, '#third-category');})