/* AJAX requests to get movies' pictures */

/* Function to sort the requests for a category */

function sortMovies(array){
   return(array.sort(function(a, b){
       if (b['imdb_score'] == a['imdb_score']){
           return b['votes']-a['votes'];}
       return b['imdb_score']-a['imdb_score'];}
   ));}

/* Best Rated Movies : fetch request returning an array of the 7 first movies' pictures */

let bestMoviesUrls = ["http://localhost:8000/api/v1/titles/?sort_by=-imdb_score,-votes",
"http://localhost:8000/api/v1/titles/?page=2&sort_by=-imdb_score,-votes"];

let requestsBestMovies = bestMoviesUrls.map(url => fetch(url));

async function requestBestMovies(){

    /* Requests to return the 7 best-rated movies in the form of an array */

    let request1 = requestsBestMovies[0];
    let request2 = requestsBestMovies[1];
    await request1.then(response => response.json()).then(data => bestMovies1 = data.results);
    await request2.then(response => response.json()).then(data => bestMovies2 = data.results);
    let bestMoviesList = bestMovies1.concat(bestMovies2.slice(0,2));
    var bestMoviesSorted = sortMovies(bestMoviesList);

    /* Extraction of the title of the best-rated movie to be included in DOM */

    var bestMovieTitle = bestMoviesSorted[0]['title'];
    document.querySelector('section h2').innerHTML = bestMovieTitle;

    /* Extraction of the description of the best-rated movie to be included in DOM */

    var bestMovieId = bestMoviesSorted[0]['id'];
    let request = fetch("http://localhost:8000/api/v1/titles/" + bestMovieId.toString());
    await request.then(response => response.json()).then(data => description = data.description);
    document.getElementById('description').innerHTML = description;

    return bestMoviesSorted;}

/* Best Rated Movies : Carousel completed with the array of pictures' urls */

requestBestMovies().then(function(bestMoviesSorted){

    /* Extraction of pictures' url from the array of best-rated movies */

    var bestMoviesUrlsSorted = bestMoviesSorted.map(x => x['image_url']);
    var bestRatedMovie = document.querySelector('section img');
    bestRatedMovie.src = bestMoviesUrlsSorted[0];
    carousel1.category = "best-rated-movies";
    carousel1.pictures = bestMoviesUrlsSorted;
    carousel1.fillCategoryMovies(bestMoviesUrlsSorted);
    carousel1.fillMoviesList("best-rated-movies");
    });

/* First Category Movies : fetch request returning an array of the 7 first movies' pictures */

let firstCategoryUrls = ["http://localhost:8000/api/v1/titles/?&genre=animation&sort_by=-imdb_score,-votes",
"http://localhost:8000/api/v1/titles/?page=2&genre=animation&sort_by=-imdb_score,-votes"];

let requestsFirstCategory = firstCategoryUrls.map(url => fetch(url));

async function requestFirstCategory(){
    var request1 = requestsFirstCategory[0];
    var request2 = requestsFirstCategory[1];
    await request1.then(response => response.json()).then(data => firstCategory1 = data.results);
    await request2.then(response => response.json()).then(data => firstCategory2 = data.results);
    var firstCategoryList = firstCategory1.concat(firstCategory2.slice(0,2));
    var firstCategorySorted = sortMovies(firstCategoryList);
    var firstCategoryUrlsSorted = firstCategorySorted.map(x => x['image_url']);
    return firstCategoryUrlsSorted;}

/* First Category Movies : Carousel completed with the array of movies' pictures */

requestFirstCategory().then(function(firstCategoryUrlsSorted){
    carousel2.category = "first-category";
    carousel2.pictures = firstCategoryUrlsSorted;
    carousel2.fillCategoryMovies(firstCategoryUrlsSorted);
    carousel2.fillMoviesList("first-category");});

/* Second Category Movies : fetch request returning an array of the 7 first movies' pictures */

let secondCategoryUrls = ["http://localhost:8000/api/v1/titles/?&genre=drama&sort_by=-imdb_score,-votes",
"http://localhost:8000/api/v1/titles/?page=2&genre=drama&sort_by=-imdb_score,-votes"];

let requestsSecondCategory = secondCategoryUrls.map(url => fetch(url));

async function requestSecondCategory(){
    var request1 = requestsSecondCategory[0];
    var request2 = requestsSecondCategory[1];
    await request1.then(response => response.json()).then(data => secondCategory1 = data.results);
    await request2.then(response => response.json()).then(data => secondCategory2 = data.results);
    var secondCategoryList = secondCategory1.concat(secondCategory2.slice(0,2));
    var secondCategorySorted = sortMovies(secondCategoryList);
    var secondCategoryUrlsSorted = secondCategorySorted.map(x => x['image_url']);
    return secondCategoryUrlsSorted;}

/* Second Category Movies : Carousel completed with the array of movies' pictures */

requestSecondCategory().then(function(secondCategoryUrlsSorted){
    carousel3.category = "second-category";
    carousel3.pictures = secondCategoryUrlsSorted;
    carousel3.fillCategoryMovies(secondCategoryUrlsSorted);
    carousel3.fillMoviesList("second-category");});

/* Third Category Movies : fetch request returning an array of the 7 first movies' pictures */

let thirdCategoryUrls = ["http://localhost:8000/api/v1/titles/?&genre=fantasy&sort_by=-imdb_score,-votes",
"http://localhost:8000/api/v1/titles/?page=2&genre=fantasy&sort_by=-imdb_score,-votes"];

let requestsThirdCategory = thirdCategoryUrls.map(url => fetch(url));

async function requestThirdCategory(){
    var request1 = requestsThirdCategory[0];
    var request2 = requestsThirdCategory[1];
    await request1.then(response => response.json()).then(data => thirdCategory1 = data.results);
    await request2.then(response => response.json()).then(data => thirdCategory2 = data.results);
    var thirdCategoryList = thirdCategory1.concat(thirdCategory2.slice(0,2));
    var thirdCategorySorted = sortMovies(thirdCategoryList);
    var thirdCategoryUrlsSorted = thirdCategorySorted.map(x => x['image_url']);
    return thirdCategoryUrlsSorted;}

/* Third Category Movies : Carousel completed with the array of movies' pictures */

requestThirdCategory().then(function(thirdCategoryUrlsSorted){
    carousel4.category = "third-category";
    carousel4.pictures = thirdCategoryUrlsSorted;
    carousel4.fillCategoryMovies(thirdCategoryUrlsSorted);
    carousel4.fillMoviesList("third-category");});