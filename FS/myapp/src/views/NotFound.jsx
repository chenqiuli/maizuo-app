import React from 'react';
import { Button, Result } from 'antd';

function NotFound(props) {
  // console.log(props, 'props');

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary">Back Home</Button>}
    />
  );
}

/**
 *
 * 实现connect HOC源码
 * HOC：接收一个低级组件，返回一个具有某种功能的高级组件
 * HOC能做到：
 * 1.劫持渲染：比如让低级组件整个组件的字体变成红色等...
 * 2.代码复用
 * 3.增删改props
 */
const qiuConnect = (cb, obj) => {
  const state = cb();
  return (MyComponent) => {
    return (props) => {
      return (
        <div style={{ color: 'red' }}>
          <MyComponent {...state} {...props} {...obj} />
        </div>
      );
    };
  };
};

export default qiuConnect(
  () => {
    return {
      a: 1,
      b: 2,
    };
  },
  {
    aa() {
      return 'aa';
    },
    bb() {
      return 'bb';
    },
  }
)(NotFound);
