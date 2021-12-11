const shipDatas = [
  { size: 4, direction: "row", startX: 15, startY: 345 },
  { size: 3, direction: "row", startX: 15, startY: 390 },
  { size: 3, direction: "row", startX: 125, startY: 390 },
  { size: 2, direction: "row", startX: 15, startY: 435 },
  { size: 2, direction: "row", startX: 93, startY: 435 },
  { size: 2, direction: "row", startX: 172, startY: 435 },
  { size: 1, direction: "row", startX: 15, startY: 480 },
  { size: 1, direction: "row", startX: 60, startY: 480 },
  { size: 1, direction: "row", startX: 105, startY: 480 },
  { size: 1, direction: "row", startX: 150, startY: 480 },
];


class PreparationScene extends Scene {
  draggedShip = null;
  draggedOffsetX = 0;
  draggedOffsety = 0;

  removeEventListeners = [];

  init() {
    // this.randomize = this.randomize.bind(this)
    // this.manually = this.manually.bind(this)

    this.manually();
  }
  start() {
    const {player, opponent} = this.app
    opponent.removeAllShot()
    player.removeAllShot()
    player.ships.forEach((ship) => (ship.killed = false))


    this.removeEventListeners = [];
    document
      .querySelectorAll(".app-actions")
      .forEach((element) => element.classList.add("hidden"));

    document
      .querySelector('[data-scene="preparation"]')
      .classList.remove("hidden");

   

    const randomizeButton = document.querySelector('[data-action="randomize"]');
    const randomizeButton2 = document.querySelector('[data-action="randomize2"]');
    const manuallyButton = document.querySelector('[data-action="manually"]');
    const manuallyButton2 = document.querySelector('[data-action="manually2"]');
    const startButton = document.querySelector('[data-computer="play"]');
    const startPlayerButton = document.querySelector('[data-computer="playPlayer"]');

    const buttonPlayer1 = document.querySelector('[data-action="player1"]');
    const buttonPlayer2 = document.querySelector('[data-action="player2"]');

    this.removeEventListeners.push(
      addEventListener(randomizeButton, "click", () => this.randomize("player"))
    );
    this.removeEventListeners.push(
      addEventListener(randomizeButton2, "click", () => this.randomize("opponent"))
    );
    this.removeEventListeners.push(
      addEventListener(manuallyButton, "click", () => this.manually("player"))
    );
    this.removeEventListeners.push(
      addEventListener(manuallyButton2, "click", () => this.manually("opponent"))
    );
    this.removeEventListeners.push(
      addEventListener(startButton, "click", () => this.startComputer("play"))
    );

    this.removeEventListeners.push(
      addEventListener(startPlayerButton, "click", () => this.startPlayer("playPlayer"))
    );

    this.removeEventListeners.push(
      addEventListener(buttonPlayer1, "click", () => this.buttonShow("player"))
    );

    this.removeEventListeners.push(
      addEventListener(buttonPlayer2, "click", () => this.buttonShow("opponent"))
    );
    
  }

  stop() {
    for (const removeEventListener of this.removeEventListeners) {
      removeEventListener();
    }

    this.removeEventListeners = [];
  }

  update() {
    const { mouse, player, opponent } = this.app;
    

    let mainPlayer = player 
    if (player.showShips === false){
      mainPlayer = opponent
      console.log(mainPlayer)
    }
    

    //клик тянем
    if (!this.draggedShip && mouse.left && !mouse.pLeft) {
      const ship = mainPlayer.ships.find((ship) => ship.isUnder(mouse));

      if (ship) {
        const shipRect = ship.div.getBoundingClientRect();
        this.draggedShip = ship;
        this.draggedOffsetX = mouse.x - shipRect.left;
        this.draggedOffsetY = mouse.y - shipRect.top;

        ship.x = null;
        ship.y = null;
      }
    }
    //перетаскивание
    if (mouse.left && this.draggedShip) {
      const { left, top } = mainPlayer.root.getBoundingClientRect();
      const x = mouse.x - left - this.draggedOffsetX;
      const y = mouse.y - top - this.draggedOffsetY;
      this.draggedShip.div.style.left = `${x}px`;
      this.draggedShip.div.style.top = `${y}px`;
    }
    //отпускаем
    if (!mouse.left && this.draggedShip) {
      const ship = this.draggedShip;
      this.draggedShip = null;

      const { left, top } = ship.div.getBoundingClientRect();
      const { width, height } = mainPlayer.cells[0][0].getBoundingClientRect();
      const point = {
        x: left + width / 2,
        y: top + height / 2,
      };

      const cell = mainPlayer.cells
        .flat()
        .find((cell) => isUnderPoint(point, cell));

      if (cell) {
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);

        mainPlayer.removeShip(ship);
        mainPlayer.addShip(ship, x, y);
      } else {
        mainPlayer.removeShip(ship);
        mainPlayer.addShip(ship);
      }
    }

    //вращение
    if (this.draggedShip && mouse.delta) {
      this.draggedShip.toggleDirection();
    }

    //visibility buttons
    if (mainPlayer.complete) {
      document.querySelector('[data-computer="play"]').disabled = false;
      document.querySelector('[data-computer="playPlayer"]').disabled = false;
    } else {
      document.querySelector('[data-computer="play"]').disabled = true;
      document.querySelector('[data-computer="playPlayer"]').disabled = true;
    }





    
  }

  buttonShow(players) {
    const { player, opponent } = this.app;
    const hidenPlayer1 = document.querySelector('[data-side="player"]');
    const hidenPlayer2 = document.querySelector('[data-side="opponent"]');
    if(players === "player"){
      if ( player.showShips === true){
        player.showShips = false
        hidenPlayer1.classList.add("battlefield-ed");
      } else {
        player.showShips = true
        hidenPlayer1.classList.remove("battlefield-ed");
      
      }
    } else if (players === "opponent"){
        if ( opponent.showShips === true){
          opponent.showShips = false
          hidenPlayer2.classList.add("battlefield-ed");
        } else {
          opponent.showShips = true
          hidenPlayer2.classList.remove("battlefield-ed");
        
        }
    
  
      }
    
    
    // for (const { size, direction, startX, startY } of matrix) {
    //   const ship = new ShipView(size, direction, startX, startY);
    //   console.log(ship)
    //   player.addShip(ship);
    // }
    
  }

  randomize(players) {
    const { player, opponent } = this.app;
    if(players === "player"){
      player.randomize(ShipView);
      for (let i = 0; i < 10; i++) {
        const ship = player.ships[i];
  
        ship.startX = shipDatas[i].startX;
        ship.startY = shipDatas[i].startY;
      }
    } else if (players === "opponent"){
      opponent.randomize(ShipView);
      for (let i = 0; i < 10; i++) {
        const ship = opponent.ships[i];
  
        ship.startX = shipDatas[i].startX;
        ship.startY = shipDatas[i].startY;
    }
  }

    
  }

  

  manually(players = "player") {
    const { player, opponent } = this.app;

    if (players === "player"){
      player.removeAllShips();
      for (const { size, direction, startX, startY } of shipDatas) {
        const ship = new ShipView(size, direction, startX, startY);
        player.addShip(ship);
      }
      
    } else if (players === "opponent"){
      opponent.removeAllShips();
      for (const { size, direction, startX, startY } of shipDatas) {
        const ship = new ShipView(size, direction, startX, startY);
        opponent.addShip(ship);
      }
    }
 

  

    
  
  }

  startComputer(start) {
    
  
    const matrix = this.app.player.matrix;

    
    // const x = getRandomBetween(1, 10)
    // const y = getRandomBetween(1, 10)
    
    
    this.app.start("computer");
  }

  startPlayer(start){
    const matrix = this.app.player.matrix;

    this.app.start("playerStart");
  }
}
