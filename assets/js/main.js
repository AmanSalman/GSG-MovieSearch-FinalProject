const API_KEY = "4038d7dc8938db59fb12025f3ee4e770";
const moviesList = document.getElementById("movies-list");
const messageDiv = document.getElementById("message");

async function fetchTopRatedMovies() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
  );
  const data = await response.json();
  console.log(data.results)
  localStorage.setItem('TopRated', JSON.stringify(data.results.slice(0, 12)));
  displayMovies(data.results.slice(0, 12), true);
}

function displayMovies(movies, append = false) {
  if (!append) moviesList.innerHTML = "";

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <div class="overlay">
        <h3>${movie.title}</h3>
        <span>${movie.vote_average} ⭐</span> 
        <span class="fav">♡</span>
        <a href="details.html?id=${movie.id}" class="button-details">View Details</a>
      </div>
    `;
    moviesList.appendChild(card);
  });
}


fetchTopRatedMovies() 


function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

async function fetchMovies(query) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.results.length > 0 ? data.results : [];
}

async function displaySearchResults() {
  const query = getQueryParam("query");
  messageDiv.innerHTML = "";

  if (query) {
    const movies = await fetchMovies(query);
    moviesList.innerHTML = "";

    if (movies.length > 0) {
      displayMovies(movies);
    } else {
      messageDiv.innerHTML = `
        <div class="no-results">
          <p>No movies found for this search. Here are some top-rated movies instead:</p>
        </div>
      `;
      fetchTopRatedMovies();
    }
  }
}

if (window.location.pathname.includes("search-results.html")) {
  displaySearchResults();
}

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search");

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    window.location.href = `search-results.html?query=${encodeURIComponent(query)}`;
  }
});
