AFRAME.registerComponent("shootable-box", {
  dependencies: ["material"],
  init: function() {
    let ele = this.el;

    ele.setAttribute("gltf-model", "#targetModel");

    ele.addEventListener("hit", evt => {
      ele.sceneEl.emit("hit-on-target");
    });

    ele.addEventListener("die", evt => {
      //ele.object3D.visible = false;
      ele.setAttribute("target", "active", false);
    });
  }
});