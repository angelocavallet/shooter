/*
 * *****
 * WRITTEN BY ANGELO K. CAVALLET, 2014.
 * angelocavallet@gmail.com
 * https://github.com/angelocavallet
 * ***** 
 */
var SCALE = 30, 
    STEP = 30, 
    TIMESTEP = 1/STEP;

var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2AABB = Box2D.Collision.b2AABB,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2World = Box2D.Dynamics.b2World,
    b2MassData = Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
    b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef,
    b2ContactListener = Box2D.Dynamics.b2ContactListener;;
  
var IMG_PATH = 'img/';

var BULLETS = [];
var ZOMBIES = [];
var CEMITERIO = [];