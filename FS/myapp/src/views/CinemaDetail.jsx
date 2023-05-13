import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/**
 * 以此页面来实战redux持久化
 * 列表页进入详情页：在列表页存储参数在redux，进入详情页展示，页面一刷新redux的数据丢失，因为redux缓存的数据是在内存中
 * 对该页面数据使用redux-persist，刷新后页面数据还存在
 */

function CinemaDetail(props) {
  // console.log(props);
  const { info } = props;

  const { hideTabbar, showTabbar } = props;
  useEffect(() => {
    // console.log(props);
    hideTabbar();
    return () => {
      showTabbar();
    };
  }, [hideTabbar, showTabbar]);

  return <div>{info.name}</div>;
}

const mapStateToProps = (state) => {
  return {
    info: state.CinemaReducer.cinemaDetail,
  };
};
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

export default connect(mapStateToProps, mapDispatchToProps)(CinemaDetail);
