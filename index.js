// API: https://api.artic.edu/api/v1/artworks/${id}/search?q=armor&fields=id,title,artist_display,date_display,image_id&limit=12

// Img API: https://www.artic.edu/iiif/2/{identifier}/full/843,/0/default.jpg

async function fetchArmorData(searchTerm) {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&fields=title,artist_display,date_display,image_id`);
    const data = await response.json();
    return data.data; 
}

function displayArmor(data) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; 

    const limitedResults = data.slice(0, 6);

    limitedResults.forEach(armor => {
        const armorContainer = document.createElement('div');
        armorContainer.className = 'armor-container';

        const armorImage = document.createElement('img');
        armorImage.src = `https://www.artic.edu/iiif/2/${armor.image_id}/full/843,/0/default.jpg`;
        armorImage.alt = armor.title || 'Armor Image';
        armorImage.className = 'armor-image';

        const artistName = document.createElement('h3');
        artistName.className = 'artist-name';
        artistName.textContent = armor.artist_display || 'Unknown Artist';

        const dateMade = document.createElement('p');
        dateMade.className = 'date-made';
        dateMade.textContent = armor.date_display || 'Date Unknown';

        armorContainer.appendChild(armorImage);
        armorContainer.appendChild(artistName);
        armorContainer.appendChild(dateMade);

        resultsContainer.appendChild(armorContainer);
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