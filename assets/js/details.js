const API_KEY = 'YOUR API KEY';
const movieheader = document.querySelector('.movie-header');
const story = document.querySelector('.story');
const imagegallery = document.querySelector('.image-gallery');

function getMovieIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function fetchMovieDetails() {
    const movieId = getMovieIdFromUrl(); 
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const imges = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${API_KEY}`);
        const data = await response.json();
        const imgData = await imges.json();

        displayMovie(data, imgData.backdrops);
    } catch (error) {
        displayNotFoundMessage();
    }
}

function displayMovie(movie, images) {
    movieheader.innerHTML = `
        <div class="movie-poster">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.original_title}">
        </div>
        <div class="movie-info">
            <h1>${movie.original_title}</h1>
            <p class="tagline">${movie.tagline}</p>
            <div class="details">
                <span class="duration">${movie.runtime} Min.</span>
                ${movie.production_countries.map(m => `<span class="country">${m.name}</span>`).join('')}
                <span class="release-date">${movie.release_date}</span>
            </div>
            <div class="rating-info">
                <span class="rating-score">${movie.vote_average}</span>
                <div class="stars">
                    <span>★★★★★★★★★★</span>
                    <span class="votes">${movie.vote_count} votes</span>
                </div>
            </div>
            <div class="categories">
                ${movie.genres.map(g => `<span>${g.name}</span>`).join('')}
            </div>
        </div>
    `;

    story.innerHTML = `${movie.overview}`;
    imagegallery.innerHTML = images.map((img, index) => {
        return `<img src="https://image.tmdb.org/t/p/w500${img.file_path}" alt="Scene ${index}">`;
    }).join('');
}

function displayNotFoundMessage() {
    const storysection = document.querySelector('.story-section');
    movieheader.innerHTML = `<h1>Movie Not Found</h1>`;
    storysection.innerHTML = ``;
}

// Initialize the app
fetchMovieDetails();
