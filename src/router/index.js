import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Manage from '@/components/manage/Manage'
import IndexManage from '@/components/manage/indexManage/IndexManage'
import Cinemas from '@/components/manage/cinemas/Cinemas'
import MoviesAll from '@/components/manage/moviesAll/MoviesAll'
import MoviesRel from '@/components/manage/moviesRel/MoviesRel'
import News from '@/components/manage/news/News'
import OnHot from '@/components/manage/onHot/OnHot'
import OnShow from '@/components/manage/onShow/OnShow'
import PreShow from '@/components/manage/preShow/PreShow'
import Users from '@/components/manage/users/Users'


Vue.use(Router)

export default new Router({
    mode:"history",
  routes: [
    {
      path: '/',
      component: Login
    }, {
      path: '/manage',
      component: Manage,
        children:[
            {
            path:'/',
            component:IndexManage,
            },
            {
            path:'/movies_all',
            component:MoviesAll,
            },
            {
            path:'/cinemas',
            component:Cinemas,
            },
            {
            path:'/movies_rel',
            component:MoviesRel,
            },
            {
            path:'/news',
            component:News,
            },
            {
            path:'/on_hot',
            component:OnHot,
            },
              {
            path:'/on_show',
            component:OnShow,
            },
            {
            path:'/pre_show',
            component:PreShow,
            },
            {
            path:'/users',
            component:Users,
            }
                 ]
    },
  ]
})
