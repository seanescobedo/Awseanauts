game.PlayerEntity = me.Entity.extend({
init: function(x, y, settings) {
        this.setSuper(x, y);
        this.setPlayerTimers();
        this.setAttributes();
        this.type = "PlayerEntity";
        this.setFlags();
         
         this.addAnimation();
          
         
         
         this.renderable.setCurrentAnimation("idle");
    
        //The screen(viewport) follows this character's position(pos) on both x and y axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
},
    /*
     *$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
     *--------------------------- Da Sets ------------------------------
     *$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
     */
        setSuper: function(x, y){
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
        },
    
        setPlayerTimers: function(){
            this.now = new Date().getTime();
            this.lastHit = this.now;
            this.lastAttack = new Date().getTime(); //hasnt been used yet
        },
        
        setAttributes: function(){
            this.health = game.data.playerHealth;
            this.body.setVelocity(game.data.playerMoveSpeed, 18);
            this.attack = game.data.playerAttack;
        },
        
        setFlags: function(){
          //keeps track of which direction your charatcer is going
           this.facing = "right";
           this.dead = false;  
           this.attacking = false;
        },
        
        setAnimation:  function(){
          if (this.attacking) {
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
      }, 
     /*
     *$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
     *--------------------------- Ups Of Da Dates ------------------------------
     *$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
     */
        update: function(delta) {
            this.now = new Date().getTime();

        this.dead = this.checkIfDead();

        this.checkKeyPressesAndMove();

        this.setAnimation();

        me.collision.check(this, true, this.collideHandler.bind(this), true);

        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    /*
     *$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
     *--------------------------- Da Checks ------------------------------
     *$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
     */
        checkIfDead: function(){
        if(this.health <= 0){
                return true;
            }  
            return false;
      },
      
        checkKeyPressesAndMove: function(){
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
        if (me.input.isKeyPressed('jump')) {
            if (!this.body.jumping && !this.body.falling) {
                // he can jump ;P\\
                this.body.vel.y = -this.body.accel.y * me.timer.tick;
                // set the jumping as true if you press up\\
                this.body.jumping = true;
                
            }
  
        }
        this.attacking = me.input.isKeyPressed("attack");
      },
     /*
     *$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
     *--------------------------- Da Collides ------------------------------
     *$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
     */
      collideHandler: function(response) {
        console.log(response.b.type);
        if (response.b.type === 'EnemyBaseEntity') {
           this.collideWithEnemyBase(response);
            
        }else if(response.b.type==='EnemyCreep'){
           this.collideWithEnemyCreep(response);
        }
            
        
    },
    
      collideWithEnemyBase: function(response){
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
                //this.pos.x = this.pos.x - 1;
            } else if (xdif < 60 && this.facing === 'left' && (xdif > 0)) {
                this.body.vel.x = 0;
                //this.pos.x = this.pos.x + 1;
            }
            
            if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){
                console.log("tower Hit");
                this.lastHit = this.now;
                //if the creeps health is less than our attack, execute code in if statement
                if(response.b.health <= game.data.playerAttack){
                    //adds 10 gold for a creep kill
                    game.data.gold += 10;
                    console.log("Current gold: " + game.data.gold);
                }
                
                response.b.loseHealth();
            }
            
    },
    
      collideWithEnemyCreep: function(response){
         var xdif = this.pos.x - response.b.pos.x;
            var ydif = this.pos.y - response.b.pos.y;
            
            this.stopMovement(xdif);
            
            if(this.checkAttack(xdif, ydif)){
                this.hitCreep(response);
            };
            
            
    },
    /*
     *$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
     *--------------------------- Da Actions ------------------------------
     *$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
     */
      stopMovement: function(xdif){
        if (xdif>0){
              
                if(this.facing==="left"){
                    this.body.vel.x = 0;
                }
            }else{
                  
                  if(this.facing==="right"){
                    this.body.vel.x = 0;
                }
            }
            
    },
    
      checkAttack: function(xdif, ydif){
        if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer
                && (Math.abs(ydif) <= 40) &&
                (((xdif > 0) && this.facing === "left") || ((xdif < 0) && this.facing === "right"))
                ) {
            this.lastHit = this.now;
            return true;
        }
            return false;
    },
    
      addAnimation: function(){
            this.renderable.addAnimation("idle", [78]);
            this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 75);
            this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 75);
        },
        
      hitCreep: function(response){
        if (response.b.health <= game.data.playerAttack) {
                //adds 10 gold for a creep kill
                game.data.gold += 10;
                console.log("Current gold: " + game.data.gold);
            }
            response.b.loseHealth(game.data.playerAttack);
    },
    
      loseHealth: function(damage){
            this.health = this.health - damage;
            console.log(this.health);
        }
        
});

