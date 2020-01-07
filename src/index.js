import "aframe";
import "aframe-environment-component";
import "aframe-super-shooter-kit";
import "./helper";

AFRAME.registerComponent("click-to-shoot", {
  init: function() {
    document.body.addEventListener("mousedown", () => {
      this.el.emit("shoot");
    });
  }
});

AFRAME.registerComponent("shootable-box", {
  dependencies: ["material"],
  init: function() {
    let ele = this.el;

    ele.setAttribute("gltf-model", "#targetModel");
    ele.setAttribute("rotation", "0 180 0");

    ele.addEventListener("hit", evt => {
      console.log("Hit on:", ele);
    });

    ele.addEventListener("die", evt => {
      ele.object3D.visible = false;
      ele.setAttribute("target", { active: false });
    });
  }
});

const generateWallToShoot = scene => {
  for (let i = 1; i <= 5; i++) {
    let shootablebox = document.createElement("a-entity");

    scene.appendChild(shootablebox);
    shootablebox.setAttribute("target", { healthPoints: 1 });
    shootablebox.setAttribute("shootable-box", {});
    shootablebox.setAttribute("position", `${2 * (3 - i)} 0 -5`);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  let mainScene = document.querySelector("#mainScene");

  generateWallToShoot(mainScene);
});
