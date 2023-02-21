// Select the carousel you'll need to manipulate and the buttons you'll add events to
// const carousel = document.querySelector("[data-target='carousel']");

//IMPORT the category var
// import { category } from "./script.js";

// test(testouille);

// const categories = ["best_rated_movies", "categories_animation", "categories_comedy", "categories_scifi");]

export function each_carousel(category) {
const carousel = document.querySelector(`[data-target='carousel_${category}']`);
const card = carousel.querySelector("[data-target='card']");

const leftButton = document.querySelector(`[data-action='slideLeft_${category}']`);
const rightButton = document.querySelector(`[data-action='slideRight_${category}']`);
}

// const rightButton = document.getElementById(`#${category}_modal`).querySelector("[data-action='slideRight']");

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