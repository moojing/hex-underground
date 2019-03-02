<template>
  <div id="app">
 
    <ul class="navbar" :class="{hideNavBar}">
      <li @click="canvasToImage">
        <i class="fa fa-save"></i>
        SAVE
      </li>
      <li  @click="resetCanvas"> 
        <i class="fa fa-chalkboard"></i>
        CLEAR ALL</li>
      <li @click="back()">
         <i class="fa fa-undo"></i>
        UNDO
      </li>

      <li  @click="forward()"  >
         <i class="fas fa-redo"></i>
        REDO
      </li>
      <div class="btn btn-white up"></div>
    </ul>
    
    <canvas ref="sketchpad" 
      @mousedown="onCanvasMouseDown"
      @mouseup="onCanvasMouseUp"
      :style="`background-color:${backgroundColor}; `"
      ></canvas>

    <ul class="toolbar" :class="{hideToolBar}">
      
     <li class="toolbar__tool">
       <i v-for="(tool,index) in tools "
          :key="index"
          class="fas "
          :class="`fa-${tool} `+ isToolActive(tool)" 
          @click="currentTool=tool"
          ></i>
     </li>
     <li class="toolbar__size">
       <span>SIZE:</span>
       <input type="text" 
        @mousedown="onSizeMouseDown"
        @mouseup="resetToolState"
        v-model="currentSize"
        class="size-controller">
       <span>px</span>
     </li>
     <li class="toolbar__color">
       <span>COLOR:</span>
       <div v-for="(color,index) in colors" class="color" 
        :class="`color-${color.name} `+isColorActive(color.name)" 
        :key='index'
        @click="currentColor=color"></div>
       
     </li>
     <div class="btn btn-white down"></div>
    </ul>

  </div>
</template>

<script>


export default {
  name: 'app',
  data(){
    return {
      canvasContext:null,
      backgroundColor:'#dfdfdf',
      colors:[
        {name:'white',code:'white'},
        {name:'black',code:'black'},
        {name:'lightgreen',code:'#9BFFCD'},
        {name:'green',code:'#00CC99'},
        {name:'darkgreen',code:'#01936F'}],
      currentColor:null, 
      currentSize:'20',
      isDrawing:false,
      isSizing:false, 
      hideToolBar:false,
      hideNavBar:false,
      tools:['paint-brush','eraser'],
      currentTool:'paint-brush',
      tempPosition:null,

    } 
  },
  methods:{
    onCanvasMouseDown(){ this.isDrawing = true },
    onCanvasMouseUp(){
      this.saveCavas()
      this.resetToolState()
    },
    onSizeMouseDown(){ this.isSizing = true },
    onCanvasMouseMove(event){
        // canvasContext.arc(event.offsetX,event.offsetY,this.currentSize,0,2*Math.PI,false)
    },
    canvasToImage(){
      let url =  this.$refs['sketchpad'].toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");;
      const link = document.createElement('a')
      link.innerText = 'Download'
      link.href = url // 將url 設定給 a tage 的 href
      link.download = 'circle.png'    // 設定 download name 
      link.click()
    },
    setWindowEvent(){
      window.addEventListener('mousemove',(event)=>{
           
          let currentPos = this.getCanvasMousePosition(event.clientX,event.clientY)
          if(this.isSizing && this.tempPosition ){
            let dragValue= currentPos.y- this.tempPosition.y 
            this.checkSizeDrag(dragValue)
          }

          if(this.isDrawing && this.tempPosition) {
            let pos = this.getCanvasMousePosition(event.clientX,event.clientY)
            this.draw((ctx)=>{
              ctx.strokeStyle = this.currentTool==='eraser'
              ? this.backgroundColor
              : this.currentColor.code
          
              ctx.lineWidth = this.currentSize*2;
              ctx.moveTo(this.tempPosition.x,this.tempPosition.y)
              ctx.lineTo(pos.x,pos.y)
              
            })
          }
          
          this.setCanvasTempPosition(currentPos.x,currentPos.y)
      })
      window.addEventListener('popstate',(e)=>{
        
        this.canvasContext.putImageData(e.state, 0, 0);
      })
    },
    checkSizeDrag(dragValue){
      if(dragValue<0){ 
        this.currentSize =  parseInt(this.currentSize)+1
      }else if(dragValue>0 && this.currentSize>=1){
        this.currentSize = parseInt(this.currentSize)-1
      }
    },
    draw(action){
      let canvasContext = this.canvasContext
      canvasContext.beginPath()
      action(canvasContext)
      canvasContext.stroke()
    },
    resetToolState(){
      this.isDrawing = false
      this.isSizing = false
      this.tempPosition = null
    }, 
    isColorActive(color){
      return this.currentColor && color==this.currentColor.name 
              ?'active' : ''
    },
    isToolActive(tool){
      return  tool == this.currentTool ? 'active' : ''
    },
    // isInCanvas(x,y){
    //   let canvasPosition = this.canvasContext.canvas.getBoundingClientRect()
    //    return (x >= canvasPosition.left && 
    //       x <=  canvasPosition.right && 
    //       y <= canvasPosition.bottom &&
    //       y >= canvasPosition.top) 
    // },
    resetCanvas(){
      let canvas = this.canvasContext.canvas
      this.canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      this.saveCavas()
    },
    setCanvas(){
      let canvas = this.$refs['sketchpad']
      canvas.width  = window.innerWidth
      canvas.height  = window.innerHeight - 60
      let ctx =  canvas.getContext('2d')
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      this.canvasContext = ctx
    }, 
    saveCavas(){
      let context = this.canvasContext
      let canvas = context.canvas 
      let state = context.getImageData(0, 0, canvas.width, canvas.height);
      window.history.pushState(state, null);
    },
    getCanvasMousePosition(clientX,clientY){
      let canvasPosition = this.canvasContext.canvas.getBoundingClientRect()
      let x = clientX-canvasPosition.x
      let y = clientY-canvasPosition.y
      return {x,y}
    },
    setCanvasTempPosition(x,y){
      this.tempPosition={x,y}
    },
    back(){
      window.history.back()
    },
    forward(){
      window.history.forward()
    }

  },
  mounted() {
    this.setCanvas()
    this.currentColor = this.colors[0]
    this.setWindowEvent()
  },
  
  
}
</script>

<style lang="scss">

*{
  box-sizing: border-box;
    padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}
 
.navbar{
  text-align: center;
  line-height: 60px;
  height: 60px;
   

  li{
    font-size: 20px; 
    margin:0 40px;
    padding: 0 20px;
    display: inline-block;
    list-style: none;
    &:hover{
    background-color: #e2e2e2;
     cursor: pointer;
    }
  }
 
}
 
 
.toolbar{
  position: fixed;
  bottom: 100px; 
  left: 50%; 
  transform: translateX(-50%);
  width: 70%;
  background-color: #fff;
  height: 100px; 
  border-radius: 50px;
  li{
    line-height: 100px;
    margin: 0;
    padding: 0 20px;
    list-style: none;
    display: inline-block;
    i{
      font-size: 20px;
      padding: 30px;   
      border-radius: 50px;
      &:hover{
        background-color: #d8d8d8;
      }
    }
  
  }
}

.toolbar__size{
  font-size: 20px;
  span{
    margin: 0 20px;
  }
  input{
    text-align: center;
    background-color: #d8d8d8;
    padding: 10px 20px;
    width: 100px;
    font-size: 20px; 
    border-radius: 50px; 
    border:none;
    &:focus{
      outline:none;
    }
  } 
}

.toolbar__color{
  span{
    font-size: 20px;
    margin:0 10px;
  }
}
.toolbar__tool{
  .active{
    background-color: #d8d8d8;
  }
}

.hideToolBar{
  display: none;
}
 
</style>
