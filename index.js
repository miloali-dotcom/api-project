// API: https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&fields=title,artist_display,date_display,image_id

// Img API: https://www.artic.edu/iiif/2/{identifier}/full/843,/0/default.jpg

async function fetchArmorData(searchTerm) {
    let response = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&fields=title,artist_display,date_display,image_id,is_in_gallery`);
    const data = await response.json();
    return data.data; 
}

function displayArmor(data) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';
    //const limitedResults = data.slice(0, 6);
    data.slice(0, 6).forEach(armor => {
      const card = document.createElement('div');
      card.className = 'armor-container';

      const image = document.createElement('img');
      image.className = 'armor-image';
      image.alt = armor.title || 'Armor image';
      if (armor.image_id) {
        image.src = `https://www.artic.edu/iiif/2/{identifier}/full/200,/0/default.jpg`;
        card.appendChild(image);
      }
      const title = document.createElement('h3');
      title.className = 'armor-title';
      title.textContent = armor.title || 'Untitled';

      const artist = document.createElement('h4');
      artist.className = 'artist-name';
      artist.textContent = armor.artist_display || 'Artist unknown';

      const date = document.createElement('p');
      date.className = 'date-made';
      date.textContent = armor.date_display || 'Date unknown';

      card.appendChild(title);
      card.appendChild(artist);
      card.appendChild(date);
      resultsContainer.appendChild(card);
    
    //limitedResults.forEach(armor => {
        // const armorContainer = document.getElementClassName('armor-container');

        // const armorImage = document.getElementClassName('armor-image');
        // armorImage.src = `https://www.artic.edu/iiif/2/${armor.image_id}/full/843,/0/default.jpg`;

        // const armorTitle = document.getElementClassName('armor-title');

        // const artistName = document.getElementClassName('armor-artist');

        // const dateMade = document.getElementClassName('armor-date');
    });
}

document.getElementById('searchButton').addEventListener('click', async () => {
    const searchInput = document.getElementById('searchInput').value;
    const armorData = await fetchArmorData(searchInput);
    console.log('api results:', armorData);
    displayArmor(armorData);
    console.log('cards on page:', document.getElementById('resultsContainer').children.length)
});

document.getElementById('searchInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('searchButton').click();
    }
});

function filterGalleryWorks(data, showInGallery) {
  return data.filter(armor => armor.is_in_gallery === showInGallery);
}

document.getElementById('filterButton').addEventListener('click', async() => {
  const searchTerm = document.getElementById('searchInput').value;
  
  const allArmorData = await fetchArmorData(searchTerm);

  const showInGallery = document.getElementById('galleryCheckbox').checked;

  const filteredArmor = filterGalleryWorks(allArmorData, showInGallery);

  displayArmor(filteredArmor);
});

const headers = {
    'AIC-User-Agent': 'aic-armory (yali@artic.edu)'
};