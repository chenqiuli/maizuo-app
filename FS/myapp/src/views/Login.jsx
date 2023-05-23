import React, { useEffect } from 'react';
import LoginPng from '../assets/login.png';
import { Form, Dialog, Button, Input } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import styles from '../css/login.module.css';
import { connect } from 'react-redux';
import axios from 'axios';

function Login(props) {
  const history = useHistory();
  const [form] = Form.useForm();

  const { hideTabbar, showTabbar } = props;
  useEffect(() => {
    // console.log(props);
    hideTabbar();
    return () => {
      showTabbar();
    };
  }, [hideTabbar, showTabbar]);

  const onSubmit = async () => {
    const values = form.getFieldsValue();
    if (!values?.phone) {
      Dialog.alert({
        content: '请输入手机号',
      });
      return;
    }
    if (!/^1[3456789]\d{9}$/.test(values.phone)) {
      Dialog.alert({
        content: '请输入合法手机号',
      });
      return;
    }
    // 查询是否有该手机号码
    const { data } = await axios({
      url: `/api/users/phone?phone=${values.phone}`,
      method: 'GET',
    });
    if (!data.data) {
      // 新增
      axios({
        url: `/api/users`,
        method: 'POST',
        data: {
          phone: values.phone,
        },
      }).then((res) => {
        const { code } = res.data ?? {};
        if (code === 200) {
          localStorage.setItem('token', values.phone);
          history.push('/mine');
        }
      });
    } else {
      // 数据库已存在该手机号，直接跳转进页面
      localStorage.setItem('token', values.phone);
      history.push('/mine');
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.bg}>
        <img src={LoginPng} alt="login" />
      </div>
      <Form
        form={form}
        initialValues={{}}
        footer={
          <Button block color="default" onClick={onSubmit} size="large">
            登录
          </Button>
        }
        layout="horizontal"
        mode="card"
      >
        <Form.Item
          name="phone"
          label="手机号"
          rules={[{ required: true, message: '手机号不能为空' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="code"
          label="验证码"
          rules={[{ required: true, message: '验证码不能为空' }]}
        >
          <Input placeholder="请输入" />
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

export default connect(null, mapDispatchToProps)(Login);
