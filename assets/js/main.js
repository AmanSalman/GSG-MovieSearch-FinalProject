const API_KEY = '4038d7dc8938db59fb12025f3ee4e770';
const moviesList = document.getElementById('movies-list');

// Fetch top-rated movies
async function fetchTopRatedMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`);
    const data = await response.json();
    displayMovies(data.results);
}

// Display movies in the UI
function displayMovies(movies) {
    moviesList.innerHTML = '';
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <div class="overlay">
                <h3>${movie.title}</h3>
                <button onclick="viewDetails(${movie.id})">Details</button>
            </div>
        `;
        moviesList.appendChild(card);
    });
}

// Navigate to movie details
function viewDetails(movieId) {
    window.location.href = `movie-details.html?id=${movieId}`;
}

// Initialize the app
fetchTopRatedMovies();


// Save favorite movie
function saveFavorite(movie) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.push(movie);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Fetch favorites
function fetchFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favoritesList = document.getElementById('favorites-list');
  favorites.forEach(movie => {
      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          <h3>${movie.title}</h3>
          <button onclick="removeFavorite(${movie.id})">Remove</button>
      `;
      favoritesList.appendChild(card);
  });
}

// Call fetchFavorites() on favorites.html
