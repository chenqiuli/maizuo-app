import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from '../css/setting.module.css';
import { NavBar } from 'antd-mobile';

function Setting(props) {
  const { hideTabbar, showTabbar } = props;
  useEffect(() => {
    // console.log(props);
    hideTabbar();
    return () => {
      showTabbar();
    };
  }, [hideTabbar, showTabbar]);
  return (
    <div className={styles.root}>
      <NavBar
        style={{
          background: '#fff',
        }}
        onBack={(e) => {
          e.preventDefault();
          props.history.goBack();
        }}
      >
        设置
      </NavBar>
      <div
        className={styles.footer}
        onClick={() => {
          localStorage.removeItem('token');
          props.history.push('/login');
        }}
      >
        退出登录
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  hideTabbar() {
    return {
      type: 'tabbar_hide',
    };
  },

  showTabbar() {
    return {
      type: 'tabbar_show',
    };
  },
};

export default connect(null, mapDispatchToProps)(Setting);
