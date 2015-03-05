/*
 * *****
 * WRITTEN BY ANGELO K. CAVALLET, 2014.
 * angelocavallet@gmail.com
 * https://github.com/angelocavallet
 * ***** 
 * 
 * Calcula o angulo de mira entre objeto principal (a) e alvo (b)
 * 
 * @param {Int} aX Ponto X do objeto principal
 * @param {Int} aY Ponto Y do objeto principal
 * @param {Int} bX Ponto X do alvo
 * @param {Int} bY Ponto Y do alvo
 * 
 * @returns {Int} Angulo da mira
 */
function getAngMira(aX, aY, bX, bY){
    
    var catOp = 0,
        catAd = 0,
       angAux = 0,
       cX     = 0,
       cY     = 0;    
    
    if(bX > aX){
        if(bY > aY){            //triangulo invertido
            angAux = 270;
            cX = bX;
            cY = aY;
            catOp = (bY - cY);
            catAd = (cX - aX);
        }else{
            angAux = 180;
            cX = aX;
            cY = bY;
            catOp = (bX - aX);
            catAd = (aY - bY);
        }
    }else{
        if(bY > aY){ 
            angAux = 0;
            cX = aX;
            cY = bY;
            catOp = (aX - bX);
            catAd = (bY - aY);
        }else{                  //triangulo invertido
            angAux = 90;
            cX = bX;
            cY = aY;
            catOp = (cY - bY);
            catAd = (aX - cX);
        }
    }

    var tangx = catOp / catAd;
    var atanx = Math.atan(tangx);        // resultado em radianos
    var anglex = atanx * 180 / Math.PI;  // converte em graus
    
    return anglex+angAux;                //ajsuta o angulo da mira
}


function createWorld(){
    
    var world = new b2World(new b2Vec2(0, 0), true);

    var fixDef = new b2FixtureDef;
    fixDef.density = 10.0;
    fixDef.friction = 0.1;
    fixDef.restitution = 0;

    var bodyDef = new b2BodyDef;

    //create ground
    bodyDef.type = b2Body.b2_staticBody;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(20, 2);
    bodyDef.position.Set(10, 400 / 30 + 1.8);
    world.CreateBody(bodyDef).CreateFixture(fixDef);
    bodyDef.position.Set(10, -1.8);
    world.CreateBody(bodyDef).CreateFixture(fixDef);
    fixDef.shape.SetAsBox(2, 14);
    bodyDef.position.Set(-1.8, 13);
    world.CreateBody(bodyDef).CreateFixture(fixDef);
    bodyDef.position.Set(21.8, 13);
    world.CreateBody(bodyDef).CreateFixture(fixDef);


    //setup debug draw
    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(document.getElementById("debugCanvas").getContext("2d"));
    debugDraw.SetDrawScale(SCALE);
    debugDraw.SetFillAlpha(0.5);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw); 
    

    return world;
}


function createCircle(radius, density, friction, type, world, x, y){
    
    var fixDef = new b2FixtureDef;
    fixDef.density = density;
    fixDef.friction = friction;
    fixDef.restitution = 0;
    fixDef.shape = new b2CircleShape(radius / SCALE);
    
    var bodyDef = new b2BodyDef;
    bodyDef.type = type;
    bodyDef.position.x = x / SCALE;
    bodyDef.position.y = y / SCALE;
    
    var circulo = world.CreateBody(bodyDef);
    circulo.CreateFixture(fixDef);
    
    circulo.SetLinearDamping(4.0);
    circulo.SetAngularDamping(6.0);
    
    circulo.userData = {
        raio: radius
    };
    
    return circulo;
    
}




function createBox(width, height, density, type, world, x, y, isBullet){
    
    var fixDef = new b2FixtureDef;
    fixDef.density = density;
    fixDef.friction = 0.1;
    fixDef.restitution = 0;
    fixDef.shape = new b2PolygonShape;
    
    var bodyDef = new b2BodyDef;
    fixDef.shape.SetAsBox(width / SCALE, height / SCALE);
    bodyDef.type = type;
    bodyDef.bullet = isBullet ? true : false;
    bodyDef.position.x = x / SCALE;
    bodyDef.position.y = y / SCALE;
    
    var retangulo = world.CreateBody(bodyDef);
    retangulo.CreateFixture(fixDef);    
    
    if(isBullet){
        retangulo.SetLinearDamping(0.2);
        retangulo.SetAngularDamping(10.0);
    }else{
        retangulo.SetLinearDamping(4.0);
        retangulo.SetAngularDamping(6.0);  
    }

    
    return retangulo;
    
}

function killLinearVelocity(targetBody){
    if(targetBody.GetLinearVelocity().x !== 0 || targetBody.GetLinearVelocity().y !== 0)
        targetBody.SetLinearVelocity(new b2Vec2(0,0));
}