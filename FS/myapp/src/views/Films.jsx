import React, { Suspense, useEffect, useState } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import styles from '../css/Films.module.css';
// import NowPlaying from './films/NowPlaying';
// import SoonComing from './films/SoonComing';
import TitleCom from '../components/TitleCom/TitleCom';

// 路由懒加载
const NowPlaying = React.lazy(() => import('./films/NowPlaying'));
const SoonComing = React.lazy(() => import('./films/SoonComing'));

export default function Films(props) {
  const [tabList] = useState(['正在热映', '即将上映']);
  const [active, setactive] = useState(0);

  const [fixed, setfixed] = useState(false);
  const [showTitle, setshowTitle] = useState(false);

  const {
    history,
    location: { pathname },
  } = props;

  useEffect(() => {
    // 输入url，url一变化，active变化
    if (pathname.includes('nowplaying')) {
      setactive(0);
    } else {
      setactive(1);
    }
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop;
      // console.log('scroll', scrollTop);
      if (scrollTop >= 100) {
        setfixed(true);
        setshowTitle(true);
      } else {
        setfixed(false);
        setshowTitle(false);
      }
    });
  }, []);

  console.log(active, 'active');

  return (
    <div className={styles.films}>
      <div className={fixed ? styles.header_fix : ''}>
        {showTitle && <TitleCom text="电影" />}
        <ul className={styles.tabList}>
          {tabList.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setactive(index);
                if (index === 0) {
                  history.push('/films/nowplaying');
                } else {
                  history.push('/films/sooncoming');
                }
              }}
              className={active === index ? styles.active : ''}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <Suspense fallback={<div>loading中</div>}>
        <Switch>
          {/* <Route path="/films/nowplaying" component={NowPlaying} />
          <Route path="/films/sooncoming" component={SoonComing} />
          <Redirect from="/films" to="/films/nowplaying" /> */}
          <Route path="/films/nowplaying" component={NowPlaying} />
          <Route path="/films/sooncoming" component={SoonComing} />
          <Redirect from="/films" to="/films/nowplaying" />
        </Switch>
      </Suspense>

      <div
        style={{
          background: '#ededed',
          width: '100%',
          height: '65px',
        }}
      ></div>
    </div>
  );
}
