import React, { useEffect, useState } from 'react';
import { PictureOutline } from 'antd-mobile-icons';
import {
  Form,
  Input,
  Dialog,
  Radio,
  DatePicker,
  ImageUploader,
  NavBar,
  Button,
  Space,
} from 'antd-mobile';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import axios from 'axios';
import { imgPrefix } from '../const';

function User(props) {
  const [fileList, setFileList] = useState([]);
  const [infos, setinfos] = useState({}); // 接口返回的数据用于回显
  const [form] = Form.useForm();
  const [imageUrl, setimageUrl] = useState(''); // 头像的接口入参

  const { hideTabbar, showTabbar } = props;
  useEffect(() => {
    // console.log(props);
    hideTabbar();
    return () => {
      showTabbar();
    };
  }, [hideTabbar, showTabbar]);

  const right = (
    <div
      style={{
        fontSize: 16,
        color: '#797d82',
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'fixed',
        right: 10,
        top: 4,
      }}
    >
      <Space style={{ '--gap': '16px' }}>
        <Button type="submit">保存</Button>
      </Space>
    </div>
  );

  const onFinish = (values) => {
    // console.log(values);
    // 上传文件，弄成form-data格式
    let forms = new FormData();
    // 上传单个
    forms.append('avatar', imageUrl);
    forms.append('name', values.name);
    forms.append('gender', values.gender);
    forms.append('birth', values.birth);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios.put(`/api/users/${infos._id}`, forms, config).then((res) => {
      if (res.data.code === 200) {
        Dialog.alert({
          content: '修改信息成功',
        });
      }
    });
  };

  // 自定义上传按钮
  const CustomUploadButton = () => {
    const handleUpload = (file) => {
      setimageUrl(file);
      return {
        url: URL.createObjectURL(file),
      };
    };

    return (
      <ImageUploader
        value={fileList}
        onDelete={(item) => {
          console.log(item);
          // 因为这里只有一张图片
          setFileList([]);
        }}
        preview={false}
        onChange={(item) => {
          setFileList(item);
        }}
        maxCount={1}
        upload={(file) => handleUpload(file)}
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

  const getInfo = async () => {
    // 展示个人信息
    const phone = localStorage.getItem('token');
    const { data } = await axios({
      url: `/api/users?phone=${phone}`,
      method: 'GET',
    });
    const info = data?.data[0];
    setinfos(info);
    form.setFieldsValue({
      name: info.name,
      gender: info.gender,
      birth: new Date(info.birth),
    });
    setFileList([{ url: `${imgPrefix}${info.avatar}` }]);
  };

  useEffect(() => {
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <NavBar
        onBack={(e) => {
          e.preventDefault();
          props.history.goBack();
        }}
      >
        我的资料
      </NavBar>
      <Form form={form} onFinish={onFinish} footer={right} layout="horizontal">
        <Form.Item name="avatar" label="头像">
          <CustomUploadButton />
        </Form.Item>
        <Form.Item name="name" label="昵称">
          <Input
            onChange={(value) => {
              // console.log(value);
            }}
          />
        </Form.Item>
        <Form.Item name="gender" label="性别">
          <Radio.Group defaultValue="default">
            <Space>
              <Radio value={1}>男</Radio>
              <Radio value={0}>女</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="birth"
          label="生日"
          trigger="onConfirm"
          onClick={(e, datePickerRef) => {
            datePickerRef.current?.open();
          }}
        >
          <DatePicker>
            {(value) => {
              // console.log(value);
              return value ? dayjs(value).format('YYYY-MM-DD') : '请选择日期';
            }}
          </DatePicker>
        </Form.Item>
      </Form>
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

export default connect(null, mapDispatchToProps)(User);
