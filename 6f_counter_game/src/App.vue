<template>
<div>
  <div :class="pages[0]" v-if="currentPage==pages[0]"  >
    
     <div class="row entry"> 
        <div class="num_group">
           <h1 class="entry__number text-black">60</h1>
           
        </div>
        <div class="entry__text">SECONDS <br/> CHALLENGE <span class="entry__operator">+-x÷</span></div>
     </div>
     <div class="row  text-center">
        <div class="button-black" @click="onStartClick">START!</div>
        <div class="hint">Try to answer more as you can.</div>
     </div>
     
  </div>
  <div :class="pages[1]" v-if="currentPage==pages[1]" >
      
    <div class="row">
      <div class="banner">
        <div class="banner_left">
          <div class="bg_orange banner_top">
            60 SECONDS CHALLENGE
          </div>
          <div class="banner_bottom">
            <span class="bg_white">SCORE</span>
            <span class="score">{{score}}</span>
          </div>
        </div>
        <em class="banner_right">
           {{currentTime}}
        </em>
      </div>
      <div class="quiz">
        <div class="num">{{this.quizNumbers[0]}}</div>
        <div class="text-white">{{operator}}</div>
        <div class="num">{{this.quizNumbers[1]}}</div>
        <div class="text-white">=</div>
        <div class="answer-group">
          <input type="text" class="answer" maxlength="6" @keyup.enter="onAnswerInput">
          <span class="hint">press enter to answer</span>
        </div>
      </div>
    </div>
  </div>

  <div :class="pages[2]" v-if="currentPage==pages[2]" >
    <div class="bg_orange result__title">60 SECONDS CHALLENGE </div>
    <div class="result__banner">
      YOUR FINAL SCORE
    </div>
    <div class="result__score"> 
      {{this.score}}
    </div>

    <div class="button-black text-center dib" @click="onResetClick">Try Again</div>

  </div>
</div>
</template>

<script>

function initData(){
  return {
      pages:['start','game','result'],
      operatorList:['+','-','x','÷'],
      operator:'+',
      currentPage:'start',
      score: '000',
      time_remain:60,
      currentTime:'00:00',
      quizNumbers:[],
    }
}
export default {
  name: 'app',
  data(){
    return initData()
  },
  methods:{
    onStartClick(){
      this.currentPage = this.pages[1]
      this.timeReducer()
      this.setQuizNumber()
    },
    onAnswerInput(event){
      let value = event.target.value
      
      if (typeof parseInt(value) !== 'number') {
        event.target.value ='' 
        return 
      }
      
      if (this.checkAnswer(value)) {
        if(this.time_remain<=20 && this.time_remain>=0){
          this.addScore(5) 
        }else{
          this.addScore(1) 
        }
      }else{
         this.addScore(-1) 
      } 
      this.randomOperator()
      this.setQuizNumber()
        
      event.target.value=''
      
    },
    checkAnswer(value){
       
      switch (this.operator){
        case '+': return +value=== (+this.quizNumbers[0]+ +this.quizNumbers[1] )
        case '-': return +value=== (+this.quizNumbers[0]- +this.quizNumbers[1] )
        case 'x': return +value=== (+this.quizNumbers[0]* +this.quizNumbers[1] )
        case '÷': return +value=== (+this.quizNumbers[0]/ +this.quizNumbers[1] )
      }
    },
    setQuizNumber(){
      let digit;
      switch (true){
        case (this.time_remain>=40 && this.time_remain<=60): {
              digit = 1
              break; 
            }
        case (this.time_remain>=20 && this.time_remain<=40): {
              digit = 2
              break;
            }
        case (this.time_remain>=0 && this.time_remain<=20): {
              digit = 3
            break;
        }    
      }
      let result = []
      let firstNum=this.getDigits(digit); 
      let secondNum=this.getDigits(digit); 

      if(firstNum < secondNum){
        let temp = firstNum
        firstNum = secondNum 
        secondNum = temp 
      }
      
      if(this.operator=='÷' && ( firstNum % secondNum!==0)){
        while(this.isPrime(firstNum)) firstNum = this.getDigits(digit); 
        while(this.isPrime(secondNum)) secondNum = this.getDigits(digit); 
        
        let secondFactor = this.getFactors(secondNum,digit)
       
        secondNum = this.getArrayRandomItem(this.getFactors(firstNum,digit))
       
      } 
      result = result.concat([firstNum,secondNum]) 
      
      this.quizNumbers = result
    },
    isPrime(num) {
      for(var i = 2; i < num; i++)
        if(num % i === 0) return false;
      return num > 1;
    },
    getFactors(number,digits){
      let factors =  Array
        .from(Array(number + 1), (_, i) => i)
        .filter(i => number % i === 0)

      if(digits){
        factors = factors.filter(factor=>(factor+'').length===digits)
      }
        return factors
    }, 
    getDigits(digits){
      switch(digits){
        case 1 : return Math.floor((Math.random() * 10) + 1) ; 
        case 2 : return Math.floor((Math.random() * 100) + 10) ; 
        case 3 : return Math.floor((Math.random() * 100) + 100) ; 
      }
    },
    getArrayRandomItem(array){
      return  array[Math.floor(Math.random()*array.length)];
    },
    randomOperator(){
      let order = Math.floor(Math.random()*100) % 4 
      this.operator = this.operatorList[order]
    },
    addScore(value){
      let score = parseInt(this.score)
      if((score+value) >=0 ) score += value
      score = this.numberFormat(score,3)
      this.score = score
    },
    numberFormat(number,digits){
      while((number + '').length<digits) {
        number = '0'+number
      }
      return number
    },
    convertSeconds(s){
      let min = Math.floor(s/60)
      let sec = s % 60 
      
      return this.numberFormat(min,2) + ':' + this.numberFormat(sec,2) 
    },
    timeReducer(){
         let timer =  setInterval(()=>{
          if( this.time_remain>0){
            this.currentTime = this.convertSeconds(this.time_remain -=1 )
          }else{
            clearInterval(timer)
            this.currentPage= this.pages[2]
          }
        }, 1000)
        return timer
    },
    onResetClick(){
      Object.assign(this.$data, initData());
      this.currentPage = this.pages[0]
    },
    
  }, 
  created(){
     this.currentTime = this.convertSeconds(this.time_remain )
  },
  beforeDestroy() {
    
  },
}
</script>

<style lang="scss">


$color-primary:#FF9D00;
.row{
  margin: 30px 0;
}
$entry_number_size:240px;
.entry{
  margin:auto;
  position: relative;
  margin-top: 300px;
  display: flex;
  justify-content: center;
  align-content: center;
  margin-bottom: 40px;
  .entry__number{
    font-size: $entry_number_size;
    margin:0;
  }

  .entry__text{
    position: relative;
    font-size: 96px;
    font-weight: bold;
    text-align: left;
    margin-left: 10px;
    line-height: 96px;
    display: flex;
    justify-content: center;
    align-self: center;
  }
 
}
 
.num_group{
  position: relative;
  
  .entry__number{
    z-index: 2;
    &:after{
      content:'60';
      font-size: $entry_number_size;
      color:white;
      position: absolute;
      
      left: -10px;
    }
  }
}
.entry__operator{
  color:white; 
  border-bottom: 4px solid #fff;
  text-decoration: underline;
  font-size: 46px;
  line-height: 44px;
  padding-bottom: 5px;
  position: absolute;
  right: 0;
  top: 25px;
} 
.text-center{
  text-align: center;
} 
.button-black{
  display: block;
  margin:auto;
  width: 350px; 
  height: 58px;
  background-color: black;
  color:$color-primary;
  line-height: 58px;
  font-size: 36px;
  cursor: pointer;
}
.hint{
  display: inline-block;
  text-align: center; 
  color:white; 
  font-size: 24px; 
}

 .game{
   margin:auto;
   width: 900px;
   padding:300px;
   .banner{
     font-weight: bold;
     display: flex;
     justify-content: space-between;
     .banner_top{
       font-size: 30px;
       border:3px solid white;
       padding:12px 16px;
       
     }
     .banner_bottom{
       font-size: 30px;
       *{
           padding:12px 16px;
       }
       
     }
     .banner_left{
        text-align: left;
        display: flex;
        flex-direction: column;
     }
     .banner_right{
       letter-spacing: 4px;
       text-align: right;
       font-size: 96px;
       color:white;
       font-weight: 700;
     }
     .score{
        display: inline-block;
        height: 20px;
     }
   }
   .quiz{
     font-size: 112px;
     font-weight: bold;
     display: flex;
     align-self: center;
     justify-content: space-between;
     margin-top: 120px;
     *{
       margin:0 20px;
        
     }
     .num{
       color:black; 
       
     }
     .answer-group{
        display: flex;
        flex-direction: column;
     }
     .answer{
        width: 300px;
        font-size: 112px;
        text-align: center;
        margin:0;
     }
     .hint{
       color:white;
       font-size: 24px;
       font-weight: 200;
     }
   }
 }

 .result{
   *{margin: 5px 0;}
   padding:100px;
   .result__title{
     font-size: 30px;
     border:4px white solid;
     display: inline-block; 
     padding: 10px 20px;
      
   }
   .result__banner{
     color:black;
     font-size: 56px;
     margin:0 5px;
     &:before,&:after{
       content:'━'; 
       display: inline-block; 
       font-size: 56px; 
       color:white;
     }
     &:after{
       position: relative;
       right: 0;
     }
   }
   .result__score{
     font-size: 112px;
     color:black ;
     margin:40px 0;
   }
 }
</style>
