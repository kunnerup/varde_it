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
    postContainer += `
      <article onclick="showDetailView(post)">
      <img src="${post.acf.img}" alt="Blog picture">
        <h2>${post.title.rendered}</h2>
        <p>${post.acf.first_part_text}</p>  
      </article>
    `;
  }

  document.querySelector('#post_container').innerHTML = postContainer;
}

//Søg i blogindlæg
function search(value) {
  let searchQuery = value.toLowerCase();
  let filteredPosts = [];
  for (let post of posts) {
    let title = post.title.rendered.toLowerCase();
    if (title.includes(searchQuery)) {
      filteredPosts.push(post);
    }
  }
  console.log(filteredPosts);
  appendPosts(filteredPosts);
}


//Læs hele blogindlægget
function showDetailView(post){
  _selectedPost = posts[post];
  document.querySelector("#detail-view").innerHTML = `
      <h2>${_selectedPost.acf.first_part_text}</h2>

      </article>
  `;
}


// FETCHER DE FORSKELLIGE KATEGORIER FRA BLOGGEN
function getCategories() {
  fetch('http://anderskunnerup.dk/wordpress/wp-json/wp/v2/categories')
    .then(function(response) {
      return response.json();
    })
    .then(function(categories) {
      console.log(categories);
      appendCategories(categories);
    });
}

getCategories();

// Appende genrene til dropdown menuen
function appendCategories(categories) {
  let byCategoryHtml = "";
  for (let category of categories) {
    byCategoryHtml += `
      <option value="${category.id}">${category.name}</option>
    `;
  }

  document.querySelector('#select-category').innerHTML += byCategoryHtml;
}

//Valgte kategori fetcher blogindlæg ind i valgte
function categorySelected(categoryId) {
  console.log(`Category ID: ${categoryId}`);
  if (categoryId) {
    showLoader(true);
    fetch(`http://anderskunnerup.dk/wordpress/wp-json/wp/v2/posts?_embed&categories=${categoryId}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(posts) {
        console.log(posts);
        appendPostsByCategory(posts);
        showLoader(false);
      });
  } else {
    document.querySelector('#post_container').innerHTML = `
      <p>Vælg venligst en kategori.</p>
    `;
  }
}

// append blogindlæg efter kategori
function appendPostsByCategory(postsByCategory) {
  let htmlCategory = "";

  for (let post of postsByCategory) {
    htmlCategory += `
    <article onclick="showDetailView(post)">
    <img src="${post.acf.img}" alt="Blog picture">
      <h2>${post.title.rendered}</h2>
      <p>${post.acf.first_part_text}</p>  
    </article>
    `;
  }

  // UX optimering - hvis ingen posts i valgte kategori, hjælp brugeren til at vælge på ny
  if (postsByCategory.length === 0) {
    htmlCategory = `
      <p>Ingen blogindlæg at vise. Vælg venligst en anden kategori.</p>
    `;
  }

  document.querySelector('#post_container').innerHTML = htmlCategory;
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


// popup

function modalAlarm() {
    let alarms = document.querySelector("#alarmogsikkerhed");
    alarms.style.display = "block";
  }
  function modalEl() {
    let el = document.querySelector("#eloginstallation");
    el.style.display = "block";
  }
  function modalIt() {
    let it = document.querySelector("#ittv");
    it.style.display = "block";
  }
  function modalApple() {
    let apple = document.querySelector("#apple");
    apple.style.display = "block";
  }

  function closeinfo() {
    document.getElementById("ittv").style.display = "none";
    document.getElementById("apple").style.display = "none";
    document.getElementById("eloginstallation").style.display = "none";
    document.getElementById("alarmogsikkerhed").style.display = "none";
  }


  //Mini menu, desktop, ydelser
  let it = document.querySelector(".tvveiw");
  let apple = document.querySelector(".Appleprodukt");
 let alarm = document.querySelector(".Alarm");
  let elek = document.querySelector(".El");
  let build = document.querySelector(".build");

  function closeInformation() {
    it.style.display="none";
    apple.style.display="none";
    alarm.style.display="none";
    elek.style.display="none";
    build.style.display="none";
  }

  function openIt() {
    closeInformation();
it.style.display ="flex";
  }

  function openApple() {
    closeInformation();
    apple.style.display = "flex";
  }

  function openAlarm() {
    closeInformation();
    alarm.style.display ="flex";
  }

  function openEl() {
    closeInformation();
    elek.style.display ="flex";
  }

  function openBuild() {
    closeInformation();
    build.style.display ="flex";
  }