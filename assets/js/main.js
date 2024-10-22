const API_KEY = "4038d7dc8938db59fb12025f3ee4e770";
const moviesList = document.getElementById("movies-list");

// Fetch top-rated movies
async function fetchTopRatedMovies() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
  );
  const data = await response.json();
  displayMovies(data.results.slice(0, 12));
}

// Display movies in the UI
function displayMovies(movies) {
  moviesList.innerHTML = "";
  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";
    const isFavorite = isMovieFavorite(movie.id) ? "♥" : "♡";
    
    card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <div class="overlay">
                <h3>${movie.title}</h3>
                <span>${movie.vote_average} ⭐ </span> 
                <span class="fav" data-id="${movie.id}" onclick="toggleFavorite(${movie.id})">${isFavorite}</span>
                <a href="details.html?id=${movie.id}" class="button-details">View Details</a>           
               </div>
        `;
    moviesList.appendChild(card);
  });
}

// Toggle favorite status
function toggleFavorite(movieId) {
  let favorites = getFavorites();
  if (favorites.includes(movieId)) {
    // Remove movie from favorites
    favorites = favorites.filter(id => id !== movieId);
  } else {
    // Add movie to favorites
    favorites.push(movieId);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  // Update UI
  fetchTopRatedMovies();  // Re-fetch or just update the favorite icon
}

// Get favorites from localStorage
function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

// Check if a movie is favorite
function isMovieFavorite(movieId) {
  const favorites = getFavorites();
  return favorites.includes(movieId);
}

// Initialize the app
fetchTopRatedMovies();

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search");

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    window.location.href = `search-results.html?query=${encodeURIComponent(
      query
    )}`;
  }
});
