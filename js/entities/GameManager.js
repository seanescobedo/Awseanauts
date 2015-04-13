game.GameTimerManager = Object.extend({
    init: function(x, y, settings) {
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;

    },
    update: function() {
        this.now = new Date().getTime();
        
        this.goldTimerCheck();
        
        this.creepTimerCheck();
        
        return true;
    },
/*
     *$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
     *--------------------------- Da Timer Checks ------------------------------
     *$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
     */
   goldTimerCheck: function(){
        if (Math.round(this.now / 1000) % 12 === 0 && (this.now - this.lastCreep >= 1000)) {
            game.data.gold += 10;
            console.log("Current gold: " + game.data.gold);
        }
        
   },
   
   creepTimerCheck: function(){
       if (Math.round(this.now / 1000) % 6 === 0 && (this.now - this.lastCreep >= 1000)) {
            this.lastCreep = this.now;
            var creep = me.pool.pull("EnemyCreep", 4600, 0, {});
            me.game.world.addChild(creep, 6);
        }
   }
});

game.HeroDeathManager = Object.extend({
    init: function(x, y, settings) {
        this.alwaysUpdate = true;
    },
    
    update: function(){
        if(game.data.player.dead){
            me.game.world.removeChild(game.data.player);
            me.state.current().resetPlayer(10, 0);
        }
        return true;
    }
});

game.ExperienceManager = Object.extend({
    init:  function(x, y, settings){
    this.alwaysUpdate = true;
    this.gameover = false;
    },
    
    update: function(){
        if(game.data.win === true && !this.gameover){
            this.gameOver(true);
        }else if(game.data.win === false && !this.gameover){
             this.gameOver(false);
        }
        
        return true;
    }, 
    
    gameOver: function(win){
        
        if(win){
            game.data.exp += 100;
        }else{
            game.data.exp += 10;
        }
            
           this.gameover = true;
            me.save.exp = game.data.exp;
            
            me.save.exp2 = 4;
    }
    
   
});