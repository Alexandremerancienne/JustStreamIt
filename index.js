const moviesThirdCategory = document.querySelectorAll('#third-category img.movie');
const firstMovie = moviesThirdCategory[0];
const secondMovie = moviesThirdCategory[1];
const thirdMovie = moviesThirdCategory[2];
const fourthMovie = moviesThirdCategory[3];

let pictures = ['https://media.cdnws.com/_i/101847/890/2566/93/3176v-chiffre-0.jpeg',
'https://media.cdnws.com/_i/101847/858/746/61/3167v-chiffre-1.jpeg',
'https://media.cdnws.com/_i/101847/862/3228/65/3168v-chiffre-2.jpeg',
'https://media.cdnws.com/_i/101847/866/655/69/3169v-chiffre-3.jpeg',
'https://media.cdnws.com/_i/101847/870/54/73/3170v-chiffre-4.jpeg',
'https://media.cdnws.com/_i/101847/874/1330/77/3171v-chiffre-5.jpeg',
'https://media.cdnws.com/_i/101847/878/3935/81/3172v-chiffre-6.jpeg',
'https://media.cdnws.com/_i/101847/854/3793/57/3173v-chiffre-7.jpeg',
'https://media.cdnws.com/_i/101847/882/3937/85/3174v-chiffre-8.jpeg',
'https://media.cdnws.com/_i/101847/886/1756/89/3175v-chiffre-9.jpeg']

let repeatedPictures = pictures.concat(pictures,pictures,pictures);

var picturesToPrint = [];
for (i=0;i<repeatedPictures.length/4;i++){picturesToPrint.push(repeatedPictures.slice(4*i,4*i+4))};

firstMovie.src = picturesToPrint[0][0];
secondMovie.src = picturesToPrint[0][1];
thirdMovie.src = picturesToPrint[0][2];
fourthMovie.src = picturesToPrint[0][3];

let position = 0;

function moveRight(){
	position ++;
	if (position > picturesToPrint.length-1){position=0;}
    firstMovie.src = picturesToPrint[position][0];
    secondMovie.src = picturesToPrint[position][1];
    thirdMovie.src = picturesToPrint[position][2];
    fourthMovie.src = picturesToPrint[position][3];}

function moveLeft(){
	position --;
	if (position < 0){position = picturesToPrint.length-1;}
    firstMovie.src = picturesToPrint[position][0];
    secondMovie.src = picturesToPrint[position][1];
    thirdMovie.src = picturesToPrint[position][2];
    fourthMovie.src = picturesToPrint[position][3];}
