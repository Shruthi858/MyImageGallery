const imageUrls = [
    './ImageGallery/image1.jpg',
    './ImageGallery/image2.jpg',
    './ImageGallery/image3.jpg',
    './ImageGallery/image4.jpg',
    './ImageGallery/image5.jpg',
    './ImageGallery/image6.jpg',
    './ImageGallery/image7.jpg',
    './ImageGallery/image8.jpg',
    './ImageGallery/image9.jpg',
    './ImageGallery/image10.jpg',
    './ImageGallery/image11.jpg',
    './ImageGallery/image12.jpg',
    './ImageGallery/image13.jpg',
    './ImageGallery/image14.jpg',
    './ImageGallery/image15.jpg',
    './ImageGallery/image16.jpg',
    './ImageGallery/image17.jpg',
    './ImageGallery/image18.jpg',
    './ImageGallery/image19.jpg',
    './ImageGallery/image20.jpg',
];

const gallery = document.querySelector('.gallery');
const viewer = document.querySelector('.viewer');
const mainImage = document.getElementById('mainImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const closeBtn = document.getElementById('closeBtn');

let currentIndex = 0;
let rotation = 0;
let zoomLevel = 1;

// Generate image thumbnails
imageUrls.forEach((url, index) => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = `Image ${index + 1}`;
    img.addEventListener('click', () => {
        currentIndex = index;
        showImage();
    });
    gallery.appendChild(img);
});

// Show image in viewer
function showImage() {
    mainImage.src = imageUrls[currentIndex];
    mainImage.style.transform = `rotate(${rotation}deg) scale(${zoomLevel})`;
    viewer.style.display = 'flex';
}

// Close viewer
closeBtn.addEventListener('click', () => {
    viewer.style.display = 'none';
    rotation = 0;
    zoomLevel = 1;
    mainImage.style.transform = `rotate(${rotation}deg) scale(${zoomLevel})`;
});

// Navigate images
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    rotation = 0;
    zoomLevel = 1;
    showImage();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % imageUrls.length;
    rotation = 0;
    zoomLevel = 1;
    showImage();
});

// Rotate image
document.addEventListener('keydown', (e) => {
    if (viewer.style.display === 'flex') {
        if (e.key === 'ArrowRight') {
            rotation += 90;
            mainImage.style.transform = `rotate(${rotation}deg) scale(${zoomLevel})`;
        } else if (e.key === 'ArrowLeft') {
            rotation -= 90;
            mainImage.style.transform = `rotate(${rotation}deg) scale(${zoomLevel})`;
        }
    }
});

// Zoom image
viewer.addEventListener('wheel', (e) => {
    if (viewer.style.display === 'flex') {
        e.preventDefault();
        if (e.deltaY < 0) {
            zoomLevel += 0.1;
        } else {
            zoomLevel -= 0.1;
            zoomLevel = Math.max(zoomLevel, 0.1); // prevent zoomLevel from going below 0.1
        }
        mainImage.style.transform = `rotate(${rotation}deg) scale(${zoomLevel})`;
    }
});
