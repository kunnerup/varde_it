//Javascipt
"use strict";
//Burgermenu
function openMenu() {
    document.getElementById("burger").classList.toggle("open");
    document.getElementById("menu").classList.toggle("display");
}

//Loader til blog-indlæg
function showLoader(show) {
  let loader = document.querySelector('#loader');
  if (show) {
    loader.classList.remove("hide");
  } else {
    loader.classList.add("hide");
  }
}

//Wordpress blog element
//posts skal være et tomt array
let posts = [];

// Fetch alle post-indlæg
function getPosts() {
  fetch("http://anderskunnerup.dk/wordpress/wp-json/wp/v2/posts?per_page=100")
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json);
      appendPosts(json);
      posts = json;
      setTimeout(function() {
        showLoader(false);
      }, 200);
    });
}

getPosts();

// Her tilføjes blogindlægene til DOM'en
function appendPosts(posts) {
  let postContainer = "";

  for (let post of posts) {
    htmlTemplate += `
      <article>
        <h2>${post.title.rendered} (${post.acf.year})</h2>
        <img src="${post.acf.img}">
        <p>${post.acf.title}</p>
        <iframe src="${post.acf.trailer}"></iframe>
      </article>
    `;
  }

  document.querySelector('#post_container').innerHTML = postContainer;
}



//costumslider service page

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active2", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active2";
}