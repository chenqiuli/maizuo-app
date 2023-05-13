import React, { useState, useEffect } from 'react';
import './index.css';
import FilmPng from '../../assets/films.png';
import CinemaPng from '../../assets/cinemas.png';
// import ConsultPng from '../../assets/consult.png';
import MinePng from '../../assets/mine.png';
import FilmActivePng from '../../assets/films_active.png';
import CinemaActivePng from '../../assets/cinemas_active.png';
// import ConsultActivePng from '../../assets';
import MineActivePng from '../../assets/mine_active.png';
import { useHistory } from 'react-router-dom';

export default function TabBar(props) {
  // console.log(props, 'props');
  const [tablist] = useState([
    {
      id: 0,
      to: '/films',
      text: '电影',
      asset: FilmPng,
      asset_active: FilmActivePng,
    },
    {
      id: 1,
      to: '/cinemas',
      text: '影院',
      asset: CinemaPng,
      asset_active: CinemaActivePng,
    },
    // {
    //   id: 2,
    //   to: '/consult',
    //   text: '资讯',
    //   asset: ConsultPng,
    // },
    {
      id: 3,
      to: '/mine',
      text: '我的',
      asset: MinePng,
      asset_active: MineActivePng,
    },
  ]);
  const [active, setactive] = useState(0);

  const history = useHistory();

  useEffect(() => {
    const { id } =
      tablist.find((item) => history.location.pathname.includes(item.to)) ?? {};
    setactive(id);
  }, [history, tablist]);

  return (
    <div className="tablist">
      {tablist.map((item, index) => (
        <div
          key={item.id}
          onClick={() => {
            history.push(item.to);
            setactive(index);
          }}
          className={index === active ? 'active' : ''}
        >
          <img
            src={index === active ? item.asset_active : item.asset}
            alt={item.text}
          />
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
}
