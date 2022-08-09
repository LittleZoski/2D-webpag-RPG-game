const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');

const canvas_width = canvas.width =800;
const canvas_height = canvas.height = 700;
let gameSpeed = 10;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'layer-5.png';

window.addEventListener('load', function(){

    const slider =document.getElementById('slider');
    slider.value = gameSpeed;
    const showGameSpeed = document.getElementById('showGameSpeed');
    showGameSpeed.innerHTML = " " +gameSpeed;
    slider.addEventListener('change',function(e){
        console.log(e.target.value);
        gameSpeed = e.target.value;
        showGameSpeed.innerHTML = e.target.value;
    });

    class layer{
        constructor(image, speedModifier){
            this.x = 0;
            this.y = 0;
            this.width =2400;
            this.height = 700;
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed =gameSpeed*this.speedModifier;
        }

        update(){
            this.speed = gameSpeed*this.speedModifier;
            if(this.x <= -this.width){
                this.x = 0;
             }
            this.x = Math.floor(this.x-this.speed);
         }

        draw(){
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
            ctx.drawImage(this.image,this.x+this.width,this.y,this.width,this.height);
        }
    }

    const layer1 = new layer(backgroundLayer1, 0.2);
    const layer2 = new layer(backgroundLayer2, 0.4);
    const layer3 = new layer(backgroundLayer3, 0.6);
    const layer4 = new layer(backgroundLayer4, 0.8);
    const layer5 = new layer(backgroundLayer5, 1.0);

    const gameObjects =[layer1, layer2, layer3, layer4, layer5];

    function animate(){
        ctx.clearRect(0,0, canvas_width, canvas_height);
        gameObjects.forEach(object => {
            object.update();
            object.draw();
        });
        requestAnimationFrame(animate);

    };
    animate();

});

/**@type {HTMLCanvasElement} */
const canvas2=document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
CANVAS2_WIDTH = canvas2.width = 500;
CANVAS2_HEIGHT = canvas2.height = 1000;
const numberOfEnemies = 15;
const enemiesArray = [];



let gameFrame = 0;

class Enemy {
    constructor(){
        this.image = new Image();
        this.image.src = 'enemy4.png';
        this.speed = Math.random()*4-2;
        this.spriteWidth = 213;
        this.spriteHeight = 213;
        this.width = this.spriteWidth/2.5;
        this.height = this.spriteHeight/2.5;
        this.x=Math.random()*(CANVAS2_WIDTH-this.width);
        this.y=Math.random()*(CANVAS2_HEIGHT-this.height);
        this.newX=Math.random()*(CANVAS2_WIDTH-this.width);
        this.newY=Math.random()*(CANVAS2_HEIGHT-this.height);
        this.frame = 0;
        this.flapspeed =Math.floor(Math.random()*3+1);
        this.interval = Math.floor(Math.random()*200+50);
        
    }

    update(){
        //this.x = 0;
        //this.y = 0;
        if (gameFrame%this.interval ===0){
            this.newX=Math.random()*(CANVAS2_WIDTH-this.width);
            this.newY=Math.random()*(CANVAS2_HEIGHT-this.height);
        }
        let dx = this.x -this.newX;
        let dy = this.y -this.newY;

        this.x -= dx/70;
        this.y -= dy/70;
        if(this.x + this.width < 0) this.x =canvas2.width;
        if(gameFrame%this.flapspeed === 0){
            this.frame >4? this.frame = 0: this.frame++;
        } 
    }
    draw(){
        
        ctx2.drawImage(this.image, this.frame*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,
            this.x,this.y,this.width,this.height);
    }
}

for(let i=0; i<numberOfEnemies; i++){
    enemiesArray.push(new Enemy());
}

function animate2(){
    ctx2.fillStyle = 'white';
    ctx2.clearRect(0,0,CANVAS2_WIDTH,CANVAS2_HEIGHT);
    enemiesArray.forEach(enemy=> {
        enemy.update();
        enemy.draw();
    })
    gameFrame++;
    requestAnimationFrame(animate2);
}
animate2();

