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



var material2 = new THREE.MeshBasicMaterial( { color: 0x00FF00 } );



const material = new THREE.MeshPhongMaterial( { color: 0x000FF0, specular: 0xf22fff , shininess: 100, side: THREE.DoubleSide } )

const geometry = new THREE.BoxGeometry( 5, 5, 5 )

const cube = new THREE.Mesh(geometry, material)

const cube2 = new THREE.Mesh(geometry, material)

scene.add(cube)



  document.onkeydown = checkKey

  function checkKey(e) {

  e = e || window.event
  console.log('a')
    if (e.keyCode == '38') {
    // up arrow
      console.log(cube.position.x)
      cube.position.y += 1
    }
    else if (e.keyCode == '40') {
      // down arrow
      cube.position.y -= 1
    } else if (e.keyCode == '37') {
      // left arrow
      cube.position.x -= 1
    }
    else if (e.keyCode == '39') {
      // right arrow
      cube.position.x += 1
    }
    update()
  }




  cube.geometry.computeVertexNormals()
  cube.geometry.normalsNeedUpdate = true
  cube.geometry.verticesNeedUpdate = true


var update = function() {



}

function animate() {



  update()
  /* render scene and camera */
  renderer.render(scene,camera)
  requestAnimationFrame(animate)
}


requestAnimationFrame(animate)
