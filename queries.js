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

/* Function returning an array with the URLs of the movies from a category */

function extractMoviesUrls(sortedCategoryMovies){
    return sortedCategoryMovies.map(x => x['image_url']);}

/* Function filling a carousel with movies' pictures */

function fillCarousel(sortedCategoryUrls, carousel, carouselCategory){
    carousel.category = carouselCategory;
    carousel.pictures = sortedCategoryUrls;
    carousel.fillCategoryMovies(sortedCategoryUrls);
    carousel.fillMoviesList(carouselCategory);}

/* Function executing extractMoviesUrls() function then fillCarousel() function */

function fillCarouselFromUrls(sortedCategoryMovies, carousel, carouselCategory){
    let sortedCategoryUrls = extractMoviesUrls(sortedCategoryMovies);
    fillCarousel(sortedCategoryUrls, carousel, carouselCategory);}

/* Functions to get the title, the picture and the description of the Best Rated Movie */

function getBestMovieTitle(array){
let bestMovieTitle = array[0].title;
document.querySelector('section h2').innerHTML = bestMovieTitle;}

function getBestMoviePicture(array){
let bestMoviePicture = document.querySelector('section img');
bestMoviePicture.src = array[0];}

function writeModal(element, data){
    element.innerHTML = "Genres: " + data.genres + "<br />"
    + "Release Date: " + data.date_published + "<br />" + "Rated: "
    + data.rated + "<br />" + "Imdb score: " + data.imdb_score + "<br />"
    + "Directed by: " + data.directors + "<br />" + "Actors: " + data.actors + "<br />"
    + "Duration: " + data.duration + "<br />" + "Countries: " + data.countries + "<br />"
    + "Box-Office Result: " + data.metascore + "<br />"
    + "Description: " + data.long_description + "<br />";}

async function getBestMovieDescription(array){
let bestMovieUrl = array[0].url;
let requestBestMovie = await fetch(bestMovieUrl);
let dataBestMovie = await requestBestMovie.json();
let descriptionBestMovie = dataBestMovie.description;
document.getElementById('description').innerHTML = descriptionBestMovie;
let bestMovieModal = document.querySelector('#modalBestMovie p');
writeModal(bestMovieModal, dataBestMovie);
}

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
let sortedBestMoviesUrls = extractMoviesUrls(sortedBestMovies);
fillCarousel(sortedBestMoviesUrls, carousel1, "best-rated-movies");
getBestMovieDetails(sortedBestMovies, sortedBestMoviesUrls);})

/* First Category Movies */

let firstCategoryUrls = ["http://localhost:8000/api/v1/titles/?&genre=animation&sort_by=-imdb_score,-votes",
"http://localhost:8000/api/v1/titles/?page=2&genre=animation&sort_by=-imdb_score,-votes"];
let requestsFirstCategory = fetchCategoryMovies(firstCategoryUrls);
requestCategoryMovies(requestsFirstCategory).then(function(sortedFirstCategory){
fillCarouselFromUrls(sortedFirstCategory, carousel2, "first-category");})

/* Second Category Movies */

let secondCategoryUrls = ["http://localhost:8000/api/v1/titles/?&genre=drama&sort_by=-imdb_score,-votes",
"http://localhost:8000/api/v1/titles/?page=2&genre=drama&sort_by=-imdb_score,-votes"];
let requestsSecondCategory = fetchCategoryMovies(secondCategoryUrls);
requestCategoryMovies(requestsSecondCategory).then(function(sortedSecondCategory){
fillCarouselFromUrls(sortedSecondCategory, carousel3, "second-category");})

/* Third Category Movies */

let thirdCategoryUrls = ["http://localhost:8000/api/v1/titles/?&genre=fantasy&sort_by=-imdb_score,-votes",
"http://localhost:8000/api/v1/titles/?page=2&genre=fantasy&sort_by=-imdb_score,-votes"];
let requestsThirdCategory = fetchCategoryMovies(thirdCategoryUrls);
requestCategoryMovies(requestsThirdCategory).then(function(sortedThirdCategory){
fillCarouselFromUrls(sortedThirdCategory, carousel4, "third-category");})

/* Once the carousels have been completed, the following functions will fill the modals for each picture */

async function getMovieDescription(movie){
let movieUrl = movie.url;
let requestMovie = await fetch(movieUrl);
let dataMovie = await requestMovie.json();
return dataMovie;}

async function getModalsDetails(){

let bestMoviesModals = document.querySelectorAll("#best-rated-movies p");
for (p of bestMoviesModals){
p.textContent = "";
}}

getModalsDetails();
