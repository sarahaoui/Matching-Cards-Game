
const cards=document.querySelectorAll('.memory-card ');
const backcards= document.querySelectorAll('.backface');
const restertbtn=document.querySelector('.restert');
const moved=document.querySelector('.Moves');
const countdown=document.querySelector('#countdown');
const model= document.querySelector('.modal');
const overly=document.querySelector('.overlay');
const secondModel=document.querySelector('.second-model');
const MovesModel=document.querySelector('.move-model');
let audio=document.getElementById('audio');
const gameOverModel=document.querySelector('.GameOver');
let lockBoard=false;
let hasFlipedCard=false;
let firstCard ,secondCard;
let firstbackface,secondbackface;
let randomPos;
let movesCount=0;
let startingMinuts=1;
let time=startingMinuts * 60;
let interval;
let correct=0;
const startAudio= new Audio ('audio/audiostart.mp3');
const matchAudio= new Audio ('audio/match.mp3');
const loseAudio= new Audio ('audio/lose.mp3');
const winnAudio= new Audio ('audio/winn.mp3');
const musicAudio= new Audio ('audio/music.mp3');

/********Functions********/



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
    model.classList.add('visibilty');  
    overly.classList.add('visibilty'); 
    gameOverModel.classList.add('visibilty');
    location.reload();
    

}
const openModel=function(){
     model.classList.remove('visibilty'); 
     overly.classList.remove('visibilty'); 
     MovesModel.textContent=movesCount;
    secondModel.textContent=countdown.textContent;
}


function startTimer(){

    const minutes= Math.floor(time / 60);
    let seconds = time % 60;
    seconds= seconds<10 ?'0'+seconds : seconds;
    let timeover=`${minutes}:${seconds}`;
    countdown.innerHTML=timeover
    time--;
    
    if(timeover==='0:00'){
        musicAudio.pause();
        loseAudio.play();
       gameOverModel.classList.remove('visibilty');
       overly.classList.remove('visibilty'); 
       clearInterval(interval);
       correct=0;
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
        setTimeout(()=>{
        matchAudio.play();
        lockBoard=false;
        firstCard.classList.add('visibilty');
        secondCard.classList.add('visibilty');
        },1000);
        lockBoard=true;
        correct++;
    }else{
        lockBoard=true;
        setTimeout(()=>{
         firstCard.classList.remove('flip');
         secondCard.classList.remove('flip');
         resetBoard();
        },1500);
       
    }
}
/*******Shuffle Function*******/
(function shuffle(){
        startAudio.play();
        setTimeout(()=>{
        startAudio.pause();
         musicAudio.play();
        },4500); 
       
    startGame();
    cards.forEach(card =>{
     randomPos=Math.trunc(Math.random()*12) ; 
    card.style.order=randomPos;  // the order of item flex(container should be flex) });
});
interval=setInterval(startTimer,900);

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
 document.addEventListener('keydown',function(e){    
   if((e.key==='Escape')&&(!model.classList.contains('hidden'))){    
       closeModel();
   }
});


/**********Click Carts Event**********/
for(let i=0 ;i<=cards.length;i++){
    cards[i].addEventListener('click',function(){
        if(lockBoard) return;
        this.classList.add('flip');

     // double click in the same card
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
        musicAudio.pause();
        winnAudio.play();
        openModel();
        correct=0;
        },900);  
    }
     
    });
}


 
   
