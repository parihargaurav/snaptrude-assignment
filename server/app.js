// Wait for the document to be loaded before initializing Babylon.js
document.addEventListener("DOMContentLoaded", function () {
  // Get the canvas element from the DOM
  var canvas = document.getElementById("renderCanvas");

  // Create the Babylon.js engine
  var engine = new BABYLON.Engine(canvas, true);

  // Create the scene
  var scene = new BABYLON.Scene(engine);

  // Create the camera
  var camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2,
    5,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  camera.attachControl(canvas, true);

  // Create a light
  var light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  // Create a cube
  var cube = BABYLON.MeshBuilder.CreateBox("cube", { size: 1 }, scene);

  // Enable mesh picking
  scene.onPointerDown = function (_evt, pickResult) {
    if (pickResult.hit && pickResult.pickedMesh === cube) {
      // Extrude the cube by scaling along the Y-axis
      cube.scaling.y += 0.1;
    }
  };

  // Run the render loop
  engine.runRenderLoop(function () {
    scene.render();
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    engine.resize();
  });
});
