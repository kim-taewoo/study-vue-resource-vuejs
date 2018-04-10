import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource'

Vue.use(VueResource);

//$http 는 inside vue instace 일때 쓰는 거고, 여기처럼 global 이면 그냥 http 사용
Vue.http.options.root = 'https://vuejs-vue-resource.firebaseio.com/';
// 이렇게 하면 모든 request 가 이 주소로 들어간다.
//Vue.http.options.headers 헤더르 똑같이 하고 싶다면 이것도 사용 가능

Vue.http.interceptors.push((request,next) => {
  console.log(request);
  if (request.method == 'POST') {
    request.method = 'PUT';
  }
  next(response => {
    response.json = () => {
      return {message: response.body}
    }
  });
});
//interceptors 라는 array 에 새로운 function을 밀어넣는다.
//이 function 이 실행되면서 request 가 멈추면 안되기 때문에, next() 로 계속 진행되게 한다.


new Vue({
  el: '#app',
  render: h => h(App)
})
