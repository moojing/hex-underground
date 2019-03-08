<template>
    <div >
            <div class="score-board">
            <div class="symbol__challenger bg-darkred">
                <div class="cross cross-solid cross-symbol"></div>
            </div>
            
            <div class="score__challenger">{{crossScore}}</div>
            <div class="vs">VS</div>
            <div class="score__enemy">{{circleScore}}</div>
            
        <div class="symbol__enemy bg-black">
            <div class="circle circle-solid circle-symbol"></div>
        </div>
            
        </div>
        <div class="turn-bar" 
            v-if="currentPlayer===0 || currentPlayer===1"
            :style="{'textAlign':currentPlayer=='0'?'right':'left' }"> 
             Your turn!!
        </div>
    </div>
</template>

<script>
import {setStorage,getStorage,removeStorage} from '@/sessionStorage.js'
export default {
    props:{
        currentPlayer:{
            type:Number, 
            default(){
                return -1
            }
        }
    },
    created(){
        if(!getStorage('circle')){
            setStorage('circle',0)
        }         
        if(!getStorage('cross')){
            setStorage('cross',0)
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
}
</script>

<style lang="scss">
@import '../assets/scss/variables';
@import '../assets/scss/App.scss';
.score-board{
    
    display: flex; 
    margin:auto;
    justify-content: center;
    position: relative;
    border-radius: 10px;
    max-width: 40rem;
    background-color: #fff;
    border: 4px solid black;
    .symbol{
        &__challenger,&__enemy{
            flex:1;
            position: relative;
        }
        &__challenger{
             border-radius: 5px 0 0 5px;
        }
        &__emeny{
             border-radius: 0 5px 5px 0;
        }
    }
    .score{
        &__challenger,&__enemy{
            flex:3;
            font-size: 2.5rem;
            align-self: center;
        }
    }
    .vs{
        flex:1;
        display: inline-block; 
        font-size: 1.5rem;
        height: 4.5rem;
        line-height: 4.5rem;
        border-radius:5px 5px 0 0 ;
        background-color: black;
        color:white;
        align-self: center;
        position: absolute; 
        left: 50%; 
        bottom:0px;
        width: 4.5rem;
        transform: translateX(-50%);
    }
 
}
.turn-bar{
    margin-top: 5px;
    text-align: left;
    width: 100%;
    max-width: 40rem;
    display: inline-block;
    color:white;
    font-size: 1.6rem;
    text-transform: uppercase;
}

.circle{
      &.circle-symbol{
        width: 2.5rem ; 
        height: 2.5rem;  
       
        background-color: $white;
            &::before{
                width: 1.8rem; 
                height: 1.8rem;
                background-color: black;
            }  
        }
    &.circle-solid{
        position: absolute;
        top: 50%;
        left: 50%; 
        transform: translate(-50%,-50%);
      
        &.circle-black{
            width: 4.5rem ; 
            height: 4.5rem;  
            background-color: black;
              &::before{
                width: 3.8rem; 
                height: 3.8rem;
                background-color: $color-secondary;
            }  
        } 
    }
}

.cross{
    &.cross-solid{
        position: absolute;
        top: 50%;
        left: 50%; 
        transform: translate(-50%,-50%);
        &::before, &::after {
            height: 0.3rem;
        }
    }

    &.cross-symbol{
        &:before,&:after{
            width: 2rem;
            background-color: white;
        }
    }
}
</style>
