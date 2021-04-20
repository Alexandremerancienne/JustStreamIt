# JustStreamIt
Web application offering an up-to-date selection of movies.  
The database is provided by an [API REST](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR) executed locally and designed for educational purposes.

# Folders and files

## index.html

HTML code of the application.

## CSS

CSS and SASS code of the application.

## index.js

Script dedicated to the creation and the functioning of the carousels.  
Four carousels are created from the generic Carousel class.  
The HTML content of the carousel is specified in modals.js file.

## modals.js

Script monitoring the modals of the website.  
The modals (embedded in the carousels) are first added to DOM.  
The functioning of the modals is then precised by additional functions. 

## queries.js

Ajax requests to get movie information from the API REST and fill the carousels and the modals of the website.
