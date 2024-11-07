const API_KEY = "YOUR API KEY";

const favoritesList = document.getElementById("favorites-list");

// Fetch favorite movies by their IDs
async function fetchFavoriteMovies() {
  const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
  favoritesList.innerHTML = "";

  if (favoriteIds.length === 0) {
    favoritesList.innerHTML = "<p>No favorite movies yet.</p>";
    return;
  }

  for (let id of favoriteIds) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key={API_KEY}`);
    const movie = await response.json();
    /****************** */
        // Skip movies that are undefined or lack a poster image
    if (!movie || !movie.poster_path) {
      // Remove invalid movie ID from favorites
      removeFavorite(id);
      continue;
    }
    /*********** */
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <div class="overlay">
                <h3>${movie.title}</h3>
                <span>${movie.vote_average} ⭐ </span> 
                <button onclick="removeFavorite(${movie.id})">Remove</button>
                <a href="details.html?id=${movie.id}" class="button-details">View Details</a>           
            </div>
        `;
    favoritesList.appendChild(card);
  }
}

// Remove movie from favorites
function removeFavorite(movieId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter(id => id !== movieId);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  fetchFavoriteMovies();
}

// Initialize favorites display
fetchFavoriteMovies();


//*************Scroll to top button*************** */

const scrollToTopButton = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) { 
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
});

scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
