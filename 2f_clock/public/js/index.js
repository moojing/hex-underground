function selectAll(ele){
    return document.querySelector(ele)
} 

let second = selectAll('#second')
let hour = selectAll('#hour')
let minute = selectAll('#minute')
setInterval(updateTime , 1000);


function updateTime(){
    var d = new Date();
    console.log('d : ', d );
    
h = d.getHours(),
console.log('h: ', h);
m = d.getMinutes(),
console.log('m: ', m);
s = d.getSeconds() ;

var prec_hours = ( (convert(h) * 60 +m ) /720)*100 ;
var res_hours = (360 * prec_hours )/100 +270 ;
transform:;

var prec_min = (m/60)*100 ;
var res_min = (360 * prec_min )/100 -180 ;

var prec_sec = (s/60)*100 ;
var res_sec = (360 * prec_sec )/100 ;

hour.setAttribute('style',"transform :rotate("+res_hours+"deg)"+";")
minute.setAttribute('style',"transform :rotate("+res_min+"deg)"+" scale(-1, 1)"+";")
second.setAttribute('style',"transform :rotate("+res_sec+"deg)"+";")
 

}

function convert(hours){
    
    if (hours > 12) {
        hours-= 12;
    } 
    else if (hours === 0) {
        hours = 12;
    }
    return hours;
}

