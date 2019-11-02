const THREE = require('three')
const { Tween, Easing, autoPlay } = require('es6-tween')

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
//import  {OrbitControls} from 'three/examples/js/controls/OrbitControls.js'

let model


var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();


function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}




var loader = new GLTFLoader()

loader.load(
	// resource URL
	'ship2.gltf',
	// called when the resource is loaded
	function ( gltf ) {
    model = gltf.scene
		scene.add( gltf.scene )

    gltf.animations // Array<THREE.AnimationClip>
    gltf.scene // THREE.Scene
    gltf.scenes // Array<THREE.Scene>
    gltf.cameras // Array<THREE.Camera>
    gltf.asset // Object
    gltf.scene.scale.set(0.01,0.01,0.01)
    console.log(gltf.scene.children[0])
  },
  // called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' )

	}
)

console.log(model)

const scene = new THREE.Scene()

const light = new THREE.DirectionalLight( 0xffffff )
light.position.set( 40, 25, 10 )
light.castShadow = true
scene.add(light)

console.log(scene.scene)

const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )
//var controls = new OrbitControls( camera, renderer.domElement );


var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 )
camera.position.z = 30


let  score = 0
document.getElementById("score").innerHTML = score


const material = new THREE.MeshPhongMaterial( { color: 0x000FF0, specular: 0xf22fff , shininess: 100, side: THREE.DoubleSide } )

const material2 = new THREE.MeshPhongMaterial( { color: 0xffff00, specular: 0xf22fff , shininess: 100, side: THREE.DoubleSide } )

const geometry = new THREE.BoxGeometry( 3, 3, 3 )

const cube = new THREE.Mesh(geometry, material)

scene.add(cube)




var geometry2 = new THREE.TorusGeometry( 10, 3, 16, 100 )
var torus = new THREE.Mesh( geometry2, material2 )
scene.add( torus )

cube.geometry.computeVertexNormals()
cube.geometry.normalsNeedUpdate = true
cube.geometry.verticesNeedUpdate = true

torus.geometry.computeVertexNormals()
torus.geometry.normalsNeedUpdate = true
torus.geometry.verticesNeedUpdate = true



document.onkeydown = checkKey

autoPlay(true)

function checkKey(e) {
	console.log(mouse.x)
  e = e || window.event
  e.preventDefault()


  if (e.keyCode == '38') {
    // up arrow

		console.log(cube.position.x)
		console.log(mouse.x)
    new Tween(cube)
      .to(
        {
          'position.y': cube.position.y+3

        },
        1000
      )
      .easing(Easing.Elastic.InOut)
      .start()

    new Tween(camera)
      .to(
        {
          'position.y': camera.position.y+3

        },
        1000
      )
      .easing(Easing.Elastic.InOut)
      .start()

  }else if (e.keyCode == '40') {
    // down arrow
    // cube.position.y -= 0.4
    // camera.position.y -= 0.4


    new Tween(cube)
      .to(
        {
          'position.y': cube.position.y-3

        },
        1000
      )
      .easing(Easing.Elastic.InOut)
      .start()

    new Tween(camera)
      .to(
        {
          'position.y': camera.position.y-3

        },
        1000
      )
      .easing(Easing.Elastic.InOut)
      .start()

  } else if (e.keyCode == '37') {
    // left arrow
    // cube.position.x -= 0.4
    // camera.position.x -= 0.4

    new Tween(cube)
      .to(
        {
          'position.x': cube.position.x-3

        },
        1000
      )
      .easing(Easing.Elastic.InOut)
      .start()

    new Tween(camera)
      .to(
        {
          'position.x': camera.position.x-3

        },
        1000
      )
      .easing(Easing.Elastic.InOut)
      .start()

  }else if (e.keyCode == '39') {
    // right arrow
    // cube.position.x += 0.4
    // camera.position.x += 0.4


    new Tween(cube)
      .to(
        {
          'position.x': cube.position.x+3

        },
        1000
      )
      .easing(Easing.Elastic.InOut)
      .start()

    new Tween(camera)
      .to(
        {
          'position.x': camera.position.x+3

        },
        1000
      )
      .easing(Easing.Elastic.InOut)
      .start()
  }else if (e.keyCode == '82') {
    cube.position.x = 0
    cube.position.y = 0
    cube.position.z = 0
    torus.position.z =  -85
    torus.position.x =  0
    torus.position.y =  0
    camera.position.z = 30
    camera.position.x = 0
    camera.position.y = 0

  score = 0
  document.getElementById('over').innerHTML = ''


}
}

console.log(model)
const posChange = [10,-10]

camera.position.z = 30


cube.geometry.computeVertexNormals()
cube.geometry.normalsNeedUpdate = true
cube.geometry.verticesNeedUpdate = true

let speed = 0.5

var update = function() {


  raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( scene.children );

	// for ( var i = 0; i < intersects.length; i++ ) {
	//
	// 	intersects[ i ].object.material.color.set( 0xff0000 );
	//
//	}
	cube.position.x = mouse.x *50
	cube.position.y = mouse.y  *50
	camera.position.x = mouse.x *50
	camera.position.y = mouse.y  *50


	if(model !== undefined){
		model.translateZ( -0.1 )
		model.rotateY( -0.1 )

	}
  cube.position.z -=  speed
  cube.rotation.x -= 0.02
  cube.rotation.y -= 0.02
  cube.rotation.z -= 0.02

  if(cube.position.z < torus.position.z -10 && cube.position.x <= torus.position.x+5 && cube.position.x >= torus.position.x-5 && cube.position.y <= torus.position.y+5 && cube.position.y >= torus.position.y-5){

    score += 10
    speed+=0.005
    torus.position.z -=  85

    torus.position.x +=  posChange[Math.floor(Math.random()*2)]
    torus.position.y +=  posChange[Math.floor(Math.random()*2)]
  }

  if(cube.position.z < torus.position.z -20){
    document.getElementById('over').innerHTML = 'GAME OVER'
  }


  camera.position.z -= speed

  document.getElementById('score').innerHTML = score
}

function animate(time) {

  update()

  /* render scene and camera */
  renderer.render(scene,camera)
  requestAnimationFrame(animate)
}

window.addEventListener( 'mousemove', onMouseMove, false )

requestAnimationFrame(animate)
