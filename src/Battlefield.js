class Battlefield {
  ships = [];
  shots = [];
  
 
  addShip(ship) {
    if (this.ships.includes(ship)) {
      return false;
    }

    this.ships.push(ship);
    return true;
  }

  removeShip() {
    if (!his.ships.includes(ship)) {
      return false;
    }
    const index = this.ships.indexOf(ship);
    this.ships.splice(index, 1);
    return true;
  }

  removeAllShip() {
    const ships = this.ship.slice();

    for (const ship of ships) {
      this.removeShip(ship);
    }
    return ships.length;
  }

  addShot() {}

  removeShot() {}

  removeAllShot() {
    const shots = this.ship.slice();

    for (const shot of shots) {
      this.removeShip(shot);
    }
    return shots.length;
  }
}
