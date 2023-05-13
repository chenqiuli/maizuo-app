import React, { useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import TitleCom from '../components/TitleCom/TitleCom';
import styles from '../css/cinemas.module.css';
import { connect } from 'react-redux';
import useScroll from '../hooks/useScroll';
import { useHistory } from 'react-router-dom';
import getCinemaList from '../redux/actionCreators/getCinemaList';
import { store } from '../redux/store';

export const CinemaItem = (item) => {
  const history = useHistory();
  const price = String(item.lowPrice * 0.01).includes('.')
    ? (item.lowPrice * 0.01).toFixed(1)
    : item.lowPrice * 0.01;
  return (
    <div
      className={styles.cinemaItem}
      onClick={() => {
        history.push(`/cinema/${item.cinemaId}/film`);
        store.dispatch({
          type: 'fetch_cinemaDetailInfo',
          payload: item,
        });
      }}
    >
      <div className={styles.top}>
        <div>{item.name}</div>
        <div>￥{price}起</div>
      </div>
      <div className={styles.bottom}>
        <p>{item.address}</p>
        <p>距离未知</p>
      </div>
    </div>
  );
};

function Cinemas(props) {
  const { isShow } = useScroll();

  const handleSearch = () => {
    props.history.push('/cinemas/search');
  };

  const { cinemaList, cityId, getCinemaList } = props;

  // 让请求在redux中发，保证view层只处理ui层，如果先进的是search页面
  useEffect(() => {
    if (!cinemaList.length) {
      getCinemaList(cityId);
    } else {
      console.log('从 store 缓存中读取');
    }
  }, [cinemaList, cityId, getCinemaList]);

  return (
    <div>
      {/* <p className="qiuli">Cinemas</p> */}
      {isShow && (
        <div className={styles.titleCom}>
          <TitleCom text="影院">
            <div>
              <SearchOutlined
                style={{ fontSize: '18px' }}
                onClick={handleSearch}
              />
            </div>
          </TitleCom>
        </div>
      )}
      <div className={styles.content}>
        {props.cinemaList.map((item) => (
          <CinemaItem key={item.cinemaId} {...item} {...props} />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Cinemas);
