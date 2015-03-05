/*
 * *****
 * WRITTEN BY ANGELO K. CAVALLET, 2014.
 * angelocavallet@gmail.com
 * https://github.com/angelocavallet
 * ***** 
 */
(function (window) {
        
	function Gunner(x, y, world) {
		this.init(x, y, world);
	}

	var proto = Gunner.prototype = new createjs.Container();

        // public
	proto.VEL_MAX = 300;
        proto.TIPO = 'gunner';
        
        //Pre-Loading image 
        proto.upperSkin = new Image();
        proto.upperSkin.src = IMG_PATH + "gunner.png";


	proto.playerBody;
	proto.x;
	proto.y;
        proto.keys;
        proto.stage;
        proto.world;
        proto.body;
        proto.weapon;
                
                
        // SETTERS
        proto.setRotation = function(rotation){
            var rad = (rotation + 90) * (Math.PI / 180);
            this.body.SetPositionAndAngle( this.body.GetPosition(), rad );        
            this.rotation = rotation;
        };
        
        proto.setStage = function(stage){
            if(this.stage)
                this.stage.removeChild(this);
            
            if(stage)
                stage.addChild(this);   
            
            this.stage = stage;
        };
        
        // GETTERS
        proto.getRotation = function(){
            return this.rotation;
        };
        
        proto.getStage = function(){
            return this.stage;
        };
        
        
        //Método para destruir o objeto
        proto.destroy = function(){
            this.setStage(null);
            this.body.SetUserData(null);
            this.world.DestroyBody(this.body);
        }
        
        proto.Container_initialize = proto.initialize;	//unique to avoid overiding base class

        /**
         * Inicia um objeto player na tela
         */
	proto.init = function (x, y, world) {
                this.world = world;
                this.x = x;
                this.y = y;
                
		this.Container_initialize();
                
                this.keys = new Keyboard(window);
                this.keys.bind();
                
                this.click = new Mouse(window);
                this.click.bind();
                
                
		this.upperBody = new createjs.Bitmap(this.upperSkin);
                this.upperBody.regX = 190;//175;
                this.upperBody.regY = 90;//80;
                this.upperBody.name = "playerUpperBody";
                this.upperBody.scaleY = this.upperBody.scaleX = 0.2;
		this.addChild(this.upperBody);
                
                
                this.body = createCircle(
                        40,
                        2,
                        0.1,
                        b2Body.b2_dynamicBody,
                        this.world,
                        this.x,
                        this.y);
                
                this.body.ResetMassData();
                
                this.body.SetUserData(this);
                
                this.weapon = new Pistol();
                this.weapon.setGunner(this);
	};
        
	proto.tick = function (event) {
            
//            killLinearVelocity(this.body);
            
            var pX = this.x;
            var pY = this.y;
            
            var mX = this.getStage().mouseX;
            var mY = this.getStage().mouseY;
            
            this.x = this.body.GetWorldCenter().x * SCALE;
            this.y = this.body.GetWorldCenter().y * SCALE;
                
            this.setRotation(getAngMira(pX, pY, mX, mY)); 
                            
            if(this.keys.up){
                this.body.ApplyForce(new b2Vec2(0, -(this.VEL_MAX)),
                                            this.body.GetWorldCenter()); 
            }
            if(this.keys.left){
                this.body.ApplyForce(new b2Vec2(-(this.VEL_MAX), 0),
                                            this.body.GetWorldCenter()); 
            }
            if(this.keys.right){
                this.body.ApplyForce(new b2Vec2((this.VEL_MAX), 0),
                                            this.body.GetWorldCenter()); 
            }
            if(this.keys.down){
                this.body.ApplyForce(new b2Vec2(0, (this.VEL_MAX)),
                                            this.body.GetWorldCenter()); 
            }
            
            
            if(this.click.left){
                if(!this.weapon.FIRING){
                    this.weapon.fire();
                }
            }else{
                this.weapon.FIRING = false;
            }
	};

	window.Gunner = Gunner;

}(window));