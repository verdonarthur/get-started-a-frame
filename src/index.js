import "aframe";
import "aframe-environment-component";
import "aframe-super-shooter-kit";
import "./helper";

AFRAME.registerComponent("click-to-shoot", {
  init: function() {
    document.body.addEventListener("triggerdown", () => {
      this.el.emit("shoot");
    });

    document.body.addEventListener("click", () => {
      this.el.emit("shoot");
    });

    document.body.addEventListener("shoot", evt => {
      let BulletContainer = document.querySelector(
        "#superShooterBulletContainer"
      );

      let activeBullet =
        BulletContainer.object3D.children[
          BulletContainer.object3D.children.length - 1
        ];
      let camera = document.querySelector("#camera");
      let bow = document.querySelector("#playerBow");
      bow.object3D.getWorldPosition(activeBullet.position);
      camera.object3D.getWorldQuaternion(activeBullet.rotation);

      activeBullet.rotateX(Math.PI);
      activeBullet.translateY(-0.5);
    });
  }
});

AFRAME.registerComponent("shootable-box", {
  dependencies: ["material"],
  init: function() {
    let ele = this.el;

    ele.setAttribute("gltf-model", "#targetModel");

    ele.addEventListener("hit", evt => {
      ele.sceneEl.emit("hit-on-target");
    });

    ele.addEventListener("die", evt => {
      ele.object3D.visible = false;
      ele.setAttribute("target", "active", false);
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
    shootablebox.setAttribute("rotation", "0 180 0");
    console.log("coucou")
  }
};

document.addEventListener("DOMContentLoaded", () => {
  let mainScene = document.querySelector("#mainScene");
  let nbrTargetHit = 0;

  mainScene.addEventListener("hit-on-target", () => {
    document
      .querySelector("#scoreText")
      .setAttribute("text", "value", `HIT ${++nbrTargetHit}/5`);

    if (nbrTargetHit >= 5) {
      nbrTargetHit = 0;
      mainScene.emit("reset-scene");
    }
  });

  mainScene.addEventListener("reset-scene", () => {
    document
      .querySelector("#scoreText")
      .setAttribute("text", "value", `HIT ${nbrTargetHit}/5`);

    document
      .querySelectorAll("a-entity[shootable-box]")
      .forEach(shootableBox => {
        shootableBox.object3D.visible = true;
        shootableBox.setAttribute("target", "active", true);
        shootableBox.setAttribute("target", "healthPoints", 1);
      });
  });

  generateWallToShoot(mainScene);
});
