/*
 * *****
 * WRITTEN BY ANGELO K. CAVALLET, 2014.
 * angelocavallet@gmail.com
 * https://github.com/angelocavallet
 * ***** 
 */
(function (window) {
        
	function Bullet(weapon, gunner) {
		this.init(weapon, gunner);
	}

	var proto = Bullet.prototype = new createjs.Container();

        // public
	proto.RANGE = 40;
        proto.CALIBRE = 9;
        proto.TIPO = 'bullet';
        
        proto.bulletShape;
        proto.body;
	proto.x;
	proto.y;
        proto.rotation;
        proto.stage;
        proto.world;
        
        
        //Método para destruir o objeto
        proto.destroy = function(){
            this.setStage(null);
            this.body.SetUserData(null);
            this.world.DestroyBody(this.body);
            
            for(var i=0; i< BULLETS.length; i++){
                if(BULLETS[i] === this){
                    BULLETS.splice(i,1);
                    break;
                }
            }
        }


        // SETTERS        
        proto.setStage = function(stage){
            if(this.stage)
                this.stage.removeChild(this);
            
            if(stage)
                stage.addChild(this);   
            
            this.stage = stage;
        };

        proto.Container_initialize = proto.initialize;	//mudando o nome do metodo de inicio do container easel para nao entrar em conflito
        
        /**
         * Inicia um objeto de projetil na tela
         */
	proto.init = function (weapon, gunner) {  
		this.Container_initialize();
                
                this.rotation = gunner.getRotation();
                this.x = gunner.x + (Math.cos(gunner.body.GetAngle()) * (gunner.body.userData.raio +20));
                this.y = gunner.y + (Math.sin(gunner.body.GetAngle()) * (gunner.body.userData.raio +20));
                
                this.world = gunner.world;
                this.setStage(gunner.getStage());
                
                
                this.bulletShape = new createjs.Shape();
                this.bulletShape.graphics.beginFill("#000000")
                          .drawRect(0, 0, 5, 5);
                this.bulletShape.regX = 2;
                this.bulletShape.regY = 2;
		this.addChild(this.bulletShape);
                
                
                this.body = createBox(
                        2,
                        2,
                        2,
                        b2Body.b2_dynamicBody,
                        this.world,
                        this.x,
                        this.y,
                        true);
                
                this.body.ResetMassData();  
                
                this.body.SetUserData(this);
                
                var velBala = new b2Vec2(
                        Math.cos(gunner.body.GetAngle()) * proto.CALIBRE, 
                        Math.sin(gunner.body.GetAngle()) * proto.CALIBRE 
                );
                this.body.ApplyImpulse(velBala, this.body.GetWorldCenter()); 
                this.body.SetLinearDamping((proto.CALIBRE)* (proto.RANGE/100));
                
	};
        
	proto.tick = function (event) {
            
            var velocidade = this.body.GetLinearVelocity();
            if(Math.floor(Math.abs(velocidade.x)) == 0 && Math.floor(Math.abs(velocidade.y)) == 0){
                this.destroy();
            }
                
            this.x = this.body.GetWorldCenter().x * SCALE;
            this.y = this.body.GetWorldCenter().y * SCALE;
            this.rotation = this.body.GetAngle() * (180 / Math.PI);            

	};
        
	window.Bullet = Bullet;

}(window));