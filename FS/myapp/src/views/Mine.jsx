import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
// import Icon1 from '../assets/icon1.png';
// import Icon2 from '../assets/icon2.png';
// import Icon3 from '../assets/icon3.png';
import Icon4 from '../assets/icon4.png';
import styles from '../css/mine.module.css';
import { RightOutlined } from '@ant-design/icons';
import { PictureOutline } from 'antd-mobile-icons';
import { ImageUploader } from 'antd-mobile';
import axios from 'axios';
import { imgPrefix } from '../const';

function Mine(props) {
  const [list] = useState([
    // {
    //   text: '电影订单',
    //   icon: Icon1,
    //   path: '/filmsorder',
    // },
    // {
    //   text: '组合红包',
    //   icon: Icon2,
    //   path: '/redpacket',
    // },
    // {
    //   text: '帮助与客服',
    //   icon: Icon3,
    //   path: '/help',
    // },
    {
      text: '设置',
      icon: Icon4,
      path: '/setting',
    },
  ]);
  const [fileList, setFileList] = useState([]);
  const [username, setusername] = useState('');

  const getInfo = async () => {
    // 展示个人信息
    const phone = localStorage.getItem('token');
    const { data } = await axios({
      url: `/api/users?phone=${phone}`,
      method: 'GET',
    });
    const info = data?.data[0];
    setusername(info.name ?? info.phone);
    setFileList([{ url: `${imgPrefix}${info.avatar}` }]);
  };

  useEffect(() => {
    getInfo();
  }, []);

  // 自定义上传按钮
  const CustomUploadButton = () => {
    return (
      <ImageUploader
        value={fileList}
        deletable={false}
        preview={true}
        maxCount={1}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: '#f5f5f5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#999999',
          }}
        >
          <PictureOutline style={{ fontSize: 32 }} />
        </div>
      </ImageUploader>
    );
  };

  return (
    <div className={styles.mine}>
      <div className={styles.header}>
        <CustomUploadButton />
        <span
          onClick={() => {
            if (username.length) {
              props.history.push('/user');
            } else {
              props.history.push('/login');
            }
          }}
        >
          {username.length ? username : '立即登录'}
        </span>
      </div>
      <ul>
        {list.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                props.history.push(item.path);
              }}
            >
              <p>
                <span>
                  <img src={item.icon} alt={item.text} />
                </span>
                <span>{item.text}</span>
              </p>
              <p>
                <RightOutlined />
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default withRouter(Mine);
