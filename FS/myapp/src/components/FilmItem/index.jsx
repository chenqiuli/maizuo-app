import React, { useState } from 'react';
import styles from './index.module.css';
import { Image, List, ImageViewer } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';

export default function FilmItem(props) {
  const { item } = props;
  const [visible, setVisible] = useState(false);

  const history = useHistory();

  const handleClick = () => {
    // 动态路由
    history.push(`/filmdetail/${item._id}`);
    // query传参
    // history.push({
    //   pathname: '/filmdetail',
    //   query: {
    //     id: item.filmId,
    //   },
    // });
    // state传参
    // history.push({
    //   pathname: '/filmdetail',
    //   state: {
    //     id: item.filmId,
    //   },
    // });
  };

  return (
    <List.Item
      onClick={handleClick}
      prefix={
        <>
          <LazyLoad>
            <Image
              src={item.poster}
              lazy
              width={80}
              height={100}
              onClick={(e) => {
                e.stopPropagation();
                setVisible(true);
              }}
            />
          </LazyLoad>
          <ImageViewer
            image={item.poster}
            visible={visible}
            onClose={() => {
              setVisible(false);
            }}
          />
        </>
      }
      description={
        <>
          {item.grade && (
            <div className={styles.other}>
              观众评分<span className={styles.grade}>{item.grade}</span>
            </div>
          )}
          <div className={`${styles.other} ${styles.actors}`}>
            主演：{item.actors.map((ele) => ele.name).join(' ')}
          </div>
          <div className={styles.other}>
            {item.nation} | {item.runtime}分钟
          </div>
        </>
      }
      arrow={false}
      extra={item.isPresale && <div className={styles.buy}>购票</div>}
    >
      <div className={styles.name}>{item.name}</div>
    </List.Item>
  );
}
