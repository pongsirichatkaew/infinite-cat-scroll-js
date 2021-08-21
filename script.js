const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArrays = [];
let initialLoad = true;
// Unsplash API
let count = 5;
const query = 'cat';
const apiKey = 'YARgDeD4budZyiujlrb_0C9ji7_WW8N4u_pyJGYQuxY';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&query=${query}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    initialLoad = false;
  }
}

// Helper function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
  try {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  } catch (error) {
    console.log('error', error);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photoArrays.length;
  console.log('totalImages', totalImages);
  // Run function for each object in photoArray
  photoArrays.forEach((photo) => {
    //   Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photoArrays = await response.json();
    displayPhotos();
    // console.log(photoArrays);
  } catch (error) {
    // Catch Error Here
  }
}

// Check to see if scrolling near bottom of page, Load more Photoes
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// For production
window.console.log = () => {};
// On Load
getPhotos();
