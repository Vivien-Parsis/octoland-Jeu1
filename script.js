const decalageX = 100;
const decalageY = 100;
const hauteur = 600;
const largeur = 1300;
const timeMax = 20;
let numbOcto = 0;
let timeCount = timeMax;
let highScore = 0;

function preload() {
  this.load.image('octo', 'assets/image/octo.png');
  this.load.image('fond', 'assets/image/fond.jpg');
  this.load.image('josiane', 'assets/image/josiane.png');
}

function create() {
  this.score = 0;
  this.pause = false;
  this.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
  this.octoList = [];

  this.timer = this.time.delayedCall(1000,null,null,this);
  
  console.log(this.scoreTest);
  numbOcto = ((largeur-1*decalageX)/decalageX)*((hauteur-1*decalageY)/decalageY);
  
  
  this.fond = this.physics.add.image(config.width/2,config.height/2,'fond');
  this.fond.setScale(config.width/this.fond.width, config.height/this.fond.height);
  this.idJosiane = RandInt(0,numbOcto);
  let currentid = 0;
  for(let y = decalageY; y<config.height; y+=decalageY)
  {
    for(let x = decalageX; x<config.width; x+=decalageX)
    {
      
      if(currentid==this.idJosiane)
      {
        this.octoList.push(this.physics.add.image(x,y,'josiane').setScale(0.05,0.05));
      }
      else
      {
        this.octoList.push(this.physics.add.image(x,y,'octo').setScale(0.05,0.05));
      }
      currentid+=1;
    }
  }
  console.log(currentid+"/"+numbOcto);
  const text = "Score: "+this.score+'\nTimer: '+timeCount+'s\nHigh score: '+ highScore;
  this.scoreTest = this.add.text(0,0,text,{fontfamily:"arial",fill:'#dddddd',stroke:'#000000',strokeThickness:5});
}

function update() {
  
  var pointer = this.input.activePointer;
  const text = "Score: "+this.score+'\nTimer: '+timeCount+'s\nHigh score: '+ highScore;
  this.scoreTest.setText(text);
  if(this.timer.getProgress()==1 && this.pause == false)
  {
    this.timer = this.time.delayedCall(1000,null,null,this);
    timeCount -= 1;
  }

  if(timeCount == 0)
  {
    this.pause = true;
    if(this.score>highScore)
    {
      highScore = this.score;
    }
    for(let i = 0; i < this.octoList.length; i++)
    {
       this.octoList[i].destroy();   
    }
    this.octoList = [];
    this.scoreTest.setPosition((config.width/2)-(this.scoreTest.displayWidth/2),(config.height/2)-(this.scoreTest.displayHeight/2)).setAlign('center');
    
    
  }
  
  if(this.pause && this.r.isDown)
  {
    this.scoreTest.setPosition(0,0).setAlign('left');
    this.score=0;
    timeCount=timeMax;
    this.pause = false;
    this.idJosiane = RandInt(0,numbOcto);
    let currentid = 0;
    for(let y = decalageY; y<config.height; y+=decalageY)
    {
      for(let x = decalageX; x<config.width; x+=decalageX)
      {
        if(currentid==this.idJosiane)
        {
          this.octoList.push(this.physics.add.image(x,y,'josiane').setScale(0.05,0.05));
        }
        else
        {
          this.octoList.push(this.physics.add.image(x,y,'octo').setScale(0.05,0.05));
        }
        currentid+=1;
      }
    }
  }
  
  if(this.pause == false && (this.r.isDown || pointer.isDown
      && pointer.x > this.octoList[this.idJosiane].x-(this.octoList[this.idJosiane].displayWidth/2)
      && pointer.x < this.octoList[this.idJosiane].x+(this.octoList[this.idJosiane].displayWidth/2)
      && pointer.y > this.octoList[this.idJosiane].y-(this.octoList[this.idJosiane].displayHeight/2)
      && pointer.y < this.octoList[this.idJosiane].y+(this.octoList[this.idJosiane].displayHeight/2)))
  {
    if(pointer.isDown)
    {this.score+=1;}
    if(this.r.isDown)
    {
      this.score=0;
      timeCount=timeMax;
    }
    const text = "Score: "+this.score+'\nTimer: '+timeCount+'s\nHigh score: '+ highScore;
    this.scoreTest.setText(text);
    
    for(let i = 0; i < this.octoList.length; i++)
    {
       this.octoList[i].destroy();   
    }
    this.octoList = [];
    
    this.idJosiane = RandInt(0,numbOcto);
    let currentid = 0;
    for(let y = decalageY; y<config.height; y+=decalageY)
    {
      for(let x = decalageX; x<config.width; x+=decalageX)
      {
        if(currentid==this.idJosiane)
        {
          this.octoList.push(this.physics.add.image(x,y,'josiane').setScale(0.05,0.05));
        }
        else
        {
          this.octoList.push(this.physics.add.image(x,y,'octo').setScale(0.05,0.05));
        }
        currentid+=1;
      }
    }
  }
}

const config = {
    type: Phaser.AUTO,
    width: largeur,
    height: hauteur,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    backgroundColor: '#020E55',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

//genere un nombre entre min inclus et max exclus
function RandInt(min, max)
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const game = new Phaser.Game(config);