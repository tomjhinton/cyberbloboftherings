const THREE = require('three')
const { Tween, Easing, autoPlay } = require('es6-tween')

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
//import  {OrbitControls} from 'three/examples/js/controls/OrbitControls.js'
import {noise} from 'perlin'

import './style.css'

let model


var raycaster = new THREE.Raycaster()
var mouse = new THREE.Vector2()


function onMouseMove( event ) {

  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1

}

import Tone from 'tone'

const synthA =  new Tone.AMSynth().toMaster()

synthA.attackCurve =  0.01

const notes = ['E4','F4','G4','A4','D4','E3','F3','G3','A3','D3']

const notesHigh = ['E5','F5','G5','A5','D5','E6','F6','G6','A6','D6']

const notesLow = ['E2','F2','G2','A2','D2','E3','F3','G3','A3','D3']

var synthC = new Tone.DuoSynth().toMaster()
synthC.attackCurve =  1.1

var synthB = new Tone.DuoSynth().toMaster()
synthB.attackCurve =  0.1

var freeverb = new Tone.Freeverb().toMaster()
freeverb.dampening.value = 25
freeverb.roomSize.value = 1.2
synthC.connect(freeverb)




var pattern = new Tone.Pattern(function(time, note){
  synthC.triggerAttackRelease(note, 0.03)
}, notes, 'random')


var pattern2 = new Tone.Pattern(function(time, note){
  synthB.triggerAttackRelease(note, 0.01)
}, notesLow, 'random')

pattern.start(0)
pattern2.start(0)

Tone.Transport.start()

const loader = new GLTFLoader()
// loader.load(
// 	// resource URL
// 	'ship2.gltf',
// 	// called when the resource is loaded
// 	function ( gltf ) {
//     model = gltf.scene
// 		scene.add( gltf.scene )
//
//     gltf.animations // Array<THREE.AnimationClip>
//     gltf.scene // THREE.Scene
//     gltf.scenes // Array<THREE.Scene>
//     gltf.cameras // Array<THREE.Camera>
//     gltf.asset // Object
//     gltf.scene.scale.set(0.01,0.01,0.01)
//     console.log(gltf.scene.children[0])
//   },
//   // called while loading is progressing
// 	function ( xhr ) {
//
// 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
//
// 	},
// 	// called when loading has errors
// 	function ( error ) {
//
// 		console.log( 'An error happened' )
//
// 	}
// )
//

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


const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 3000 )
camera.position.z = 30


let  score = 0
let highScore= window.localStorage.getItem('highScore')
document.getElementById('score').innerHTML =  score
document.getElementById('highscore').innerHTML = 'HS: ' + highScore


const material = new THREE.MeshPhongMaterial( { color: 0x000FF0, specular: 0xf22fff , shininess: 100, side: THREE.DoubleSide } )

const material2 = new THREE.MeshPhongMaterial( { color: 0xffff00, specular: 0xf22fff , shininess: 100, side: THREE.DoubleSide } )

const geometry = new THREE.BoxGeometry( 3, 3, 3,40,60,40,60 )

const cube = new THREE.Mesh(geometry, material)

scene.add(cube)

var starsGeometry = new THREE.Geometry()

for ( var i = 0; i < 10000; i ++ ) {

  const star = new THREE.Vector3()
  star.x = THREE.Math.randFloatSpread( 200 )
  star.y = THREE.Math.randFloatSpread( 200 )
  star.z = THREE.Math.randFloatSpread( 20000 )

  starsGeometry.vertices.push( star )

}



var starsMaterial = new THREE.PointsMaterial( { color: 0x888888 } )

var starField = new THREE.Points( starsGeometry, starsMaterial )

scene.add( starField )

const geometryG = new THREE.Geometry(),
  geometryG2 = new THREE.Geometry(),
  materialG = new THREE.LineBasicMaterial({
    color: 'green'
  }),
  materialG2 = new THREE.LineBasicMaterial({
    color: 'cyan'
  })



const size = 4000,
  size2  = 5000,
  steps = 40,
  steps2 = 60

for (let i = -size; i <= size; i += steps) {
  //draw lines one way
  geometryG.vertices.push(new THREE.Vector3(-size, -0.04, i))
  geometryG.vertices.push(new THREE.Vector3(size, -0.04, i))

  //draw lines the other way
  geometryG.vertices.push(new THREE.Vector3(i, -0.04, -size))
  geometryG.vertices.push(new THREE.Vector3(i, -0.04, size))
}

for (let j = -size; j <= size; j += steps2) {
  //draw lines one way
  geometryG2.vertices.push(new THREE.Vector3(-size2, -0.04, j))
  geometryG2.vertices.push(new THREE.Vector3(size2, -0.04, j))

  //draw lines the other way
  geometryG2.vertices.push(new THREE.Vector3(j, -0.04, -size2))
  geometryG2.vertices.push(new THREE.Vector3(j, -0.04, size2))
}

const line = new THREE.Line(geometryG, materialG, THREE.LinePieces)
const line2 = new THREE.Line(geometryG2, materialG2, THREE.LinePieces)

line.position.y = - 200
line2.position.y = + 220




scene.add(line, line2)

const lightA = new THREE.AmbientLight( 0x404040 ) // soft white light
scene.add( lightA )

const geometry2 = new THREE.TorusGeometry( 10, 3, 16, 100 )
const torus = new THREE.Mesh( geometry2, material2 )
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
    cube.position.y -= 0.4
    camera.position.y -= 0.4


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
    cube.position.x -= 0.4
    camera.position.x -= 0.4

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
    cube.position.x += 0.4
    camera.position.x += 0.4


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
    speed = 0.5
    if(score > highScore){
      highScore = score
      window.localStorage.setItem('highScore', `${highScore}`)
    }
    document.getElementById('highscore').innerHTML = 'HS: ' + highScore


    score = 0
    document.getElementById('over').innerHTML = ''


  }
}

console.log(model)
const posChange = [10,-10,5,-5,8,-8]

camera.position.z = 30


cube.geometry.computeVertexNormals()
cube.geometry.normalsNeedUpdate = true
cube.geometry.verticesNeedUpdate = true

let speed = 0.5

var update = function() {


  raycaster.setFromCamera( mouse, camera )

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( scene.children )

	// for ( var i = 0; i < intersects.length; i++ ) {
	//
	// 	intersects[ i ].object.material.color.set( 0xff0000 )
	//
//	}


  cube.position.x = mouse.x *100
  cube.position.y = mouse.y  *100
  camera.position.x = mouse.x *100
  camera.position.y = mouse.y  *100


  if(model !== undefined){
    model.translateZ( -0.1 )
    model.rotateY( -0.1 )

  }

  cube.position.z -=  speed
  cube.rotation.x -= 0.02
  cube.rotation.y -= 0.02
  cube.rotation.z -= 0.02
  line.rotation.y -= 0.002
  line2.rotation.y += 0.002


  if(cube.position.z < torus.position.z -10 && cube.position.x <= torus.position.x+5 && cube.position.x >= torus.position.x-5 && cube.position.y <= torus.position.y+5 && cube.position.y >= torus.position.y-5){

    score += 10
    speed+=0.05
    torus.position.z -=  85

    torus.position.x +=  posChange[Math.floor(Math.random()*5)]
    torus.position.y +=  posChange[Math.floor(Math.random()*5)]

    synthA.triggerAttackRelease(notesLow[Math.floor(Math.random()*9)],1)

  }

  if(cube.position.z < torus.position.z -20){
    document.getElementById('over').innerHTML = 'GAME OVER'
  }

  var time = performance.now() * 0.005
  var k = 2
  for (var i = 0; i < cube.geometry.vertices.length; i++) {
    var p = cube.geometry.vertices[i]
    p.normalize().multiplyScalar(1 + 0.4 * noise.perlin3(p.x * k + time, p.y * k, p.z * k))
  }

  cube.geometry.computeVertexNormals()
  cube.geometry.normalsNeedUpdate = true
  cube.geometry.verticesNeedUpdate = true


  camera.position.z -= speed

  document.getElementById('score').innerHTML = score
}

function animate() {

  update()

  /* render scene and camera */
  renderer.render(scene,camera)
  requestAnimationFrame(animate)
}

window.addEventListener( 'mousemove', onMouseMove, false )

requestAnimationFrame(animate)
