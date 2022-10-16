const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photoArray = [];

// Unsplash API
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const showLoader = () => {
  loader.hidden = false;
};

const hideLoader = () => {
  loader.hidden = true;
};

// Helper function to Set Attributes on DOM Elements
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Create Elements For Links & Photos, Add to DOM
const displayPhotos = () => {
  photoArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, { href: photo.links.html, target: "_blank" });
    // Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Put <img> inside <a>, then put it inside container element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// Get photos from Unsplash API
const getPhotos = async () => {
  showLoader();
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayPhotos();
    hideLoader();
  } catch (err) {
    // Catch Error Here
  }
};

// On Load
getPhotos();
