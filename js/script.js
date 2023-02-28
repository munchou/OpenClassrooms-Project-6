const main_url = 'http://localhost:8000/api/v1/titles/';
const categories_links = [
    ['http://localhost:8000/api/v1/titles/?sort_by=-imdb_score', 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page=2'],
    ['http://localhost:8000/api/v1/titles/?genre=Animation&sort_by=-votes', 'http://localhost:8000/api/v1/titles/?genre=Animation&page=2&sort_by=-votes'],
    ['http://localhost:8000/api/v1/titles/?genre=Comedy&sort_by=-votes', 'http://localhost:8000/api/v1/titles/?genre=Comedy&page=2&sort_by=-votes'],
    ['http://localhost:8000/api/v1/titles/?genre=Sci-Fi&sort_by=-votes', 'http://localhost:8000/api/v1/titles/?genre=Sci-Fi&page=2&sort_by=-votes'],
];

let category_best_movies = [];
let category_animation = [];
let category_comedy = [];
let category_scifi = [];

function each_carousel(category) {
    const carousel = document.querySelector(`[data-target='carousel_${category}']`);
    const card = carousel.querySelector("[data-target='card']");
    
    const leftButton = document.querySelector(`[data-action='slideLeft_${category}']`);
    const rightButton = document.querySelector(`[data-action='slideRight_${category}']`);  

    // Prepare to limit the direction in which the carousel can slide, 
    // and to control how much the carousel advances by each time.
    // In order to slide the carousel so that only three cards are perfectly visible each time,
    // you need to know the carousel width, and the margin placed on a given card in the carousel
    const cardWidth = 160;
    // const carouselWidth = carousel.offsetWidth;
    const cardStyle = card.currentStyle || window.getComputedStyle(card)
    const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);
    
    // Count the number of total cards you have
    // const cardCount = carousel.querySelectorAll("[data-target='card']").length;
    const cardCount = 7;
    
    // Define an offset property to dynamically update by clicking the button controls
    // as well as a maxX property so the carousel knows when to stop at the upper limit
    let offset = 0;
    // const maxX = -((cardCount / 4) * carouselWidth + (cardMarginRight * (cardCount / 4)) - carouselWidth - cardMarginRight);
    const maxX = -(((cardCount * cardWidth) + (cardCount - 1)*cardMarginRight) -((cardWidth * 4) + cardMarginRight*3));
    // const maxX = -960;
    
    
    // Add the click events
    leftButton.addEventListener("click", function() {
      if (offset !== 0) {
        offset += cardWidth + cardMarginRight;
        carousel.style.transform = `translateX(${offset}px)`;
        }
    })
      
    rightButton.addEventListener("click", function() {
      if (offset !== maxX) {
        offset -= cardWidth + cardMarginRight;
        carousel.style.transform = `translateX(${offset}px)`;
      }
    })
}


async function movies_genre_url(other_urls, movie_url) {
    for (let i = 0; i < other_urls.length; i++) {
        const response = await fetch(other_urls[i]);
        const response_json = await response.json();

        for (let i = 0; i < response_json.results.length; i++) {
            movie_url.push(main_url + response_json.results[i].id);
        }
    }
}

async function addMovie (movie_url, category) {

    if (category === "category_best_movie"){

        const response = await fetch(movie_url);
        const movie_details = await response.json();

        const modal_content = `
        
            <div>
                <h1>Best rated movie</h1>
                <img class="best_movie_img" src=${movie_details.image_url} alt="best_movie" style="float:left";>
                <h2>${movie_details.title} (${movie_details.imdb_score}/10)</h2>
                <p class="description">Summary:<br>
                ${movie_details.description}</p>
                <a href="#modal_window" class="button">Show details</a>
                
            </div>
            
            <div id="modal_window" class="modal">
                <div class="modal-content">                    
                    <div class="modal_description">
                        <img src=${movie_details.image_url} alt="" style="float:right";>
                        <h2>${movie_details.title}</h2>
                        <p><u>Genre:</u> ${movie_details.genres}</p>
                        <p id="the_best_rating_date_published"><u>Release date:</u> ${movie_details.date_published}</p>
                        <p><u>Rated:</u> ${movie_details.rated}</p>
                        <p><u>Imdb score:</u> ${movie_details.imdb_score}</p>
                        <p><u>Director(s):</u> ${movie_details.directors}</p>
                        <p><u>Main actors:</u><br>${movie_details.actors}</p>
                        <p><u>Duration:</u> ${movie_details.duration} min.</p>
                        <p><u>Country of origin:</u> ${movie_details.countries}</p>
                        <p><u>Box office:</u> ${movie_details.budget}$</p>
                        <p><u>Summary:</u><br>${movie_details.long_description}</p>
                                             
                        <a href="#" class="button">Close the window</a>                       

                    </div>
                    
                </div>
            </div>`;

        let section = document.querySelector('#best_movie');
        section.innerHTML = modal_content;        
            
    }else{
        each_carousel(category);

        for (let i = 0; i < movie_url.length; i++) {
            const response = await fetch(movie_url[i]);
            const movie_details = await response.json();

        let movies_list = document.createElement('div');
        let movies_list_content = document.createElement('div');
        let movie_info = `
        <a href="#modal${category}${i}"><img class="carousel_movie_img" src=${movie_details.image_url} alt=""></a>`;
 
        let movie_info_content = `
        <div id="modal${category}${i}" class="modal">

            <div class="modal-content">                    
                <div class="modal_description">
                    <img src=${movie_details.image_url} alt="" style="float:right";>
                    <h2>${movie_details.title}</h2>
                    <p><u>Genre:</u> ${movie_details.genres}</p>
                    <p id="the_best_rating_date_published"><u>Release date:</u> ${movie_details.date_published}</p>
                    <p><u>Rated:</u> ${movie_details.rated}</p>
                    <p><u>Imdb score:</u> ${movie_details.imdb_score}</p>
                    <p><u>Director(s):</u> ${movie_details.directors}</p>
                    <p><u>Main actors:</u><br>${movie_details.actors}</p>
                    <p><u>Duration:</u> ${movie_details.duration} min.</p>
                    <p><u>Country of origin:</u> ${movie_details.countries}</p>
                    <p><u>Box office:</u> ${movie_details.budget}$</p>
                    <p><u>Summary:</u><br>${movie_details.long_description}</p>
                                            
                    <a href="#null" class="button">Close the window</a>                       

                </div>
                
            </div>
        </div>`;        
        
        movies_list.innerHTML = movie_info;
        document.querySelector(`#${category}`).appendChild(movies_list);
        movies_list_content.innerHTML = movie_info_content;
        document.querySelector(`#${category}_modal`).appendChild(movies_list_content);
        
        }
    }
}


async function main() {

    await movies_genre_url(categories_links[0], category_best_movies);
    await movies_genre_url(categories_links[1], category_animation);
    await movies_genre_url(categories_links[2], category_comedy);
    await movies_genre_url(categories_links[3], category_scifi);    

    addMovie(category_best_movies[0], "category_best_movie");
    addMovie(category_best_movies.splice(1, 8), "best_rated_movies");
    addMovie(category_animation, "categories_animation");
    addMovie(category_comedy, "categories_comedy");
    addMovie(category_scifi, "categories_scifi");
}


main();