import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Button } from './styles';

const ImageCropper = ({ imageFile, onCropComplete, onCancel }) => {
  const cropperRef = useRef(null);

  const getCropData = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      const croppedCanvas = cropper.getCroppedCanvas({
        width: 300,
        height: 300,
        minWidth: 200,
        minHeight: 200,
        maxWidth: 800,
        maxHeight: 800,
        fillColor: '#fff',
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
      });

      if (croppedCanvas) {
        onCropComplete(croppedCanvas.toDataURL());
      }
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <Cropper
        ref={cropperRef}
        src={URL.createObjectURL(imageFile)}
        style={{ height: 300, width: '100%' }}
        aspectRatio={1}
        guides={true}
        viewMode={1}
        minCropBoxHeight={100}
        minCropBoxWidth={100}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false}
      />
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '1rem'
      }}>
        <Button 
          type="button" 
          onClick={onCancel}
          style={{ background: '#6c757d' }}
        >
          Cancelar
        </Button>
        <Button 
          type="button" 
          onClick={getCropData}
          style={{ background: '#229a00' }}
        >
          Confirmar
        </Button>
      </div>
    </div>
  );
};

export default ImageCropper;