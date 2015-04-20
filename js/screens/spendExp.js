game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); 
                    
                    me.input.bindKey(me.input.KEY.F1, "F1");
                    me.input.bindKey(me.input.KEY.F2, "F2");
                    me.input.bindKey(me.input.KEY.F3, "F3");
                    me.input.bindKey(me.input.KEY.F4, "F4");
                    me.input.bindKey(me.input.KEY.F5, "F5");
                    var exp1cost = (game.data.exp1 + 1 * 600);
               
               me.game.world.addChild(new (me.Renderable.extend({
                   init: function(){
                       this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                       this.font = new me.Font("Arial", 46, "white");
                       this.font = new me.Font("Arial", 46, "yellow");
                   },
                   
                   draw: function(renderer){
                       this.font.draw(renderer.getContext(), "#~Aw-sean-auts~#", 350, 190);
                       this.font.draw(renderer.getContext(), "Spend Exp", 440, 10);
                       this.font.draw(renderer.getContext(), "Current Exp: " + game.data.exp.toString(), 12, 10);
                       this.font.draw(renderer.getContext(), "F5 To Skip",830, 10);
                       this.font.draw(renderer.getContext(), "F2: Add Gold: " + ((game.data.exp1 + 1 * 200)), 690, 260);
                       this.font.draw(renderer.getContext(), "F1: Increase Gold: " + (exp1cost), 10, 130 );
                       this.font.draw(renderer.getContext(), "F3: Increase Damage: " + ((game.data.exp1 + 1 * 600)), 10, 430);
                       this.font.draw(renderer.getContext(), "F4: Speed: " + ((game.data.exp1 + 1 * 400)), 750, 530);
                   }
                   
                
               })));
            
               this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){
                   if(action === "F1"){
                      if(game.data.exp >= exp1cost){
                          game.data.exp1 += 1;
                          game.data.exp -= exp1cost;
                          me.state.change(me.state.PLAY);
                      }else{
                          console.log("not enough exp")
                      }
                   }else if(action === "F2"){
                       
                   }else if(action === "F3"){
                       
                   }else if(action === "F4"){
                       
                   }else if(action === "F5"){
                       me.state.change(me.state.PLAY);
                   }
               });
                
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		    me.input.unbindKey(me.input.KEY.F1, "F1");
                    me.input.unbindKey(me.input.KEY.F2, "F2");
                    me.input.unbindKey(me.input.KEY.F3, "F3");
                    me.input.unbindKey(me.input.KEY.F4, "F4");
                    me.input.unbindKey(me.input.KEY.F5, "F5");
                    me.event.unsubscribe(this.handler);
	}
});


