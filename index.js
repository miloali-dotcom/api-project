// API: https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&fields=title,artist_display,date_display,image_id

// Img API: https://www.artic.edu/iiif/2/{identifier}/full/843,/0/default.jpg

async function fetchArmorData(searchTerm) {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&fields=title,artist_display,date_display,image_id`);
    const data = await response.json();
    return data.data; 
}

function displayArmor(data) {
    const resultsContainer = document.getElementById('resultsContainer');

    const limitedResults = data.slice(0, 6);
    
    limitedResults.forEach(armor => {
        const armorContainer = document.getElementClassName('armor-container');

        const armorImage = document.getElementClassName('armor-image');
        armorImage.src = `https://www.artic.edu/iiif/2/${armor.image_id}/full/843,/0/default.jpg`;

        const armorTitle = document.getElementClassName('armor-title');

        const artistName = document.getElementClassName('armor-artist');

        const dateMade = document.getElementClassName('armor-date');
    });
}

document.getElementById('searchButton').addEventListener('click', async () => {
    const searchInput = document.getElementById('searchInput').value;
    const armorData = await fetchArmorData(searchInput);
    displayArmor(armorData);
});

document.getElementById('searchInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('searchButton').click();
    }
});

const headers = {
    'AIC-User-Agent': 'aic-armory (yali@artic.edu)'
};