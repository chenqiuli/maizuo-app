import React, { useEffect } from 'react';
import IndexRouter from './router/IndexRouter';
import TabBar from './components/TabBar';
import './css/myapp.css';
import './css/common.css';
// 全局引入antd样式
import 'antd/dist/reset.css';
import { connect } from 'react-redux';
import './utils/request';

function MyApp(props) {
  useEffect(() => {
    // console.log(props);
  }, []);

  return (
    <div className="myapp">
      <IndexRouter>
        {/* 插槽的写法 */}
        {props.show && <TabBar />}
      </IndexRouter>
    </div>
  );
}

/**
 * connect是高阶组件，HOC。
 * connect第一个参数是函数，传递属性。第二个参数是对象，回调方法。
 * connect可以让低级组件不需要再去订阅、取消订阅、手动获取store的值，可以定制化属性映射到低级组件的props上，
 *
 */

const mapStateToProps = (state) => {
  // console.log(state, 'reducer的state');
  return {
    a: 1,
    b: 2,
    show: state.tabbarReducer.show,
  };
};

export default connect(mapStateToProps)(MyApp);
