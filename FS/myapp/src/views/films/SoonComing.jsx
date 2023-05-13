import React, { useState, /*useEffect,*/ useRef } from 'react';
import fetchFilmList from './fetchFilmList';
import FilmItem from '../../components/FilmItem';
import { List, InfiniteScroll } from 'antd-mobile';
// import axios from 'axios';
import { store } from '../../redux/store';

export default function SoonComing() {
  const [list, setlist] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const num = useRef(0); // 作为pageNum变量保存

  async function loadMore() {
    // console.log('到底了');
    setHasMore(false);
    num.current++;
    fetchFilmList({
      cityId: store.getState().cityReducer.cityId,
      type: 2,
      pageNum: num.current,
    }).then((res) => {
      setlist([...list, ...res]);
      setHasMore(res.length);
    });
  }

  /**
   * 
  // 反向代理，请求猫眼数据，猫眼网站是不给人跨域的
  const [maoyanList, setmaoyanList] = useState([]);

  useEffect(() => {
    axios({
      url:
        '/ajax/comingList?ci=20&limit=10&movieIds=&token=&optimus_uuid=0B1360C06EC711ED9202F7A3C5B5021BF412D2EFD8344980AA9C42B64F7154DA&optimus_risk_level=71&optimus_code=10',
    }).then((res) => {
      // console.log(res.data);
      setmaoyanList(res.data.coming);
    });
  }, []);

  console.log(maoyanList, 'maoyanList');
  */
  return (
    <>
      <List>
        {list.map((item) => (
          <FilmItem key={item.filmId} item={item} />
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </>
  );
}
