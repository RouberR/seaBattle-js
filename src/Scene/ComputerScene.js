class ComputerScene extends Scene {
  playerTurn = true;
  start() {
    const { opponent, player } = this.app;
    document
      .querySelectorAll(".app-actions")
      .forEach((element) => element.classList.add("hidden"));
    document
      .querySelector('[data-scene="computer"]')
      .classList.remove("hidden");

    opponent.showShips = false
    opponent.clear();
    opponent.randomize(ShipView);
  }

  update() {
    const { mouse, opponent, player } = this.app;
   
    const cells = opponent.cells.flat();

    cells.forEach((cell) => cell.classList.remove("battlefield-item__active"));
    if (isUnderPoint(mouse, opponent.table)) {
      const cell = cells.find((cell) => isUnderPoint(mouse, cell));
     
      if (cell) {
       
        cell.classList.add("battlefield-item__active");
        if (this.playerTurn && mouse.left && !mouse.pLeft) {
          const x = parseInt(cell.dataset.x);
          const y = parseInt(cell.dataset.y);

          const shot = new ShotView(x, y);
          const result = opponent.addShot(shot);

          if (result) {
            this.playerTurn = shot.variant === "miss" ? false : true;
          }
        }
      }
    }

    if(!this.playerTurn){
        const x = getRandomBetween(0, 9)
        const y = getRandomBetween(0, 9)

        const shot = new ShotView(x, y)
        const result = player.addShot(shot)
        
        if (result){
            this.playerTurn = shot.variant === "miss" ? true : false;
        }


        
      /*  if(shot.variant === "wounded"){
            const axis = getRandomBetween(0, 1)
            const axis2 = getRandomBetween(0, 1)
           console.log(result)
           console.log(shot.x, shot.y )
           console.log(shot.x + 1, shot.y + 1)


           //0 - y 1 - x  
           // 0 - лево/низ  1- вверх/право
            if(axis === 0){
                if(axis2 === 0){
                    const shotNew = new ShotView(shot.x, shot.y - 1)
                    player.addShot(shotNew)
                } else {
                    const shotNew = new ShotView(shot.x, shot.y + 1)
                    player.addShot(shotNew)
                }
            } else if (axis === 1) {
                if(axis2 === 0){
                    const shotNew = new ShotView(shot.x - 1, shot.y)
                    player.addShot(shotNew)
                } else {
                    const shotNew = new ShotView(shot.x + 1, shot.y)
                    player.addShot(shotNew)
                }
            }*/
        }



       
    }
  }

