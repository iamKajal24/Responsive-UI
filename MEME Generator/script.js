// script.js

const memeButton = document.querySelector('.generator-meme-btn');
const memeTitle = document.querySelector('.meme-title');
const memeImage = document.querySelector('.meme-img');
const memeAuthor = document.querySelector('.meme-author');

memeButton.addEventListener('click', generateMeme);

async function generateMeme() {
    memeTitle.textContent = 'Loading...';
    memeImage.src = ''; // Clear current meme image
    
    try {
        const response = await fetch('https://api.imgflip.com/get_memes');
        const data = await response.json();
        const meme = data.data.memes[Math.floor(Math.random() * data.data.memes.length)];

        memeTitle.textContent = meme.name;
        memeImage.src = meme.url;
        memeImage.alt = meme.name;

        // Use a fallback for author if not provided
        memeAuthor.textContent = "Meme Author: " + (meme.author || "Unknown");
    } catch (error) {
        memeTitle.textContent = 'Failed to load meme';
        console.error('Error fetching meme:', error);
    }
}
