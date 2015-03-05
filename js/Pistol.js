/*
 * *****
 * WRITTEN BY ANGELO K. CAVALLET, 2014.
 * angelocavallet@gmail.com
 * https://github.com/angelocavallet
 * ***** 
 */
(function (window) {
        
	function Pistol() {
		this.init();
	}

	var proto = Pistol.prototype = new createjs.Container();

        // public
	proto.RANGE = 5;
        proto.CAPACITY = 12;
        proto.MUNITION = 50;
        proto.FIRE_INTERVAL = 6;
        proto.FIRING = false;
        
        //Pre-Loading image 
        proto.usingWeaponSkin = new Image();
        proto.usingWeaponSkin.src = IMG_PATH + "pistol-using.png";

        proto.firingWeaponSkin = new Image();
        proto.firingWeaponSkin.src = IMG_PATH + "fire.png";        


	proto.pistolBody;
        proto.gunner;
        proto.spriteSheetFire;
        proto.spriteFire;
        
        //SETTERS
        proto.setGunner = function(gunner){
            if(this.gunner)
                this.gunner.removeChild(this);
            
            if(gunner)
                gunner.addChild(this);   
            
            this.gunner = gunner;
        };
        
        // GETTERS
        proto.getGunner = function(){
            return this.gunner;
        };
        
        
        proto.fire = function(){
            this.FIRING = true;
            this.spriteFire.gotoAndPlay("shoot");
            
            BULLETS.push(new Bullet(this, this.getGunner(), BULLETS.length));
            
        };
        
        
        proto.Container_initialize = proto.initialize;	//unique to avoid overiding base class

        /**
         * Inicia um objeto pistola na tela
         */
	proto.init = function () {  
		this.Container_initialize();
                
                
		this.pistolBody = new createjs.Bitmap(this.usingWeaponSkin);
                this.pistolBody.regX = 50;
                this.pistolBody.regY = -325;
                this.pistolBody.name = "pistolBody";
                this.pistolBody.scaleY = this.pistolBody.scaleX = 0.1;

		this.addChild(this.pistolBody);
                
                
                this.spriteSheetFire = new createjs.SpriteSheet({
                            "images": [this.firingWeaponSkin],
                            "frames": {"regX": 0, "height": 128, "count": 19, "regY": 0, "width": 50},
                            "animations": {"idle": [19],"shoot": [0, 18, "idle", 1.4]}
                    });
                this.spriteFire = new createjs.Sprite(this.spriteSheetFire, "idle");
                this.spriteFire.setTransform(13, 115, 0.5, 0.5, 180);
                this.addChild(this.spriteFire);
                
	};
        
	window.Pistol = Pistol;

}(window));