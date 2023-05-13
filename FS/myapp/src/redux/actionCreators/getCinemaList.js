import axios from "axios";


/**
 * actionCreator内如果是同步返回一个普通js对象，{type:"xx",payload:xx}
 * 如果是异步返回一个函数，需要redux-thunk中间件这个外挂支持：
 * redux-thunk允许Action Creator返回一个thunk函数而不是普通的Action对象。thunk函数有两个参数，dispatch和getState，可以在内部执行异步代码，也可以访问store中的状态
 */
function getCinemaList (cityId) {
  return (dispatch) => {
    axios({
      url: `https://m.maizuo.com/gateway?cityId=${cityId}&ticketFlag=1&k=4558896`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16789325361560653676412929","bc":"110100"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then((res) => {
      // console.log(res.data.data.cinemas);
      dispatch({
        type: "fetch_cinemaList",
        payload: res.data.data.cinemas
      });
    });
  };
}

/**
 * redux-promise中间件风格：
 * Promise三种状态：fulfilled，pending，reject
 * redux-promise允许Action Creator返回一个Promise对象，把Promise的结果作为payload发送给Reducer
 */
/** 
function getCinemaList (cityId) {
  return axios({
    url: `https://m.maizuo.com/gateway?cityId=${cityId}&ticketFlag=1&k=4558896`,
    headers: {
      'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16789325361560653676412929","bc":"110100"}',
      'X-Host': 'mall.film-ticket.cinema.list'
    }
  }).then((res) => {
    // console.log(res.data.data.cinemas);
    return {
      type: "fetch_cinemaList",
      payload: res.data.data.cinemas
    };
  });
}
*/




export default getCinemaList;