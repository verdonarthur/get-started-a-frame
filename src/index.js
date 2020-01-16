import "aframe";
import "aframe-environment-component";
import "aframe-super-shooter-kit";
import "super-hands";
import "./helper";
import "./components/index";

document.addEventListener("DOMContentLoaded", () => {
  let mainScene = document.querySelector("#mainScene");
  let nbrTargetHit = 0;
  const NBR_TOTAL_TARGET = document.querySelectorAll("a-entity[shootable-box]")
    .length;
  const SCORE_TEXT_ELEMENT = document.querySelector("#scoreText");

  SCORE_TEXT_ELEMENT.setAttribute(
    "text",
    "value",
    `HIT ${0}/${NBR_TOTAL_TARGET}`
  );

  mainScene.addEventListener("hit-on-target", () => {
    SCORE_TEXT_ELEMENT.setAttribute(
      "text",
      "value",
      `HIT ${++nbrTargetHit}/${NBR_TOTAL_TARGET}`
    );

    if (nbrTargetHit >= NBR_TOTAL_TARGET) {
      nbrTargetHit = 0;
      mainScene.emit("reset-scene");
    }
  });

  mainScene.addEventListener("reset-scene", () => {
    SCORE_TEXT_ELEMENT.setAttribute(
      "text",
      "value",
      `HIT ${nbrTargetHit}/${NBR_TOTAL_TARGET}`
    );

    document
      .querySelectorAll("a-entity[shootable-box]")
      .forEach(shootableBox => {
        shootableBox.object3D.visible = true;
        shootableBox.setAttribute("target", "active", true);
        shootableBox.setAttribute("target", "healthPoints", 1);
      });
  });
});
