function fillModalText(element, data){
    element.innerHTML = "<b>Title: </b>" + data.title + "<br />"
    + "<b>Genres: </b>" + data.genres + "<br />"
    + "<b>Release Date: </b>" + data.date_published + "<br />" + "<b>Rated: </b>"
    + data.rated + "<br />" + "<b>Imdb score: </b>" + data.imdb_score + "<br />"
    + "<b>Directed by: </b>" + data.directors + "<br />" + "<b>Actors: </b>" + data.actors + "<br />"
    + "<b>Duration: </b>" + data.duration + "<br />" + "<b>Countries: </b>" + data.countries + "<br />"
    + "<b>Box-Office Result: </b>" + data.metascore + "<br />" + "<br />" + "<br />"
    + data.long_description + "<br />";}

function fillModalPicture(img, data){
    img.src = data.image_url;}

/* Carousel class */

class Carousel{
    constructor(category, pictures){
        this.category = category;
        this.pictures = pictures;
        this.modals = [];
        this.displayedModals = [];
        this.index = 0;
        this.categoryMovies = [];
        this.firstMovie = new Image();
        this.secondMovie = new Image();
        this.thirdMovie = new Image();
        this.fourthMovie = new Image();
    }

    fillCategoryMovies(pictures){
        let extendedPictures = pictures.concat(pictures, pictures, pictures);
        var i;
        for (i=0;i<7;i++){this.categoryMovies.push(extendedPictures.slice(4*i,4*i+4))};
    }

    fillCategoryModals(){
        var j;
        for (j=0;j<7;j++){this.displayedModals.push(this.modals.slice(4*i,4*i+4))};
    }

    fillMoviesList(movieCategory){
        let categoryId = document.getElementById(movieCategory);
        let displayedMovies = this.categoryMovies[0];
        let movies = categoryId.querySelectorAll('img.movie');
        this.firstMovie = movies[0];
        this.secondMovie = movies[1];
        this.thirdMovie = movies[2];
        this.fourthMovie = movies[3];
        this.firstMovie.src = displayedMovies[0];
        this.secondMovie.src = displayedMovies[1];
        this.thirdMovie.src = displayedMovies[2];
        this.fourthMovie.src = displayedMovies[3];
    }

    moveRight(){
        this.index ++;
        if (this.index > this.categoryMovies.length-1){this.index=0;}
        this.firstMovie.src = this.categoryMovies[this.index][0];
        this.secondMovie.src = this.categoryMovies[this.index][1];
        this.thirdMovie.src = this.categoryMovies[this.index][2];
        this.fourthMovie.src = this.categoryMovies[this.index][3];
        this.displayedModals = this.modals[index];

    }

    moveLeft(){
        this.index --;
        if (this.index < 0){this.index = this.categoryMovies.length-1;}
        this.firstMovie.src = this.categoryMovies[this.index][0];
        this.secondMovie.src = this.categoryMovies[this.index][1];
        this.thirdMovie.src = this.categoryMovies[this.index][2];
        this.fourthMovie.src = this.categoryMovies[this.index][3];
        this.displayedModals = this.modals[index];
    }
}

/* Generation of 4 carousels */

let carousel1 = new Carousel();
let carousel2 = new Carousel();
let carousel3 = new Carousel();
let carousel4 = new Carousel();

