game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); 
                    
               
               me.game.world.addChild(new (me.Renderable.extend({
                   init: function(){
                       this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                       this.font = new me.Font("Arial", 46, "white");
                   },
                   
                   draw: function(renderer){
                       this.font.draw(renderer.getContext(), "#~Aw-sean-auts~#", 350, 130);
                       this.font.draw(renderer.getContext(), "Spend Exp", 440, 280);
                       this.font.draw(renderer.getContext(), "Current Exp: " + game.data.exp.toString(), 12, 10);
                       this.font.draw(renderer.getContext(), "F5 To Skip", 830, 10);
                       this.font.draw(renderer.getContext(), "F2: Add Starting Gold", 830, 260);
                       this.font.draw(renderer.getContext(), "F1: Increase Gold", 10, 130);
                       this.font.draw(renderer.getContext(), "F3: Increase Damage", 10, 430);
                       this.font.draw(renderer.getContext(), "F4: Increase Speed ", 830, 530);
                   }
                   
                
               })));
            
               
                
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		
	}
});


