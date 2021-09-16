
const cards=document.querySelectorAll('.memory-card ');
const backcards= document.querySelectorAll('.backface');
const restertbtn=document.querySelector('.restert');
const moved=document.querySelector('.Moves');
const secondEl=document.querySelector('#seconds');
const tensEl=document.querySelector('#tens');
const model= document.querySelector('.modal');
const overly=document.querySelector('.overlay');
const secondModel=document.querySelector('.second-model');
const MovesModel=document.querySelector('.move-model');
let audio=document.getElementById('audio');
let lockBoard=false;
let hasFlipedCard=false;
let firstCard ,secondCard;
let firstbackface,secondbackface;
let randomPos;
let movesCount=0;
let seconds=00;
let tens=00;
let interval;
let correct=0;


/********Functions********/

function play(){
    audio.muted=true;
    audio.play();
    audio.muted=false;
    audio.play();
}
function startGame(){
   
    cards.forEach(cardd =>{
        cardd.classList.add('flip');
    });
     cards.forEach(cardd =>{
        setTimeout(()=>{
        cardd.classList.remove('flip');
        },1000);
    });
    
}

const closeModel=function(){
    model.classList.add('hidden'); //get back the classe hidden 
    overly.classList.add('hidden'); 
    

}
const openModel=function(){
     model.classList.remove('hidden'); //delete classe hidden from the classe model
     overly.classList.remove('hidden'); 
     MovesModel.textContent=movesCount;
    secondModel.textContent=secondEl.textContent;
}
function startTimer(){
    tens++;
    if(tens <9){
        tensEl.innerHTML="0"+tens;
    }
    if(tens>9){
        tensEl.innerHTML=tens;
    }
    if(tens>99){
        seconds++;
        secondEl.innerHTML="0"+seconds;
        tens=0;
        tensEl.innerHTML="0"+0;
    }
    if(seconds>9){
        secondEl.innerHTML=seconds;
    }
    
}
function resetBoard(){
    [hasFlipedCard,lockBoard]=[false,false];
    [firstCard,secondCard]=[null,null];
    [firstbackface,secondbackface]=[null,null];
}

function checkforMatch(){
  //check cards 
    if(firstbackface.src===secondbackface.src){
        console.log('the same')
        firstCard.style.pointerEvents='none';
        secondCard.style.pointerEvents='none';
        correct++;
        
    }else{
        lockBoard=true;
        console.log('diffrent');
        setTimeout(()=>{
         firstCard.classList.remove('flip');
         secondCard.classList.remove('flip');
         resetBoard();
        },1500);
       
    }
}
/*******Shuffle Function*******/
(function shuffle(){
    play();
    startGame();
    cards.forEach(card =>{
     randomPos=Math.trunc(Math.random()*12) ; 
    card.style.order=randomPos;  // the order of item flex(container should be flex) });
});
interval=setInterval(startTimer);
 })();  // (function)(); imediatly invoked expression
 
 /********Moved Count********/
 function countMoved(){
   movesCount++;
   moved.textContent=movesCount;
 }
overly.addEventListener('click',closeModel);
 /***********Restert Button**********/
restertbtn.addEventListener('click',function(){
   location.reload();
    
   
 });
 document.addEventListener('keydown',function(e){    //if click on keybord in espace close the window also
   if((e.key==='Escape')&&(!model.classList.contains('hidden'))){   //hidden classe not existe than add it 
       closeModel();
   }
});


/**********Click Carts Event**********/
for(let i=0 ;i<=cards.length;i++){
    cards[i].addEventListener('click',function(){
        if(lockBoard) return;
        this.classList.add('flip');

     //if double click in the same card
        if(this===firstCard) return;

    if(!hasFlipedCard){
        //first click
        hasFlipedCard=true;
        firstCard=this;
        firstbackface=backcards[i];
        
          
          
    }
    else{
        //second click
        hasFlipedCard=false;
        secondCard=this;
        secondbackface=backcards[i];
        checkforMatch();
        
       
    }
    countMoved();
    if(correct==6){
        setTimeout(()=>{
        clearInterval(interval);
        openModel();
        correct=0;
        },900);
        
        
    }
    });
}


 
   
