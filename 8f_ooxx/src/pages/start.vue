<template>
    <div class="bg-black bg-start"> 

        <div class="checkerboard"> 
            <div class="section">
                <div class="uppercase text fw700">TIC</div>
            </div>
             <div class="section">
                 <div class="circle circle-solid circle-red"></div>
             </div>
              <div class="section">
                  <div class="cross cross-edge">
                      <div class="edge__outter"></div>
                      <div class="edge__inner"></div>
                  </div>
              </div>
              <div class="section">
                  <div class="cross cross-solid cross-red"></div>
              </div>
              <div class="section">
                  <div class="uppercase text fw700">TAC</div>
              </div>
              <div class="section">
                   <div class="circle circle-edge circle-red"></div>
              </div>

               <div class="section">
                   <div class="circle circle-edge circle-red"></div>
              </div>
              <div class="section">
                  <div class="cross cross-solid cross-red"></div>
              </div>
              <div class="section">
                   <div class="uppercase text fw700">TOC</div>
              </div>
               
            <div class="btn btn-primary" @click="onStartClick" v-if="circleScore!=='0'||crossScore!=='0'"> CONTINUE</div>
            <div class="btn btn-primary" @click="onResetClick"> {{circleScore!=='0'||crossScore!=='0'? 'RESTART':'START'}}</div>
              
        </div>
        
    </div>
</template>

<script>
import {setStorage,getStorage,removeStorage} from '@/sessionStorage.js'
export default {
    data(){
        return{
            
        }
    },
    computed: {
        circleScore(){
            console.log(getStorage('circle'));
            return getStorage('circle')
        },
        crossScore(){
            return getStorage('cross')
        },
    },
    methods:{
        onStartClick(){
            console.log('onGame');

            this.start()
        },
        onResetClick(){
            removeStorage('circle')
            removeStorage('cross')
            this.start()
        },
        start(){
            this.$router.push('game') 
        }
    }
}
</script>

<style lang="scss">
  .bg-start{
    height: 100vh ;
    padding-top: 100px;
  }
</style>
