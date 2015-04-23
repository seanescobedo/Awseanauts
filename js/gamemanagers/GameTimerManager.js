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
            game.data.gold += (game.data.exp1 + 1);
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