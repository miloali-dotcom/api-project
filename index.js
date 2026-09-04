// API: https://api.artic.edu/api/v1/artworks/search?q=armor

// Img API: https://www.artic.edu/iiif/2/{identifier}/full/843,/0/default.jpg

const headers = {
  'AIC-User-Agent': 'aic-bash (yali@artic.edu)'
};

const armorListEl = document.querySelector(".armor__list");

async function onSearchChange(event) {
  const id = event.target.value;
  renderArmor(id);
}

async function renderArmor(id) {
  const armor = await fetch(`https://api.artic.edu/api/v1/artworks/${id}/search?q=armor&fields=id,title,artist_display,date_display,image_id&limit=12`);
  const armorData = await armor.json();
  armorListEl.innerHTML = armorData.map(armor => armorHTML(armor)).join('');
}

function armorHTML(armor) {
  return 
    `<div class="armor">
      <div class="armor__card">
        <div class="armor__card--img">
        ${armor.image_id}
        </div>
        <div class="armor__card--details">
          <h2 class="armor__card--title">${armor.title}</h2>
          <p class="armor__card--description">${armor.artist} • ${armor.date}</p>
        </div>
      </div>
    </div>`
}

//EXAMPLE DATA
function getArmor() {
  return [
    {
      id: 106377,
      image_id: "https://www.artic.edu/iiif/2/0cf7f71b-f924-2c8f-c909-708bb2b9f4fc/full/1686,/0/default.jpg",
      title: "Portions of a Field Armor",
      artist_display: "Jacob Halder",
      date_display: "c. 1588",
    }
  ]
}