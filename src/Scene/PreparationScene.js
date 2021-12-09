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
    this.removeEventListeners = [];
    document
      .querySelectorAll(".app-actions")
      .forEach((element) => element.classList.add("hidden"));

    document
      .querySelector('[data-scene="preparation"]')
      .classList.remove("hidden");

    const randomizeButton = document.querySelector('[data-action="randomize"]');
    const manuallyButton = document.querySelector('[data-action="manually"]');
    const startButton = document.querySelector('[data-computer="play"]');

    this.removeEventListeners.push(
      addEventListener(randomizeButton, "click", () => this.randomize())
    );
    this.removeEventListeners.push(
      addEventListener(manuallyButton, "click", () => this.manually())
    );
    this.removeEventListeners.push(
      addEventListener(startButton, "click", () => this.startComputer("play"))
    );
    //  startButton.addEventListener("click", () => console.log("click play"))
  }

  stop() {
    // const randomizeButton = document.querySelector('[data-action="randomize"]')
    // randomizeButton.removeEventListener('click',  this.randomize)

    for (const removeEventListener of this.removeEventListeners) {
      removeEventListener();
    }

    this.removeEventListeners = [];
  }

  update() {
    const { mouse, player } = this.app;
    //клик тянем
    if (!this.draggedShip && mouse.left && !mouse.pLeft) {
      const ship = player.ships.find((ship) => ship.isUnder(mouse));

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
      const { left, top } = player.root.getBoundingClientRect();
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
      const { width, height } = player.cells[0][0].getBoundingClientRect();
      const point = {
        x: left + width / 2,
        y: top + height / 2,
      };

      const cell = player.cells
        .flat()
        .find((cell) => isUnderPoint(point, cell));

      if (cell) {
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);

        player.removeShip(ship);
        player.addShip(ship, x, y);
      } else {
        player.removeShip(ship);
        player.addShip(ship);
      }
    }

    //вращение
    if (this.draggedShip && mouse.delta) {
      this.draggedShip.toggleDirection();
    }

    //visibility buttons
    if (player.complete) {
      document.querySelector('[data-computer="play"]').disabled = false;
    } else {
      document.querySelector('[data-computer="play"]').disabled = true;
    }
  }
  randomize() {
    const { player } = this.app;
    player.randomize(ShipView);

    for (let i = 0; i < 10; i++) {
      const ship = player.ships[i];

      ship.startX = shipDatas[i].startX;
      ship.startY = shipDatas[i].startY;
    }
  }

  manually() {
    const { player } = this.app;

    player.removeAllShips();

    for (const { size, direction, startX, startY } of shipDatas) {
      const ship = new ShipView(size, direction, startX, startY);
      player.addShip(ship);
    }
  }

  startComputer(start) {
    console.log(start)
    this.app.start("computer");
  }
}
