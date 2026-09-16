// API: https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&fields=title,artist_display,date_display,image_id

// Img API: https://www.artic.edu/iiif/2/{identifier}/full/843,/0/default.jpg

async function fetchArmorData(searchTerm) {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&fields=title,artist_display,date_display,image_id`);
    const data = await response.json();
    return data.data; 
}

function displayArmor(data) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';
   
    data.slice(0, 6).forEach(armor => {
      const card = document.createElement('div');
      card.className = 'armor-container';

      const image = document.createElement('img');
      image.className = 'armor-image';
      image.alt = armor.title || 'Armor image';
      if (armor.image_id) {
        image.src = `https://www.artic.edu/iiif/2/${armor.image_id}/full/200,/0/default.jpg`;
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

      const classification = document.createElement('p');
      classification.className = 'classification-titles';
      classification.textContent = armor.classification_titles || 'Off View';

      card.appendChild(title);
      card.appendChild(artist);
      card.appendChild(date);
      resultsContainer.appendChild(card);
    });
}

document.getElementById('searchButton').addEventListener('click', async () => {
    const searchInput = document.getElementById('searchInput').value;
    const armorData = await fetchArmorData(searchInput);
    console.log('api results:', armorData);
    displayArmor(armorData);
    console.log('cards on page:', document.getElementById('resultsContainer').children.length);
});

document.getElementById('searchInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('searchButton').click();
    }
});

document.getElementById('viewFilter')/addEventListener('change', () => {
  const searchTerm = document.getElementById('searchInput').value;

  fetchArmorData(searchTerm).then(data => filterArmor(data));
});

function filterArmor(data) {
  const viewFilter = document.getElementById('viewFilter').value;

  let filteredData;

  if (viewFilter === 'onView') {
    filteredData = data.filter(armor => armor.is_in_gallery, true);
  } else if (viewFilter === 'offView') {
    filteredData = data.filter(armor => armor.is_in_gallery, false);
  } else {
    filteredData = data;
  }

  displayArmor(filteredData);
}

// document.getElementById('armorFilter').addEventListener('change', function() {
//   const selectedArms = this.value;
//   filterArmors(selectedArms);
// });

// async function filterArmors(selectedArms) {
//   const searchTerm = document.getElementById('searchInput').value;

//   const allArmors = await fetchArmorData(searchTerm);

//   let filteredArmors;

//   if (selectedArms) {
//     filteredArmors = allArmors.filter(armor => armor.classification_titles === selectedArms);
//   }
  
//   displayArmor(filteredArmors);
// }

const headers = {
    'AIC-User-Agent': 'aic-armory (yali@artic.edu)'
};