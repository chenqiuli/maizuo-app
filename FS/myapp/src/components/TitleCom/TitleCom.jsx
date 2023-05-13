import React, { useState } from 'react';
import { store } from '../../redux/store';
import { DownOutlined } from '@ant-design/icons';
import styles from './TitleCom.module.css';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function TitleCom({ text = '', children }) {
  const [cityName] = useState(store.getState().cityReducer.cityName);

  const history = useHistory();

  const handleClick = () => {
    history.push('/city');
  };

  return (
    <div className={styles.header_title}>
      <div className={styles.cityLeft} onClick={handleClick}>
        <span>{cityName}</span>
        <span
          style={{
            marginLeft: 4,
          }}
        >
          <DownOutlined />
        </span>
      </div>
      <div className={styles.cityRight}>{text}</div>
      {children}
    </div>
  );
}

TitleCom.propTypes = {
  text: PropTypes.string,
};

TitleCom.defaultProps = {
  text: '',
};
