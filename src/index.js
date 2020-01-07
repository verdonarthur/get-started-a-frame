import "aframe";
import "aframe-super-shooter-kit";
import "./helper";
import { getRandomColor } from "./helper";

AFRAME.registerComponent("click-to-shoot", {
  init: function() {
    document.body.addEventListener("mousedown", () => {
      console.log("asd");
      this.el.emit("shoot");
    });
  }
});

AFRAME.registerComponent("shootable-box", {
  dependencies: ["material"],
  init: function() {
    let ele = this.el;
    let color = new THREE.Color();
    ele.setAttribute("width", 1);
    ele.setAttribute("heigth", 1);
    ele.setAttribute("depth", 1);
    ele.setAttribute("geometry", { primitive: "sphere" });

    ele.setAttribute("color", "#333333");

    ele.addEventListener("hit", evt => {
      console.log("Touche");
    });

    ele.addEventListener("die", evt => {
      ele.object3D.visible = false;
      ele.setAttribute("target", { active: false });
    });
  }
});

AFRAME.registerComponent("ground-box", {
  init: function() {
    this.el.setAttribute("width", 1);
    this.el.setAttribute("heigth", 1);
    this.el.setAttribute("depth", 1);

    this.el.setAttribute("color", getRandomColor());
  }
});

const generateGround = scene => {
  for (let i = 1; i <= 30; i++) {
    for (let j = 1; j <= 30; j++) {
      let groundbox = document.createElement("a-box");
      groundbox.setAttribute("ground-box", {});
      groundbox.setAttribute("position", `${15 - i} -1 ${15 - j}`);
      scene.appendChild(groundbox);
    }
  }
};

const generateWallToShoot = scene => {
  let j = 0,
    k = 0;

  for (let i = 1; i <= 25; i++) {
    let shootablebox = document.createElement("a-entity");

    scene.appendChild(shootablebox);
    shootablebox.setAttribute("target", { healthPoints: 1 });
    shootablebox.setAttribute("shootable-box", {});
    shootablebox.setAttribute("position", `${-(-4 + 2 * k)} ${1 + j * 2} -10`);
    k++;
    if (i % 5 == 0) {
      j++;
      k = 0;
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  let mainScene = document.querySelector("#mainScene");

  generateGround(mainScene);
  generateWallToShoot(mainScene);
});
