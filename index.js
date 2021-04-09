/* Carousel class */

class Carousel{
    constructor(category, pictures){
        this.category = category;
        this.pictures = pictures;
        this.position = 0;
        this.duplicatedPictures = [];
        this.printedPictures = [];
        this.movies = [];
        this.firstMovie = new Image();
        this.secondMovie = new Image();
        this.thirdMovie = new Image();
        this.fourthMovie = new Image();
    }

    fillPrintedPictures(pictures){
        this.duplicatedPictures = pictures.concat(pictures, pictures, pictures);
        var i;
        for (i=0;i<7;i++){this.printedPictures.push(this.duplicatedPictures.slice(4*i,4*i+4))};
    }

    fillMoviesList(category){
        let movieCategory = category;
        let categoryId = document.getElementById(movieCategory);
        let displayedMovies = this.printedPictures[0];
        this.movies = categoryId.querySelectorAll('img.movie');
        this.firstMovie = this.movies[0];
        this.secondMovie = this.movies[1];
        this.thirdMovie = this.movies[2];
        this.fourthMovie = this.movies[3];
        this.firstMovie.src = displayedMovies[0];
        this.secondMovie.src = displayedMovies[1];
        this.thirdMovie.src = displayedMovies[2];
        this.fourthMovie.src = displayedMovies[3];
    }

    moveRight(){
        this.position ++;
        if (this.position > this.printedPictures.length-1){this.position=0;}
        this.firstMovie.src = this.printedPictures[this.position][0];
        this.secondMovie.src = this.printedPictures[this.position][1];
        this.thirdMovie.src = this.printedPictures[this.position][2];
        this.fourthMovie.src = this.printedPictures[this.position][3];
    }

    moveLeft(){
        this.position --;
        if (this.position < 0){this.position = this.printedPictures.length-1;}
        this.firstMovie.src = this.printedPictures[this.position][0];
        this.secondMovie.src = this.printedPictures[this.position][1];
        this.thirdMovie.src = this.printedPictures[this.position][2];
        this.fourthMovie.src = this.printedPictures[this.position][3];
    }
}

/* Generation of 4 carousels */

let carousel1 = new Carousel();
let carousel2 = new Carousel();
let carousel3 = new Carousel();
let carousel4 = new Carousel();

