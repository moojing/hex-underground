

let card  = $('#card')

let panel = $('#panel-outter')
for(let i=2; i<10;i++){
   
   let newcard = card.html().replace(`{{title}}`,i)
   panel.append(newcard)
   let cards = $('.card.card-bending') 
   let lastCard = cards[cards.length-1]
   for(let j=1;j<10;j++){
      let newFormula = `<div class="formula">${i}x${j}=${i*j}</div>`
      console.log('lastCard',lastCard)
      
     if (j<=3){
      $(lastCard).find('.col-6').first().append($.parseHTML(newFormula));
     } else{
      $(lastCard).find('.col-6').last().append($.parseHTML(newFormula));
     }
   }
   
} 


panel.append('<div class="clearfix"></div>')