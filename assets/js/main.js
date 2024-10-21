const API_KEY = '4038d7dc8938db59fb12025f3ee4e770';
const moviesList = document.getElementById('movies-list');

// Fetch top-rated movies
async function fetchTopRatedMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`);
    const data = await response.json();
    console.log(data.results)
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
                <span>${movie.vote_average} ⭐ </span> 
                <button onclick="viewDetails(${movie.id})">Details</button>
            </div>
        `;
        moviesList.appendChild(card);
    });
}


// Initialize the app
fetchTopRatedMovies();