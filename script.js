const apiKey = "9f6e2818"; 
const movieInput = document.querySelector(".searchbar");
const searchBtn = document.querySelector(".search-btn");

async function getMovie(query) {
    const apiUrl = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log(data); 
    return data;
}

getMovie("Swades");

searchBtn.addEventListener("click", () => {
    const query = movieInput.value.trim();
    if (query) {
        getMovie(query);
    }
});
