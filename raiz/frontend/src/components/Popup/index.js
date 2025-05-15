import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const Popup = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <S.PopupOverlay onClick={onClose}>
      <S.PopupContent onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
        {children}
      </S.PopupContent>
    </S.PopupOverlay>
  );
};

Popup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Popup;