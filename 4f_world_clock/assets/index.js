 
function resetTime(){
    let timelist = document.querySelectorAll('.zone'); 
 
timelist.forEach(zone=>{
    
    if(zone.childElementCount <=0){
        zone.appendChild(document.querySelector('#zone-template').firstElementChild.cloneNode(true))
   zone.appendChild(document.querySelector('#zone-template').lastElementChild.cloneNode(true))
    }
   
   //change template
   zone.querySelector('.name').innerText = zone.id
   
   let time_zone = zone.getAttribute('time-zone')
   let localTime =getTimeByZone(time_zone)

   zone.querySelector('.date').innerText = localTime.date
   zone.querySelector('.time').innerText = localTime.time
   
})
}
 
setInterval(resetTime, 1000);

function getTimeByZone(timeZone){
    
    let now = new Date(Date.now())
    let month= now.toLocaleDateString('en-US',{timeZone,month:'long'}).substring(0,3)
    let localDateString =  now.toLocaleDateString('en-US',{timeZone})
    
    let date = new Date(localDateString).getDate() 
    let year = new Date(localDateString).getFullYear() 
    let customTimeString = date+ ' ' + month + ','+ year
    
    
    let time = now.toLocaleTimeString('en-US',{timeZone,hour12:false}).substring(0,5)
    


    return {date:customTimeString,time  }
} 
 