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
    
        //The screen(viewport) follows this character's position(pos) on both x and y axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
},
        update: function(delta) {
        if (me.input.isKeyPressed("right")) {
            //makes the position of x by adding velocity above 
            //in setVelcoity() & multiplying it by me.timer.tick
            //me.timer.tick makes smooth movements 
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        } else {
            this.body.vel.x = 0;
        }
     //allows the coding to actually to work
      this.body.update(delta);
      return true;
    }
});