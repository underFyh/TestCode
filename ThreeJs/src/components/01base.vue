<script setup>
// 1. 创建场景
const Scene = new THREE.Scene();

// 1.1 创建物体
const box = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
})
const meshBox = new THREE.Mesh(box, material);
meshBox.position.set(0,0,0);
Scene.add(meshBox);

// 2. 创建相机
const width = 800;
const height = 500;
const Camera = new THREE.PerspectiveCamera(50, width/height, 1, 1000);
Camera.position.set(200, 200, 200);
// Camera.lookAt(0,0,0);
Camera.lookAt(meshBox.position);


// 3. 渲染
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.render(Scene, Camera);
document.body.appendChild(renderer.domElement);


</script>

<template>
<p>01.基础</p>
</template>
