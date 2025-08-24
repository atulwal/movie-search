const apiKey = "9f6e2818"; 
const movieInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
document.querySelector(".search-results").style.display = "none";
async function getMovie(query) {
    const apiUrl = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    const resultsDiv = document.querySelector(".results-flex")
    resultsDiv.innerHTML = "";
    console.log(data);
    document.querySelector(".movie-cards").style.display = "none";
    document.querySelector(".search-results").style.display = "flex";
    if (data.Search) {
        data.Search.forEach(async (movie) => {
            const imdbUrl = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`;
            const imdbResponse = await fetch(imdbUrl);
            const imdb = await imdbResponse.json();
            const movieCard = document.createElement("div");
            movieCard.classList.add("card");
            movieCard.innerHTML = `
            <img src="${movie.Poster != "N/A" ? movie.Poster : "placeholder.jpg"}" alt="${movie.Title}">
            <div class="card-content">
                <h3>${movie.Title}</h3>
                <p class="date">${movie.Year}</p>
                <p class="date">⭐IMDB: ${imdb.imdbRating}</p>
            </div>
        </div>`;
        resultsDiv.appendChild(movieCard);
        });
    } 
    else {
        resultsDiv.innerHTML = `<p>No results found</p>`;
    }
    
}

searchBtn.addEventListener("click", () => {
    const query = movieInput.value.trim();
    if (query) {
        getMovie(query);
    }
});

movieInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const query = movieInput.value.trim();
        if (query) {
            getMovie(query);
        }
    }
});
