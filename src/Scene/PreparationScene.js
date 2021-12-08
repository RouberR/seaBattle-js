const shipDatas = [
    { size: 4, direction: "row", startX: 15, startY: 345},
    { size: 3, direction: "row", startX: 15, startY: 390},
    { size: 3, direction: "row", startX: 125, startY: 390},
    {size: 2, direction: "row", startX: 15, startY: 435},
    {size: 2, direction: "row", startX: 93, startY: 435},
    {size: 2, direction: "row", startX: 172, startY: 435},
    {size: 1, direction: "row", startX: 15, startY: 480},
    {size: 1, direction: "row", startX: 60, startY: 480},
    {size: 1, direction: "row", startX: 105, startY: 480},
    {size: 1, direction: "row", startX: 150, startY: 480},
]


class PreparationScene extends Scene {
  init() {
      console.log("init")
      const { player } = this.app
      for (const {size, direction, startX, startY} of shipDatas) {
          const ship = new ShipView(size, direction, startX, startY)
          player.addShip(ship)
      }
  }
  start() {
      console.log("start")
  }
  update() {
      console.log("update")
  }
  stop() {
      console.log("stop")
  }
}
