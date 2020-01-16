
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
  
        let bow = document.querySelector("#playerBow");
        bow.object3D.getWorldPosition(activeBullet.position);
        // bow.object3D.getWorldDirection(activeBullet.direction)
        bow.object3D.getWorldQuaternion(activeBullet.rotation);
  
         activeBullet.rotateY(Math.PI/2);
        
        activeBullet.translateY(0.4);
      });
    }
  });
  