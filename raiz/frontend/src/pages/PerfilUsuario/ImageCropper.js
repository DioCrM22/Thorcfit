import React, { useState, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { AZUL } from './styles';

const ImageCropper = ({ imageFile, onCropComplete, onCancel, aspect = 1 }) => {
    const [crop, setCrop] = useState();
    const [imageSrc, setImageSrc] = useState(null);
    const imgRef = useRef(null);
  
    useEffect(() => {
      if (imageFile) {
        const imageUrl = URL.createObjectURL(imageFile);
        setImageSrc(imageUrl);
        
        return () => {
          URL.revokeObjectURL(imageUrl);
        };
      }
    }, [imageFile]);

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
    }
  };

  const handleCropComplete = (crop) => {
    if (imgRef.current && crop.width && crop.height) {
      const croppedImage = getCroppedImg(imgRef.current, crop);
      onCropComplete(croppedImage);
    }
  };

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return canvas.toDataURL('image/jpeg');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {!imageSrc ? (
        <div>
          <label style={{
            display: 'inline-block',
            padding: '10px 15px',
            background: AZUL,
            color: 'white',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '1rem'
          }}>
            Selecionar Imagem
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              style={{ display: 'none' }}
            />
          </label>
        </div>
      ) : (
        <>
          <ReactCrop
            crop={crop}
            onChange={c => setCrop(c)}
            onComplete={handleCropComplete}
            aspect={aspect}
            circularCrop
          >
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Imagem para recortar"
              style={{ maxWidth: '100%', maxHeight: '60vh' }}
            />
          </ReactCrop>
          
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => {
                setImageSrc(null);
                onCancel();
              }}
              style={{
                padding: '8px 16px',
                background: '#ff6b6b',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCropper;