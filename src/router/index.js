import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import manage from '@/components/manage/manage'
import indexManage from '@/components/manage/indexManage/indexManage'
import cinemas from '@/components/manage/cinemas/cinemas'
import moviesAll from '@/components/manage/moviesAll/moviesAll'
import moviesRel from '@/components/manage/moviesRel/moviesRel'
import news from '@/components/manage/news/news'
import onHot from '@/components/manage/onHot/onHot'
import onShow from '@/components/manage/onShow/onShow'
import preShow from '@/components/manage/preShow/preShow'
import users from '@/components/manage/users/users'


Vue.use(Router)

export default new Router({
    mode:"history",
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    }, {
      path: '/manage',
      component: manage,
        children:[
            {
            path:'/',
            component:indexManage,
            },
            {
            path:'/moviesAll',
            component:moviesAll,
            },
            {
            path:'/cinemas',
            component:cinemas,
            },
            {
            path:'/moviesRel',
            component:moviesRel,
            },
            {
            path:'/news',
            component:news,
            },
            {
            path:'/onHot',
            component:onHot,
            },
              {
            path:'/onShow',
            component:onShow,
            },
            {
            path:'/preShow',
            component:preShow,
            },
            {
            path:'/users',
            component:users,
            }
                 ]
    },
  ]
})
