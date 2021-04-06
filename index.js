let picturesBestRatedMovies = ['https://media.cdnws.com/_i/101847/858/746/61/3167v-chiffre-1.jpeg',
'https://media.cdnws.com/_i/101847/862/3228/65/3168v-chiffre-2.jpeg',
'https://media.cdnws.com/_i/101847/866/655/69/3169v-chiffre-3.jpeg',
'https://media.cdnws.com/_i/101847/870/54/73/3170v-chiffre-4.jpeg',
'https://media.cdnws.com/_i/101847/874/1330/77/3171v-chiffre-5.jpeg',
'https://media.cdnws.com/_i/101847/878/3935/81/3172v-chiffre-6.jpeg',
'https://media.cdnws.com/_i/101847/854/3793/57/3173v-chiffre-7.jpeg',
'https://media.cdnws.com/_i/101847/882/3937/85/3174v-chiffre-8.jpeg',
'https://media.cdnws.com/_i/101847/886/1756/89/3175v-chiffre-9.jpeg',
'https://media.cdnws.com/_i/101847/890/2566/93/3176v-chiffre-0.jpeg'];

let picturesFirstCategory = ['https://media.cdnws.com/_i/101847/858/746/61/3167v-chiffre-1.jpeg',
'https://media.cdnws.com/_i/101847/862/3228/65/3168v-chiffre-2.jpeg',
'https://media.cdnws.com/_i/101847/866/655/69/3169v-chiffre-3.jpeg',
'https://media.cdnws.com/_i/101847/870/54/73/3170v-chiffre-4.jpeg',
'https://media.cdnws.com/_i/101847/874/1330/77/3171v-chiffre-5.jpeg',
'https://media.cdnws.com/_i/101847/878/3935/81/3172v-chiffre-6.jpeg',
'https://media.cdnws.com/_i/101847/854/3793/57/3173v-chiffre-7.jpeg',
'https://media.cdnws.com/_i/101847/882/3937/85/3174v-chiffre-8.jpeg',
'https://media.cdnws.com/_i/101847/886/1756/89/3175v-chiffre-9.jpeg',
'https://media.cdnws.com/_i/101847/890/2566/93/3176v-chiffre-0.jpeg'];

let picturesSecondCategory = ['https://media.cdnws.com/_i/101847/858/746/61/3167v-chiffre-1.jpeg',
'https://media.cdnws.com/_i/101847/862/3228/65/3168v-chiffre-2.jpeg',
'https://media.cdnws.com/_i/101847/866/655/69/3169v-chiffre-3.jpeg',
'https://media.cdnws.com/_i/101847/870/54/73/3170v-chiffre-4.jpeg',
'https://media.cdnws.com/_i/101847/874/1330/77/3171v-chiffre-5.jpeg',
'https://media.cdnws.com/_i/101847/878/3935/81/3172v-chiffre-6.jpeg',
'https://media.cdnws.com/_i/101847/854/3793/57/3173v-chiffre-7.jpeg',
'https://media.cdnws.com/_i/101847/882/3937/85/3174v-chiffre-8.jpeg',
'https://media.cdnws.com/_i/101847/886/1756/89/3175v-chiffre-9.jpeg',
'https://media.cdnws.com/_i/101847/890/2566/93/3176v-chiffre-0.jpeg'];

let picturesThirdCategory = ['https://media.cdnws.com/_i/101847/858/746/61/3167v-chiffre-1.jpeg',
'https://media.cdnws.com/_i/101847/862/3228/65/3168v-chiffre-2.jpeg',
'https://media.cdnws.com/_i/101847/866/655/69/3169v-chiffre-3.jpeg',
'https://media.cdnws.com/_i/101847/870/54/73/3170v-chiffre-4.jpeg',
'https://media.cdnws.com/_i/101847/874/1330/77/3171v-chiffre-5.jpeg',
'https://media.cdnws.com/_i/101847/878/3935/81/3172v-chiffre-6.jpeg',
'https://media.cdnws.com/_i/101847/854/3793/57/3173v-chiffre-7.jpeg',
'https://media.cdnws.com/_i/101847/882/3937/85/3174v-chiffre-8.jpeg',
'https://media.cdnws.com/_i/101847/886/1756/89/3175v-chiffre-9.jpeg',
'https://media.cdnws.com/_i/101847/890/2566/93/3176v-chiffre-0.jpeg'];


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
        for (i=0;i<this.duplicatedPictures.length/4;i++){this.printedPictures.push(this.duplicatedPictures.slice(4*i,4*i+4))};
    }

    fillMoviesList(category){
        let movieCategory = category;
        let categoryId = document.getElementById(movieCategory);
        this.movies = categoryId.querySelectorAll('img.movie');
        this.firstMovie = this.movies[0];
        this.firstMovie.src = this.printedPictures[0][0];
        this.secondMovie = this.movies[1];
        this.secondMovie.src = this.printedPictures[0][1];
        this.thirdMovie = this.movies[2];
        this.thirdMovie.src = this.printedPictures[0][2];
        this.fourthMovie = this.movies[3];
        this.fourthMovie.src = this.printedPictures[0][3];
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

let carousel1 = new Carousel("best-rated-movies", picturesBestRatedMovies);
carousel1.fillPrintedPictures(picturesBestRatedMovies);
carousel1.fillMoviesList("best-rated-movies");

let carousel2 = new Carousel("first-category", picturesFirstCategory);
carousel2.fillPrintedPictures(picturesFirstCategory);
carousel2.fillMoviesList("first-category");

let carousel3 = new Carousel("second-category", picturesSecondCategory);
carousel3.fillPrintedPictures(picturesSecondCategory);
carousel3.fillMoviesList("second-category");

let carousel4 = new Carousel("third-category", picturesThirdCategory);
carousel4.fillPrintedPictures(picturesThirdCategory);
carousel4.fillMoviesList("third-category");

