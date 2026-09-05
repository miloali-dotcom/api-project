// API: https://api.artic.edu/api/v1/artworks/${id}/search?q=armor&fields=id,title,artist_display,date_display,image_id&limit=12

// Img API: https://www.artic.edu/iiif/2/{identifier}/full/843,/0/default.jpg

const apiUrl = 'https://api.artic.edu/api/v1/artworks/${id}/search?q=armor&fields=id,title,artist_display,date_display,image_id&limit=6';

async function renderArmor(filter) {
  const armorContainer = document.getElementById('armor__loading');
  armorContainer.classList += ' armor__loading';
  if (!armor) {
    armor = await getArmor();
  }
  armorContainer.classList.remove('armor__loading');
}

async function getArmor(id) {
  try {
    const response = await fetch(`apiUrl`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return displayArmor(data.data);
  }
  catch (error) {
    console.error('Error fetching armor data:', error);
    document.getElementById('armor__list').innerHTML = '<p>Sorry, there was an error loading the armor data. Please try again later.</p>';
  }
}

function displayArmor(armorList) {
  const armorContainer = document.getElementById('armor__list');
  armorContainer.innerHTML = 
  `<div class="armor">
        <div class="armor__card">
          <img class="armor__card--img" src="https://www.artic.edu/iiif/2/${armor.image_id}/full/843,/0/default.jpg" alt="${armor.title}">
          <div class="armor__card--details">
            <h2 class="armor__card--title">${armor.title}</h2>
            <p class="armor__card--description">${armor.artist_display} • ${armor.date_display}</p>
          </div>
        </div>
      </div>`;

  if (!armorList || armorList.length === 0) {
    armorContainer.innerHTML = '<p>No armor found.</p>';
    return;
  }
}

setTimeout(() => {
  renderArmor();
}, 1000);