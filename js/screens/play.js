game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
                me.levelDirector.loadLevel("level01");
                
                 var player = me.pool.pull("player", 0, 420, {});
                 me.game.world.addChild(player, 6);
                 
                 var gamemanager = me.pool.pull("GameManager", 0, 0, {});
                 me.game.world.addChild(gamemanager, 0);
                 
                 me.input.bindKey(me.input.KEY.RIGHT, "right");
                 //makes character go to the right\\
                 me.input.bindKey(me.input.KEY.LEFT, 'left');
                //makes the character go to the left ^\\
                me.input.bindKey(me.input.KEY.UP, 'jump');
                //makes the character jump up ^\\
                me.input.bindKey(me.input.KEY.Z, 'attack');
                
                me.input.bindKey(me.input.KEY.D, "right");
                 //makes character go to the right\\
                 me.input.bindKey(me.input.KEY.A, 'left');
                //makes the character go to the left ^\\
                me.input.bindKey(me.input.KEY.W, 'jump');
                //makes the character jump up ^\\
                me.input.bindKey(me.input.KEY.L, 'attack');
                 
		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
});
