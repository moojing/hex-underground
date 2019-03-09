<template>
    <div class="bg-red bg-game" style="height: 100vh; padding: 30px;">
        <ScoreBar
            :currentPlayer="currentPlayer"/>

        <div class="wrapper"> 
            <div class="checkerboard"> 
           
             <div class="row"
                 v-for="(row,indexY) in gameStatus"
                  :key="indexY">
                  <div class="section"
                        v-for="(status,indexX) in row"
                        @click="onSectionClick(indexX,indexY)"
                        :class="{pointer:status===null}"
                        :key="indexX">
                        
                        <CircleBlack v-if="status===0"/> 
                        <CrossWhite v-if="status===1"/>
                </div>
                  
              
             </div>
           
               
            <router-link to="/" class="btn btn-red"> RESTART</router-link>
              
            </div>
        </div>
    </div>
</template>

<script>
import CircleBlack from '@/components/CircleBlack' 
import CrossWhite from '@/components/CrossWhite'
import ScoreBar from '@/components/ScoreBar'
import {setStorage,getStorage,removeStorage} from '@/sessionStorage.js'
export default {
    data(){
        return{
            currentPlayer:0, 
            gameStatus:[
                [null,null,null],
                 [null,null,null],   
                 [null,null,null]
            ],
        } 
    },
    methods:{
        onSectionClick(x,y){
          if (this.gameStatus[y][x]!==null) return 
          this.gameStatus[y][x] = this.currentPlayer
          this.checkResult()
          this.togglePlayer()

        },
        checkResult(){
            
            let status = this.gameStatus
           for(let y=0; y<status.length; y++){
               for(let x=0; x<status[y].length; x++ ){
                   let sumOfCol = this.getSumOfColumn(x,y) 
                   let sumOfRow = this.getSumOfRow(x,y) 
                   if(
                        (   this.isRowAllNumber(x,y) && 
                            sumOfRow=== 0||sumOfRow=== 3
                        )||(
                            this.isColumnAllNumber(x,y) && 
                            sumOfCol === 0||sumOfCol === 3
                        )||(
                           this.getSumOfNegativeSlash(x,y)===0 || 
                           this.getSumOfNegativeSlash(x,y)===3 || 
                           this.getSumOfPositiveSlash(x,y)===0 || 
                           this.getSumOfPositiveSlash(x,y)===3
                        )){
                      this.setScore()  
                      this.goResultPage(this.currentPlayer)
                    }
               }
           }
           this.checkIfFinish()
        }, 
        setScore(){ 
            let circleScore = getStorage('circle')
            let crossScore = getStorage('cross')
            switch (this.currentPlayer ){
                case 0: 
                    setStorage('circle',parseInt(circleScore)+1) 
                    break
                case 1: 
                    setStorage('cross',parseInt(crossScore)+1) 
                    break
            }
        }, 
        checkIfFinish(){
            let status = this.gameStatus
            let result = status.filter(row=>{
                let rowResult =  row.filter(section=>{
                    
                    return  section ===  null
                })
                return rowResult.length >0
            })
            if( result.length===0) this.$router.push('/result/-1')
        }, 
         goResultPage(winner){
            this.$router.push('/result/'+winner)
        },
        getSumOfNegativeSlash(x,y){
            let status = this.gameStatus
            if(x!==0 || y!==0 ) return 
            if(  !(this.isNumber(status[y][x]) && 
                  this.isNumber(status[y+1][x+1]) &&
                  this.isNumber(status[y+2][x+2]))) return 
                        
            return   status[y][x]+ status[y+1][x+1]+status[y+2][x+2]
        },
       
        getSumOfPositiveSlash(x,y){
            let status = this.gameStatus
            
            if (x!==0|| y!==0)return 
            
            if(  !(this.isNumber(status[y][x+2]) && 
                  this.isNumber(status[y+1][x+1]) &&
                  this.isNumber(status[y+2][x])) ) return 
            
            return status[y][x+2]+ status[y+1][x+1]+status[y+2][x]  
        },
        getSumOfColumn(x,y){
            let status = this.gameStatus
            if(y!==0 ) return 
            return   status[y][x]+status[y+1][x]+status[y+2][x]             
        },
        getSumOfRow(x,y){
            let status = this.gameStatus
            if(x!==0 ) return 
             return status[y][x]+
                       status[y][x+1]+
                       status[y][x+2]
        },
        isColumnAllNumber(x,y){
            let status = this.gameStatus
            if (y!==0) return false
            return   this.isNumber(status[y][x]) &&  
                     this.isNumber(status[y+1][x]) && 
                       this.isNumber(status[y+2][x])
        }, 
        isRowAllNumber(x,y){
            let status  = this.gameStatus
            if (x!==0) return false
            return this.isNumber(status[y][x]) &&  
                      this.isNumber(status[y][x+1]) && 
                      this.isNumber(status[y][x+2]) 
        },
        isArray(item){
            return Array.isArray(item)
        },
        isNumber(item){
            return  typeof item === 'number'
        },
        togglePlayer(){
            this.currentPlayer = this.currentPlayer===0?1:0
        },
        resetGameStatus(){
            this.gameStatus=
                [ [null,null,null],
                 [null,null,null],   
                 [null,null,null]]
        } 
    },
    components:{ 
        CrossWhite,CircleBlack,
        ScoreBar
    }

}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';
@import '../assets/scss/App.scss';
.row{
    .section{
          height: 100%;
    }
    height:33%;
}
 
 .bg-black{
     background-color: black;
 }
 .circle,.cross{
     width: 1rem;
     height: 1rem;
 }
.circle{ 
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
   
    &.cross-white{
        &:before, &:after{
        width: 5rem;
        }
    }

}




.checkerboard{
    padding: 0;
    margin-top: 50px;
    .section{
        border: solid #ED494C;
        border-width: 0;
    }
    .row:nth-child(3){
        .section{
            border-bottom: 0;
        }
    }
    div:nth-child(1){
        border-width: 0 4px 4px 0 ;
    }
    div:nth-child(2){
        border-width: 0 0px 4px 0px ;
    }
    div:nth-child(3){
        border-width: 0 0px 4px 4px ;
    }
 
    
} 
.pointer{
    cursor: pointer;
}
</style>
