const accesskey = "wUOn4zvQzMmmln3KQlEohITxAhnn3h4810YjWGdblLc";

const formEl = document.querySelector('form');
const inputEl = document.getElementById('search-input');
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputEl.value;  // Corrected to get input value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";  // Clear the previous search results
    }

    // Loop through the results and append images to the search results
    results.forEach((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('search-result');

        const image = document.createElement('img');
        image.src = result.urls.small;  // Corrected to use the small image URL
        image.alt = result.alt_description || 'Image';  // Set the alt text if available

        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description || 'View Image';  // Use alt description for the link text

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);

        searchResults.appendChild(imageWrapper);  // Correctly append imageWrapper to the searchResults
    });

    page++;

    // Only show "Show More" button if there are more pages
    if (data.total_pages > page) {
        showMore.style.display = "block";
    } else {
        showMore.style.display = "none";
    }
}

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener('click', () => {
    searchImages();
});
