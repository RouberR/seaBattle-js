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
    draggedShip = null
    draggedOffsetX = 0
    draggedOffsety = 0
  init() {
      const { player } = this.app
      for (const {size, direction, startX, startY} of shipDatas) {
          const ship = new ShipView(size, direction, startX, startY)
          player.addShip(ship)
      }
  }
  start() {
      const { player } = this.app
    player.ships[0].x = 1;
    player.ships[0].y = 1;
      console.log(player.matrix)
     
  }
  update() {
      const { mouse, player} = this.app
    //клик тянем
      if(!this.draggedShip && mouse.left && !mouse.pLeft){
          const ship = player.ships.find((ship) => ship.isUnder(mouse))
     
          if(ship){
              const shipRect = ship.div.getBoundingClientRect()
              this.draggedShip = ship
              this.draggedOffsetX = mouse.x - shipRect.left;
              this.draggedOffsetY = mouse.y - shipRect.top
          }
        } 
        //перетаскивание
        if (mouse.left && this.draggedShip){
            const {left, top} = player.root.getBoundingClientRect()
            const x = mouse.x - left - this.draggedOffsetX
            const y = mouse.y - top - this.draggedOffsetY
            this.draggedShip.div.style.left = `${x}px`
            this.draggedShip.div.style.top = `${y}px`
        }
        //отпускаем
        if(!mouse.left && this.draggedShip){
            const ship = this.draggedShip
            this.draggedShip = null
        }

        //вращение
        if(this.draggedShip && mouse.delta){
            this.draggedShip.toggleDirection()
        }

  }
  stop() {
      console.log("stop")
  }
}
