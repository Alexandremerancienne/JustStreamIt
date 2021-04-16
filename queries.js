/* AJAX requests to get movies' pictures */

/* Function to sort an array of movies from a category */

function sortMovies(array){
   return(array.sort(function(a, b){
       if (b['imdb_score'] == a['imdb_score']){
           return b['votes']-a['votes'];}
       return b['imdb_score']-a['imdb_score'];}));}

/* Fetch request for the 10 first movies of a category */

function fetchCategoryMovies(categoryUrls){
    return categoryUrls.map(url => fetch(url));}

/* Function returning an array with the data (presented as a JSON) of the 7 first movies from a category.
   The function concatenates the 5 movies from the first request with the 2 first ones from the second request.
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

/* Function returning an array with the URLs of the pictures of the movies from a category */

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

/* Function to fill the text areas of a category's modals */

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

    let categoryModals = document.querySelectorAll(category + ' p');
    let firstMovieModal = categoryModals[0];
    let secondMovieModal = categoryModals[1];
    let thirdMovieModal = categoryModals[2];
    let fourthMovieModal = categoryModals[3];

    fillModal(firstMovieModal, dataFirstMovie);
    fillModal(secondMovieModal, dataSecondMovie);
    fillModal(thirdMovieModal, dataThirdMovie);
    fillModal(fourthMovieModal, dataFourthMovie);}

/* Functions to get the title, the picture and the description of the best rated movie */

function getBestMovieTitle(array){
    let bestMovieTitle = array[0].title;
    document.querySelector('section h2').innerHTML = bestMovieTitle;}

function getBestMoviePicture(array){
    let bestMoviePicture = document.querySelector('section img');
    bestMoviePicture.src = array[0];}

async function getBestMovieDescription(array){
    let bestMovieUrl = array[0].url;
    let requestBestMovie = await fetch(bestMovieUrl);
    let dataBestMovie = await requestBestMovie.json();
    let descriptionBestMovie = dataBestMovie.description;
    document.getElementById('description').innerHTML = descriptionBestMovie;
    let bestMovieModal = document.querySelector('#modalBestMovie p');
    fillModal(bestMovieModal, dataBestMovie);}

/* Function executing the three previous functions successively */

function getBestMovieDetails(array1, array2){
    getBestMovieTitle(array1);
    getBestMoviePicture(array2);
    getBestMovieDescription(array1);}

/* Execution of the functions defined above for all categories */

/* Best Rated Movies */

let bestMoviesUrls = ["http://localhost:8000/api/v1/titles/?sort_by=-imdb_score,-votes",
"http://localhost:8000/api/v1/titles/?page=2&sort_by=-imdb_score,-votes"];
let requestsBestMovies = fetchCategoryMovies(bestMoviesUrls);
requestCategoryMovies(requestsBestMovies).then(function(sortedBestMovies){
let sortedBestMoviesUrls = extractMoviesPicturesUrls(sortedBestMovies);
fillCarousel(sortedBestMoviesUrls, carousel1, "best-rated-movies");
getBestMovieDetails(sortedBestMovies, sortedBestMoviesUrls);
fillCategoryModals(sortedBestMovies, '#best-rated-movies');})

/* First Category Movies */

let firstCategoryUrls = ["http://localhost:8000/api/v1/titles/?&genre=animation&sort_by=-imdb_score,-votes",
"http://localhost:8000/api/v1/titles/?page=2&genre=animation&sort_by=-imdb_score,-votes"];
let requestsFirstCategory = fetchCategoryMovies(firstCategoryUrls);
requestCategoryMovies(requestsFirstCategory).then(function(sortedFirstCategory){
fillCarouselFromUrls(sortedFirstCategory, carousel2, "first-category");
fillCategoryModals(sortedFirstCategory, '#first-category');})

/* Second Category Movies */

let secondCategoryUrls = ["http://localhost:8000/api/v1/titles/?&genre=drama&sort_by=-imdb_score,-votes",
"http://localhost:8000/api/v1/titles/?page=2&genre=drama&sort_by=-imdb_score,-votes"];
let requestsSecondCategory = fetchCategoryMovies(secondCategoryUrls);
requestCategoryMovies(requestsSecondCategory).then(function(sortedSecondCategory){
fillCarouselFromUrls(sortedSecondCategory, carousel3, "second-category");
fillCategoryModals(sortedSecondCategory, '#second-category');})

/* Third Category Movies */

let thirdCategoryUrls = ["http://localhost:8000/api/v1/titles/?&genre=fantasy&sort_by=-imdb_score,-votes",
"http://localhost:8000/api/v1/titles/?page=2&genre=fantasy&sort_by=-imdb_score,-votes"];
let requestsThirdCategory = fetchCategoryMovies(thirdCategoryUrls);
requestCategoryMovies(requestsThirdCategory).then(function(sortedThirdCategory){
fillCarouselFromUrls(sortedThirdCategory, carousel4, "third-category");
fillCategoryModals(sortedThirdCategory, '#third-category');})