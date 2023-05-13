import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from '../css/search.module.css';
import React, { useState, useEffect, useMemo } from 'react';
import { CinemaItem } from './Cinemas';
import NoData from '../assets/nodata.png';
import getCinemaList from '../redux/actionCreators/getCinemaList';
import { connect } from 'react-redux';
import { store } from '../redux/store';

function Search(props) {
  const [myValue, setmyValue] = useState('');

  const filterCinemaList = useMemo(
    () =>
      props.cinemaList.filter(
        (item) =>
          item.name.toUpperCase().includes(myValue.toUpperCase()) ||
          item.address.toUpperCase().includes(myValue.toUpperCase())
      ),
    [myValue, props.cinemaList]
  );
  const { cinemaList, cityId, getCinemaList } = props;

  // 让请求在redux中发，保证view层只处理ui层，如果先进的是search页面
  useEffect(() => {
    if (!cinemaList.length) {
      getCinemaList(cityId);
    } else {
      console.log('从 store 缓存中读取 ');
    }
  }, [cinemaList, cityId, getCinemaList]);

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
      <div className={styles.header}>
        <Input
          style={{ width: '85%', marginRight: '5%' }}
          placeholder="输入影院名称"
          prefix={<SearchOutlined />}
          value={myValue}
          onChange={(evt) => setmyValue(evt.target.value)}
        />
        <span
          onClick={() => {
            props.history.push('/cinemas');
          }}
        >
          取消
        </span>
      </div>
      <div className={styles.main}>
        {!myValue.length && (
          <div className={styles.nearArea}>
            <p>离你最近</p>
            <ul>
              {props.cinemaList.slice(0, 5).map((item) => {
                return (
                  <li
                    key={item.cinemaId}
                    onClick={() => {
                      props.history.push(`/cinema/${item.cinemaId}/film`);
                      store.dispatch({
                        type: 'fetch_cinemaDetailInfo',
                        payload: item,
                      });
                    }}
                  >
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {myValue.length > 0 &&
          (filterCinemaList.length > 0 ? (
            filterCinemaList.map((item) => (
              <CinemaItem key={item.cinemaId} {...item} />
            ))
          ) : (
            <div className={styles.nodata}>
              <img src={NoData} alt="nodata" />
              <p>没有找到匹配的影院</p>
              <p>
                提示：仅支持搜索“影院”，建议您检
                <br />
                查输入的影院名称是否有误？
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cinemaList: state.CinemaReducer.cinemaList,
    cityId: state.cityReducer.cityId,
  };
};

const mapDispatchToProps = {
  getCinemaList,
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
