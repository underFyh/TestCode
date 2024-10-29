<script setup>
// 1. 创建场景
const Scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(200);
Scene.add(axesHelper)

const width = 800;
const height = 500;
const Camera = new THREE.PerspectiveCamera(50, width/height, 1, 1000);
Camera.position.set(200, 200, 200);
Camera.lookAt(0,0,0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);
renderer.render(Scene, Camera);
document.body.appendChild(renderer.domElement);


</script>

<template>
<p>01.3D坐标</p>
</template>
