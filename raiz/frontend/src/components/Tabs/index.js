import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const Tabs = ({ tabs, active, onChange }) => {
  return (
    <S.Container>
      {tabs.map(tab => (
        <S.TabButton
          key={tab}
          active={tab === active}
          onClick={() => onChange(tab)}
          aria-selected={tab === active}
        >
          {tab}
        </S.TabButton>
      ))}
    </S.Container>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  active: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Tabs;