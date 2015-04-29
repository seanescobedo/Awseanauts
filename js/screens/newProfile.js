game.NewProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new-screen')), -10); 
                    document.getElementById("input").style.visibility = "visible";   
                     document.getElementById("register").style.visibility = "visible";   
                    
                    me.input.unbindKey(me.input.KEY.B);
                    me.input.unbindKey(me.input.KEY.Z);
                    me.input.unbindKey(me.input.KEY.D);
                    me.input.unbindKey(me.input.KEY.A);
                    me.input.unbindKey(me.input.KEY.W);
                    me.input.unbindKey(me.input.KEY.L);  
               
               me.game.world.addChild(new (me.Renderable.extend({
                   init: function(){
                       this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                       this.font = new me.Font("Arial", 46, "white");
                       this.font = new me.Font("Arial", 46, "yellow");
                   },
                   
                   draw: function(renderer){
                       this.font.draw(renderer.getContext(), "Pick Yo Username & Passwords", 350, 190);
                       
                   }
                   
                
               })));
            
             
                
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	document.getElementById("input").style.visibility = "hidden";   
          document.getElementById("register").style.visibility = "hidden"; 
	}
});


