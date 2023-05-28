import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../css/filmdetail.module.css';
import TitleBar from '../components/TitleBar';
import MBetterScroll from '../components/MBetterScroll';
import { LeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import useScroll from '../hooks/useScroll';
import { imgPrefix } from '../const';

function FilmDetail(props) {
  const [info, setinfo] = useState({});
  const { isShow: show } = useScroll(60);

  // 动态路由，id会带在url上，刷新页面不会报错
  const id = props.match.params.id;
  // console.log(id);

  useEffect(() => {
    axios({
      url: `/api/films/detail?id=${id}`,
    }).then((res) => {
      // console.log(res);
      const {
        data: { films, code },
      } = res ?? {};
      if (code === 200) {
        setinfo(films[0]);
      }
    });
  }, [id]);

  const { hideTabbar, showTabbar } = props;
  useEffect(() => {
    // console.log(props);
    hideTabbar();
    return () => {
      showTabbar();
    };
  }, [hideTabbar, showTabbar]);

  const history = useHistory();

  return (
    <div className={styles.filmdetail}>
      {show && (
        <div className={styles.titCom}>
          <div style={{ float: 'left' }}>
            <LeftOutlined
              onClick={() => {
                history.goBack();
              }}
            />
          </div>
          <div style={{ textAlign: 'center' }}> {info.name}</div>
        </div>
      )}
      <div>
        <img src={info.poster} alt={info.name} />
        <div className={styles.info}>
          <div>
            <span>{info.name}</span>
            <span className={styles.filmType}>{info.filmType?.name}</span>
            {info.grade && <span className={styles.grade}>{info.grade}分</span>}
          </div>
          <div>{info.category}</div>
          <div>
            {info.nation} | {info.runtime}分钟
          </div>
          <div>{info.synopsis}</div>
        </div>
      </div>
      <div className={styles.actors_detail}>
        <TitleBar text="演职人员" />
        <MBetterScroll dep={info}>
          {info.actors?.map((item, index) => {
            return (
              <li key={index}>
                <img src={item.avatarAddress} alt={item.name} />
                <p style={{ color: '#191a1b' }}>{item.name}</p>
                <p style={{ color: '#797d82' }}>{item.role}</p>
              </li>
            );
          })}
        </MBetterScroll>
      </div>
      <div className={styles.actors_detail2}>
        <TitleBar text="剧照">
          <div
            style={{
              color: '#797d82',
              fontSize: 12,
            }}
          >
            全部({info.photos?.length})
          </div>
        </TitleBar>
        <MBetterScroll dep={info}>
          {info.photos?.map((item, index) => {
            return (
              <li key={index}>
                <img
                  src={`${imgPrefix}${item}`}
                  alt={index}
                  style={{
                    width: 150,
                    height: 90,
                    marginRight: 10,
                  }}
                />
              </li>
            );
          })}
        </MBetterScroll>
      </div>
      <div className={styles.footerBtn}>选座购票</div>
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

export default connect(null, mapDispatchToProps)(FilmDetail);
