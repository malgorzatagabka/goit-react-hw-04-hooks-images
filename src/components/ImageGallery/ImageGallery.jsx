import PropTypes from 'prop-types';
//import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";

import style from './ImageGallery.module.css';



//dlaczego poniższy zakomentowany zapis nie działa?:(

// const ImageGallery = ({images,imageOnClick}) => {
//     return (
//         <ul className={style.ImageGallery}>
//             {images.map(image => {
//                 return <ImageGalleryItem key={image.id} image={image}/>})}
//         </ul>
//     )
// };


const ImageGallery = ({ images, imageOnClick}) => {
  return (
    <ul className={style.ImageGallery}>
      {images.map(image => (
        <li className={style.ImageGalleryItem} key={image.id}>
          <img
            className={style.image}
            src={image.webformatURL}
            alt={image.tags} 
            onClick={() => imageOnClick(image.id)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
    
};