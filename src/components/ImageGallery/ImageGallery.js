import ImageGalleryItem from "./components/ImageGalleryItem";

function ImageGallery(gallery) {
  return (
    <ul class="gallery">
      {gallery.map((item) => (
        <ImageGalleryItem />
      ))}
    </ul>
  );
}

export default ImageGallery;
