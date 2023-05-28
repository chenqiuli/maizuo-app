import React, { useState, useEffect } from 'react';
import styles from '../css/city.module.css';
import { CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import { connect } from 'react-redux';
import { store } from '../redux/store';
import getCinemaList from '../redux/actionCreators/getCinemaList';
import MyIndexBar from '../components/MyIndexBar/MyIndexBar';

function City(props) {
  const [hotCity, sethotCity] = useState([]);
  const [allCityList, setallCityList] = useState([]);

  const filterCities = (cities) => {
    // 遍历生成26个字母
    const letterArr = [];
    for (let i = 65; i < 91; i++) {
      letterArr.push(String.fromCharCode(i));
    }
    // console.log(letterArr);
    // 根据12个字母筛选出来，遍历为二维数组
    const barList = [];
    for (let i in letterArr) {
      const items = cities.filter(
        (ele) => ele.pinyin.slice(0, 1).toUpperCase() === letterArr[i]
      );
      items.length &&
        barList.push({
          title: letterArr[i],
          items,
        });
    }
    // console.log(barList);
    return barList;
  };

  useEffect(() => {
    axios({
      url: '/api/citys',
    }).then((res) => {
      const {
        status,
        data: { cities },
      } = res ?? {};
      if (status === 200) {
        // 热门城市
        const hotCities = cities.filter((item) => item.isHot === 1);
        sethotCity(hotCities);
        // 城市索引
        setallCityList(filterCities(cities));
      }
    });
  }, []);

  const handleClick = (item) => {
    store.dispatch({
      type: 'change_city',
      payload: {
        cityName: item.name,
        cityId: item.cityId,
      },
    });
    store.dispatch(getCinemaList(store.getState().cityReducer.cityId));
    props.history.goBack();
  };

  const { hideTabbar, showTabbar } = props;
  useEffect(() => {
    // console.log(props);
    hideTabbar();
    return () => {
      showTabbar();
    };
  }, [hideTabbar, showTabbar]);

  return (
    <div className={styles.city}>
      <div className={styles.header}>
        <span
          onClick={() => {
            props.history.goBack();
          }}
        >
          <CloseOutlined />
        </span>
        <span
          style={{
            textAlign: 'center',
            width: '100%',
          }}
        >
          当前城市
        </span>
      </div>
      <div className={styles.contain}>
        <div className={styles.hotCity}>
          <p>热门城市</p>
          <ul>
            {hotCity?.map((item) => (
              <li key={item.cityId} onClick={() => handleClick(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <MyIndexBar cityList={allCityList} />
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

export default connect(null, mapDispatchToProps)(City);
