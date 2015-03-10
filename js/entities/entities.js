game.PlayerEntity = me.Entity.extend({
init: function(x, y, settings) {
    this._super(me.Entity, 'init', [x, y, {
            image: "player",
            spritewidth: "64",
            spriteheight: "64",
            width: 64,
            height: 64,
            getShape: function() {
                return (new me.Rect(0, 0, 64, 64)).toPolygon();
            }
        }]);
    
         this.body.setVelocity(4, 18);
         
         this.renderable.addAnimation("idle", [78]);
         this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 75);
         
         this.renderable.setCurrentAnimation("idle");
    
        //The screen(viewport) follows this character's position(pos) on both x and y axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
},
        update: function(delta) {
        if (me.input.isKeyPressed("right")) {
            //makes the position of x by adding velocity above 
            //in setVelcoity() & multiplying it by me.timer.tick
            //me.timer.tick makes smooth movements 
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.flipX(true);
            
        } else {
            this.body.vel.x = 0;
        }
        
        if (this.body.vel.x !== 0){
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
            
        }else {
                this.renderable.setCurrentAnimation("idle");
            }
     //allows the coding to actually to work
      this.body.update(delta);
      
      this._super(me.Entity, "update", [delta]);
      return true;
    }
});

game.PlayerBaseEntity = me.Entity.extend({
init: function(x, y, settings) {
    this._super(me.Entity, 'init', [x, y, {
            image: "tower",
            spritewidth: "100",
            spriteheight: "100",
            width: 100,
            height: 100,
            getShape: function() {
                return (new me.Rect(0, 0, 100, 100)).toPolygon();
            }
        }]);
         this.broken = false;
         this.health = 10;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        
        this.type = "PlayerBaseEntity";
        
    },
    
    update:function(delta){
        if(this.health<=0){
            this.broken = true;
        }
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    onCollision: function(){
        
    }
        
});

game.EnemyBaseEntity = me.Entity.extend({
init: function(x, y, settings) {
    this._super(me.Entity, 'init', [x, y, {
            image: "tower",
            spritewidth: "100",
            spriteheight: "100",
            width: 100,
            height: 100,
            getShape: function() {
                return (new me.Rect(0, 0, 100, 100)).toPolygon();
            }
        }]);
         this.broken = false;
         this.health = 10;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        
        this.type = "EnemyBaseEntity";
        
    },
    
    update:function(delta){
        if(this.health<=0){
            this.broken = true;
        }
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    onCollision: function(){
        
    }
        
});