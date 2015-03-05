/*
 * *****
 * WRITTEN BY ANGELO K. CAVALLET, 2014.
 * angelocavallet@gmail.com
 * https://github.com/angelocavallet
 * ***** 
 */
function start(){

    $('#debug').on('click', function() { $('#debugCanvas').toggle(); }); 

    var stage = new createjs.Stage("canvasShooter");
    stage.enableMouseOver();

    var world = createWorld();


    var debugMsg = new createjs.Text("Movimente o player com (W,A,S,D) e mire com o mouse!", "14px Arial");
    debugMsg.x = debugMsg.y = 10;
    stage.addChild(debugMsg);

    var player = new Gunner(15, 15, world);
    player.setStage(stage);  

    for(var i = 0; i < 5; i++) {
       ZOMBIES[i] = new Zombie(Math.random() * 10, Math.random() * 10, world, i);
       ZOMBIES[i].setStage(stage);
    }


    /*
     * ################################ TICKER ################################
     */
    createjs.Ticker.addEventListener("tick", function(evt) {
        debugMsg.text = "X: "+player.x+
                        "\n\Y: "+player.y+
                        "\n\Angulo: "+player.getRotation()+
                        "\n\Fps: "+createjs.Ticker.getFPS();


        player.tick();

        while(CEMITERIO.length > 0){
            var obj = CEMITERIO.pop();
            obj.destroy();
        }

        for(var i=0; i < ZOMBIES.length; i++){
           ZOMBIES[i].tick();
        }

        for(var i=0; i < BULLETS.length; i++){
            BULLETS[i].tick();
        }

        world.Step(TIMESTEP, 10, 10);
        world.DrawDebugData();
        world.ClearForces();

        stage.update(evt);

    });


    /*
     * ################################ CONTACT LISTENER ################################
     */
    var listener = new b2ContactListener;
    listener.BeginContact = function(contact) {
        var bodyA = contact.GetFixtureA().GetBody()
        var bodyB = contact.GetFixtureB().GetBody()

        var tipoA = bodyA.GetUserData() ? bodyA.GetUserData().TIPO : 'other';
        var tipoB = bodyB.GetUserData() ? bodyB.GetUserData().TIPO : 'other';

        if((tipoA == 'bullet' && tipoB == 'zombie') || (tipoA == 'zombie' &&  tipoB == 'bullet')){
            CEMITERIO.push(bodyA.GetUserData());
            CEMITERIO.push(bodyB.GetUserData());

        }else if(tipoA == 'bullet'){
            CEMITERIO.push(bodyA.GetUserData());
        }else if(tipoB == 'bullet'){
            CEMITERIO.push(bodyB.GetUserData());
        }

    }     


    world.SetContactListener(listener);    
    createjs.Ticker.setFPS(60);
};