import React from 'react';
import {
  // HashRouter,
  Route,
  Redirect,
  Switch,
  BrowserRouter,
} from 'react-router-dom';
import Films from '../views/Films';
import Cinemas from '../views/Cinemas';
import Mine from '../views/Mine';
import NotFound from '../views/NotFound';
import FilmDetail from '../views/FilmDetail';
import Login from '../views/Login';
import Consult from '../views/Consult';
// import FilmsOrder from '../views/FilmsOrder';
import City from '../views/City';
import Search from '../views/Search';
import User from '../views/User';
import Setting from '../views/Setting';
import CinemaDetail from '../views/CinemaDetail';

/**
 *
 * HashRouter：会在浏览器带#号，利用location.hash可以拿到哈希值
 * HashRouter留了插槽，只有当前的哈希值跟path路径匹配到了，组件才会渲染展示
 *
 * 路由重定向："/" 自动跳转到 "/films"，exact参数表示是否精确匹配的意思，如果不精确匹配，所有的path路径都符合"/"开头，那么走到这里后面的代码就不走了
 *
 * Switch组件：理解成js的switch分支，匹配到某一个Route就break跳出了Switch分支
 * 为何要使用Switch组件：使用了Redirect组件后，写在前面的Route组件的path路径都是匹配"/"开头的，刷新之后还是会走到重定向
 *
 */

const isAuth = () => localStorage.getItem('token');

// console.log(isAuth(), 'isAuth');

export default function IndexRouter(props) {
  return (
    <BrowserRouter>
      {/* 匹配一级路由，若是嵌套路由，需写在组件内部 */}
      <Switch>
        {/* Route的component属性使用的组件是把组件当成Route的孩子，组件内部会有history属性 */}
        <Route path="/films" component={Films}></Route>
        <Route path="/cinemas" component={Cinemas} exact></Route>
        <Route path="/cinemas/search" component={Search} />
        <Route path="/cinema/:id/film" component={CinemaDetail} />
        <Route path="/consult" component={Consult} />

        {/* 路由守卫 */}
        {/* <Route path="/mine" component={Mine}></Route> */}
        <Route
          path="/mine"
          render={(props) => {
            // 把组件<Login/>实例化使用，相当于new，组件内部是没有props对象的，在回调参数内把props手动传递下去，组件才会含有history属性
            // 如果不在回调参数内把props手动传递下去，React提供了一个高阶组件给任何组件使用，withRouter让被包裹的组件含有history属性
            return isAuth() ? <Mine /> : <Redirect to="/login" {...props} />;
          }}
        />

        <Route path="/login" component={Login} />
        <Route path="/user" component={User} />
        <Route path="/setting" component={Setting} />
        {/* <Route path="/filmsorder" component={FilmsOrder} /> */}
        <Route path="/city" component={City} />

        {/* 动态路由 */}
        <Route path="/filmdetail/:id" component={FilmDetail} />
        {/* query传参/state传参 */}
        {/* <Route path="/filmdetail" component={FilmDetail} /> */}

        {/* 精准匹配以/开头 */}
        <Redirect from="/" to="/films" exact />
        <Route component={NotFound} />
      </Switch>

      {/* 留好插槽给TabBar组件 */}
      {props.children}
    </BrowserRouter>
  );
}
