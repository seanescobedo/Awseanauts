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
    
         this.body.setVelocity(12, 23);
         //keeps track of which direction your charatcer is going
         this.facing = "right";
         this.now = new Date().getTime();
         this.lastHit = this.now;
         this.lastAttack = new Date().getTime();
         
         this.renderable.addAnimation("idle", [78]);
         this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 75);
         this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 75);
         
         this.renderable.setCurrentAnimation("idle");
    
        //The screen(viewport) follows this character's position(pos) on both x and y axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
},
        update: function(delta) {
            this.now = new Date().getTime();
        if (me.input.isKeyPressed("right")) {
            //makes the position of x by adding velocity above 
            //in setVelcoity() & multiplying it by me.timer.tick
            //me.timer.tick makes smooth movements 
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.flipX(true);
            this.facing = "right";
            }   else if (me.input.isKeyPressed('left')) {
                this.facing = "left";
            // this flips the image around\\
            this.flipX(false);
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        } else {
            this.body.vel.x = 0;
        }
        
        if (me.input.isKeyPressed('attack')) {
            if (!this.renderable.isCurrentAnimation("attack")) {
                console.log(!this.renderable.isCurrentAnimation("attack"));
                //sets the current animation to attack and once that is over
                //goes back to idle animation
                this.renderable.setCurrentAnimation("attack", "idle");
                //makes it so that the next time we start this sequence we begin
                //from the first animation, not wherever we left we off when we
                //swithched to another animation 
                this.renderable.setAnimationFrame();
            }
        }

        else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
            
        }else if(!this.renderable.isCurrentAnimation("attack")) {
                this.renderable.setCurrentAnimation("idle");
            }
            
                    me.collision.check(this, true, this.collideHandler.bind(this), true);
            
     //allows the coding to actually to work
      if (me.input.isKeyPressed('jump')) {
            if (!this.body.jumping && !this.body.falling) {
                // he can jump ;P\\
                this.body.vel.y = -this.body.accel.y * me.timer.tick;
                // set the jumping as true if you press up\\
                this.body.jumping = true;
                
            }
  
        }
        
     
      this.body.update(delta);
      this._super(me.Entity, "update", [delta]);
      return true;
    },
    
    collideHandler: function(response) {
        console.log(response.b.type);
        if (response.b.type === 'EnemyBaseEntity') {
            //ydif & xdif is the difference in position between the player 
            //and whatever he hit so we can see if the player jumped on something
            var ydif = this.pos.y - response.b.pos.y;
            var xdif = this.pos.x - response.b.pos.x;

            if (ydif < -40 && xdif< 70 && xdif>-35) {
                this.body.falling = false;
                this.body.jumping = false;
                this.body.vel.y = -1;
            }
           else if (xdif > -35 && this.facing === 'right' && (xdif < 0)) {
                this.body.vel.x = 0;
                this.pos.x = this.pos.x - 1;
            } else if (xdif < 60 && this.facing === 'left' && (xdif > 0)) {
                this.body.vel.x = 0;
                this.pos.x = this.pos.x + 1;
            }
            
            if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= 400){
                console.log("tower Hit");
                this.lastHit = this.now;
                response.b.loseHealth();
            }
            
        }
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
                return (new me.Rect(0, 0, 100, 70)).toPolygon();
            }
        }]);
   
        this.broken = false;
        this.health = 10;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        
        this.type = "PlayerBase";
        
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
    },
    
    update:function(delta){
        if(this.health<=0){
            this.broken = true;
           this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    loseHealth: function(damage){
        
        this.health = this.health - damage;
        
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
                return (new me.Rect(0, 0, 100, 70)).toPolygon();
            }
        }]);
         this.broken = false;
         this.health = 10;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        
        this.type = "EnemyBaseEntity";
        
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
        
    },
    
    update:function(delta){
        if(this.health<=0){
            this.broken = true;
            this.renderable.setCurrentAnimation("broken");
            
        }
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    onCollision: function(){
        
    },
    
    loseHealth: function(){
        this.health--;
    }
        
});

game.EnemyCreep = me.Entity.extend({
    init: function(x, y, settings) {
    this._super(me.Entity, 'init', [x, y, {
            image: "creep1",
            spritewidth: "32",
            spriteheight: "64",
            width: 32,
            height: 64,
            getShape: function() {
                return (new me.Rect(0, 0, 32, 64)).toPolygon();
            }
        }]);
        this.health = 10;
        this.alwaysUpdate = true;
        //this.attacking lets us know if the enemy is  currently attacking
        this.attacking = false;
        //keeps tract of when our creep last attacked anything
        this.lastAttacking = new Date().getTime();
        //keeps track of the last time the creep hit anything
        this.lastHit = new Date().getTime();
        this.now = new Date().getTime();
      
        this.body.setVelocity(3,20);
        
        this.type = "EnemyCreep";
        
        this.renderable.addAnimation("walk", [3, 4, 5], 80);
        this.renderable.setCurrentAnimation("walk");
        
       },

    update: function(delta){
        this.now = new Date().getTime();
        
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        
        return true;
    },
    
    collideHandler: function(response){
        if(response.b.type==='PlayerBase'){
            this.attacking = true;
            //this.lastAttacking = this.now;
            this.body.vel.x = 0;
            //keeps moving the creep to the right to maintain its position
            this.pos.x = this.pos.x + 1;
            //checks if it has been at least 1 second since the creep hit a base
            if((this.now-this.lastHit >= 400)){
                //updates the lastHit time 
                this.lastHit = this.now;
                //makes the player base call its loseHealth funcction
                //and  passes it a damage of 1 
                response.b.loseHealth(1);
            }
        }
    }
        

});

game.GameManager = Object.extend({
    init: function(x, y, settings) {
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();

        this.alwaysUpdate = true;

    },
    update: function() {
        this.now = new Date().getTime();

        if (Math.round(this.now / 1000) % 10 === 0 && (this.now - this.lastCreep >= 1000)) {
            this.lastCreep = this.now;
            var creep = me.pool.pull("EnemyCreep", 1000, 0, {});
            me.game.world.addChild(creep, 6);
        }
        return true;
    }

});
