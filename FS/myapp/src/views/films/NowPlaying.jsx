import React, { useState, useRef } from 'react';
import fetchFilmList from './fetchFilmList';
import FilmItem from '../../components/FilmItem';
import { List, InfiniteScroll } from 'antd-mobile';
import { store } from '../../redux/store';

export default function NowPlaying() {
  const [list, setlist] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const num = useRef(0); // 作为pageNum变量保存

  async function loadMore() {
    // console.log('到底了');
    setHasMore(false);
    num.current++;
    fetchFilmList({
      cityId: store.getState().cityReducer.cityId,
      type: 1,
      pageNum: num.current,
    }).then((res) => {
      setlist([...list, ...res]);
      setHasMore(res.length);
    });
  }

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
