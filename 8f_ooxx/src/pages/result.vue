<template>
    <div class="bg-red bg-game" style="padding: 30px;">
           <ScoreBar/>
           <div class="result-wrapper">

               <div class="winner" v-if="winner!=='-1'"> 
                   <div :class="winner==='0'?'circle':'cross'"> 
                       
                   </div>
                   <div class="text-result"> WINNER!</div>
               </div>
               <div class="draw" v-else>
                   <div class="text-result"> DRAW!</div>
                   <div class="text-result"> DRAW!</div>
                   <div class="text-result"> DRAW!</div>
                    <div class="circle"></div>
                   <div class="cross"></div>
               </div>
           </div>
           <router-link to="/start" class="btn btn-red"> RESTART</router-link>
    </div>
</template>

<script>
import ScoreBar from '@/components/ScoreBar'
export default {
    props:{
        winner:{
            type:String,
            default(){
                return 0
            }
        }
    },
    components:{ 
        ScoreBar
    },
    methods:{
        
    }

}
</script>

<style lang="scss">
@import '../assets/scss/variables';

.result-wrapper{
    padding: 0 2rem;
    .winner{
        margin: 12rem 0  ;
        width: 100%; 
        position: relative;
    }    
        .text-result{
                position: absolute;
                 top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                text-transform:  uppercase ;
                font-size: 8rem;
                font-weight: 700;
                font-style: oblique; 
                -webkit-text-stroke: 0.3rem white;
                color:$color-primary
        }
        .circle{
           &:before{
            content:"";
            position: absolute; 
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%) ;
            width: 16rem; 
            height: 16rem; 
            border-radius:50%; 
            border: solid $color-primary 2rem;
           }
        }
        $cross-solid-border: 2.5rem;
        $cross-solid-length:20rem;
        .cross{
            position: relative; 
            
            &::before,&::after{
                content:"";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%) rotate(45deg);
                background-color: $color-primary;
                display: inline-block; 
                height: $cross-solid-border;     
                width:$cross-solid-length;   
            }
            &:after{
                transform: translate(-50%,-50%) rotate(135deg)
            }
        }
    
    .draw{
        max-width: 40rem;
        width:100%;
        margin:12rem auto;
        position: relative;
        display: flex; 
        .circle{
            flex:1;
        }
        .cross{
            flex:1;
        }
        .text-result{
            z-index: 100;
            position: absolute;
            display: block;
            &:nth-child(1){
                top:-5rem;
            }
            &:nth-child(2){
                top:3rem;
            }
            &:nth-child(3){
                top:11rem;
            }
        }
    }
}

@media (max-width:576px) {
       $cross-solid-border: 2rem;
        $cross-solid-length:17rem;
    .draw .cross{
            position: relative; 
            
            &::before,&::after{
                height: $cross-solid-border;     
                width:$cross-solid-length;   
            }
            &:after{
                transform: translate(-50%,-50%) rotate(135deg)
            }
             
        }

        .draw .circle{
           &:before{
            content:"";
            width: 11rem; 
            height: 11rem; 

           }
        }
}
</style>
