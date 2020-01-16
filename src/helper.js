export const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

AFRAME.registerComponent("bind-rotation", {
  schema: { targetId: { type: "string" } },
  init: function init() {
    this.target = document.getElementById(this.data.targetId);
  },
  tick: function tick() {
    this.el.setAttribute("rotation", this.target.getAttribute("rotation"));
  }
});
