const THREE = require('three')

const scene = new THREE.Scene()

const light = new THREE.DirectionalLight( 0xffffff )
light.position.set( 40, 25, 10 )
light.castShadow = true
scene.add(light)


const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )


var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 )
camera.position.z = 30


let  score = 0
document.getElementById("score").innerHTML = score


const material = new THREE.MeshPhongMaterial( { color: 0x000FF0, specular: 0xf22fff , shininess: 100, side: THREE.DoubleSide } )

const material2 = new THREE.MeshPhongMaterial( { color: 0xffff00, specular: 0xf22fff , shininess: 100, side: THREE.DoubleSide } )

const geometry = new THREE.BoxGeometry( 5, 5, 5 )

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

  function checkKey(e) {

  e = e || window.event
  e.preventDefault()
  console.log('a')
    if (e.keyCode == '38') {
    // up arrow
      console.log(cube.position.x)
      cube.position.y += 0.1
      camera.position.y += 0.1
    }
    else if (e.keyCode == '40') {
      // down arrow
      cube.position.y -= 0.1
      camera.position.y -= 0.1

    } else if (e.keyCode == '37') {
      // left arrow
      cube.position.x -= 0.1
      camera.position.x -= 0.1

    }
    else if (e.keyCode == '39') {
      // right arrow
      cube.position.x += 0.1
      camera.position.x += 0.1

    }

  }


camera.position.z = 30

   cube.geometry.computeVertexNormals()
   cube.geometry.normalsNeedUpdate = true
   cube.geometry.verticesNeedUpdate = true

let speed = 0.1

var update = function() {

cube.position.z -=  speed
cube.rotation.x -= 0.02;
cube.rotation.y -= 0.02;
cube.rotation.z -= 0.02;

if(cube.position.z < torus.position.z -10){

  score += 10
  torus.position.z -=  45
  torus.position.x -=  9
}

camera.position.z -= speed

document.getElementById("score").innerHTML = score
}

function animate() {



  update()
  /* render scene and camera */
  renderer.render(scene,camera)
  requestAnimationFrame(animate)
}


requestAnimationFrame(animate)
