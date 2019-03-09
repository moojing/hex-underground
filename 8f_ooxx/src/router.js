import VueRouter from 'vue-router'
import Start from '@/pages/start' 
import Game from '@/pages/game' 
import Result from '@/pages/result' 

const router = new VueRouter({
    routes: [
        { path: '/', component: Start },
        { path: '/game', component: Game },
        { path: '/result/:winner', 
          props:true,
          component: Result }
    ]
  })

  export default router