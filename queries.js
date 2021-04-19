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
    return categoryUrls.map(url => fetch(url));}

/* Function returning an array with the data (presented as a JSON) of the 7 first movies from a category.
   The function concatenates the 5 movies from the first request with the 2 first movies from the second request.
   As films are sorted only in the sub-arrays, the output list is sorted before being returned. */

async function requestCategoryMovies(categoryRequests){
    let firstResponse = await categoryRequests[0];
    let firstData = await firstResponse.json();
    let firstResults = await firstData.results;
    let secondResponse = await categoryRequests[1];
    let secondData = await secondResponse.json();
    let secondResults = await secondData.results;
    let categoryMovies = firstResults.concat(secondResults.slice(0,2));
    let sortedCategoryMovies = sortMovies(categoryMovies);
    return sortedCategoryMovies;}

/* Function returning an array with the pictures'URLs of the movies from a category */

function extractMoviesPicturesUrls(sortedCategoryMovies){
    return sortedCategoryMovies.map(x => x['image_url']);}

/* Function filling a carousel with movies' pictures */

function fillCarousel(sortedCategoryUrls, carousel, carouselCategory){
    carousel.category = carouselCategory;
    carousel.pictures = sortedCategoryUrls;
    carousel.fillCategoryMovies(sortedCategoryUrls);
    carousel.fillMoviesList(carouselCategory);}

/* Function executing extractMoviesPicturesUrls() and fillCarousel() functions successively */

function fillCarouselFromUrls(sortedCategoryMovies, carousel, carouselCategory){
    let sortedCategoryUrls = extractMoviesPicturesUrls(sortedCategoryMovies);
    fillCarousel(sortedCategoryUrls, carousel, carouselCategory);}

/* Functions to get the title, the picture and the description of the best rated movie */

function getBestMovieTitle(array){
    let bestMovieTitle = array[0].title;
    document.querySelector('section h2').innerHTML = bestMovieTitle;}

function getBestMoviePicture(array){
    let bestMoviePicture = document.querySelector('.best-movie-picture');
    let bestMovieModalPicture = document.querySelector('.modal-picture');
    bestMoviePicture.src = array[0];
    bestMovieModalPicture.src = array[0];}

async function getBestMovieDescription(array){
    let bestMovieUrl = array[0].url;
    let requestBestMovie = await fetch(bestMovieUrl);
    let dataBestMovie = await requestBestMovie.json();
    let descriptionBestMovie = dataBestMovie.description;
    document.getElementById('description').innerHTML = descriptionBestMovie;
    let bestMovieModal = document.querySelector('#modalBestMovie p');
    fillModalText(bestMovieModal, dataBestMovie);}

/* Function executing the three previous functions successively */

function getBestMovieDetails(array1, array2){
    getBestMovieTitle(array1);
    getBestMoviePicture(array2);
    getBestMovieDescription(array1);}

/* Function to fill the text area of a modal */

function fillModalText(element, data){
    element.innerHTML = "<b>Title: </b>" + data.title + "<br />"
    + "<b>Genres: </b>" + data.genres + "<br />"
    + "<b>Release Date: </b>" + data.date_published + "<br />" + "<b>Rated: </b>"
    + data.rated + "<br />" + "<b>Imdb score: </b>" + data.imdb_score + "<br />"
    + "<b>Directed by: </b>" + data.directors + "<br />" + "<b>Actors: </b>" + data.actors + "<br />"
    + "<b>Duration: </b>" + data.duration + "<br />" + "<b>Countries: </b>" + data.countries + "<br />"
    + "<b>Box-Office Result: </b>" + data.metascore + "<br />" + "<br />" + "<br />"
    + data.long_description + "<br />";}

/* Function to fill the image area of a modal */

function fillModalPicture(img, data){
    img.src = data.image_url;}

/* Function to fill all the modals from a category for the 4 pictures displayed */

async function fillCategoryModals(array, category){
    let firstMovieUrl = array[0].url;
    let secondMovieUrl = array[1].url;
    let thirdMovieUrl = array[2].url;
    let fourthMovieUrl = array[3].url;

    let requestFirstMovie = await fetch(firstMovieUrl);
    let requestSecondMovie = await fetch(secondMovieUrl);
    let requestThirdMovie = await fetch(thirdMovieUrl);
    let requestFourthMovie = await fetch(fourthMovieUrl);

    let dataFirstMovie = await requestFirstMovie.json();
    let dataSecondMovie = await requestSecondMovie.json();
    let dataThirdMovie = await requestThirdMovie.json();
    let dataFourthMovie = await requestFourthMovie.json();

    let categoryModalsText = document.querySelectorAll(category + ' p');
    let categoryModalsPictures = document.querySelectorAll(category + ' .modal-picture');
    let firstMovieModalText = categoryModalsText[0];
    let firstMovieModalPicture = categoryModalsPictures[0];
    let secondMovieModalText = categoryModalsText[1];
    let secondMovieModalPicture = categoryModalsPictures[1];
    let thirdMovieModalText = categoryModalsText[2];
    let thirdMovieModalPicture = categoryModalsPictures[2];
    let fourthMovieModalText = categoryModalsText[3];
    let fourthMovieModalPicture = categoryModalsPictures[3];

    fillModalText(firstMovieModalText, dataFirstMovie);
    fillModalText(secondMovieModalText, dataSecondMovie);
    fillModalText(thirdMovieModalText, dataThirdMovie);
    fillModalText(fourthMovieModalText, dataFourthMovie);

    fillModalPicture(firstMovieModalPicture, dataFirstMovie);
    fillModalPicture(secondMovieModalPicture, dataSecondMovie);
    fillModalPicture(thirdMovieModalPicture, dataThirdMovie);
    fillModalPicture(fourthMovieModalPicture, dataFourthMovie);}

/* Execution of the functions defined above for all categories */

/* Best Rated Movies */

let bestMoviesUrls = ["http://localhost:8000/api/v1/titles/?sort_by=-imdb_score,-votes",
"http://localhost:8000/api/v1/titles/?page=2&sort_by=-imdb_score,-votes"];
let requestsBestMovies = fetchCategoryMovies(bestMoviesUrls);
requestCategoryMovies(requestsBestMovies).then(function(sortedBestMovies){
let sortedBestMoviesUrls = extractMoviesPicturesUrls(sortedBestMovies);
fillCarousel(sortedBestMoviesUrls, carousel1, "best-rated-movies");
carousel1.fillAllModals(sortedBestMovies);
carousel1.displayedModals = carousel1.categoryModals[0];
getBestMovieDetails(sortedBestMovies, sortedBestMoviesUrls);
fillCategoryModals(carousel1.displayedModals, '#best-rated-movies');})

/* First Category Movies */

let firstCategoryUrls = ["http://localhost:8000/api/v1/titles/?&genre=animation&sort_by=-imdb_score,-votes",
"http://localhost:8000/api/v1/titles/?page=2&genre=animation&sort_by=-imdb_score,-votes"];
let requestsFirstCategory = fetchCategoryMovies(firstCategoryUrls);
requestCategoryMovies(requestsFirstCategory).then(function(sortedFirstCategory){
let sortedFirstCategoryUrls = extractMoviesPicturesUrls(sortedFirstCategory);
fillCarousel(sortedFirstCategoryUrls, carousel2, "first-category");
carousel2.fillAllModals(sortedFirstCategory);
carousel2.displayedModals = carousel2.categoryModals[0];
fillCategoryModals(carousel2.displayedModals, '#first-category');})

/* Second Category Movies */

let secondCategoryUrls = ["http://localhost:8000/api/v1/titles/?&genre=drama&sort_by=-imdb_score,-votes",
"http://localhost:8000/api/v1/titles/?page=2&genre=drama&sort_by=-imdb_score,-votes"];
let requestsSecondCategory = fetchCategoryMovies(secondCategoryUrls);
requestCategoryMovies(requestsSecondCategory).then(function(sortedSecondCategory){
let sortedSecondCategoryUrls = extractMoviesPicturesUrls(sortedSecondCategory);
fillCarousel(sortedSecondCategoryUrls, carousel3, "second-category");
carousel3.fillAllModals(sortedSecondCategory);
carousel3.displayedModals = carousel3.categoryModals[0];
fillCategoryModals(carousel3.displayedModals, '#second-category');})

/* Third Category Movies */

let thirdCategoryUrls = ["http://localhost:8000/api/v1/titles/?&genre=fantasy&sort_by=-imdb_score,-votes",
"http://localhost:8000/api/v1/titles/?page=2&genre=fantasy&sort_by=-imdb_score,-votes"];
let requestsThirdCategory = fetchCategoryMovies(thirdCategoryUrls);
requestCategoryMovies(requestsThirdCategory).then(function(sortedThirdCategory){
let sortedThirdCategoryUrls = extractMoviesPicturesUrls(sortedThirdCategory);
fillCarousel(sortedThirdCategoryUrls, carousel4, "third-category");
carousel4.fillAllModals(sortedThirdCategory);
carousel4.displayedModals = carousel4.categoryModals[0];
fillCategoryModals(carousel4.displayedModals, '#third-category');})