class ComputerScene extends Scene{
    start(){
        document.querySelectorAll(".app-actions").forEach((element) => element.classList.add("hidden"))
        document.querySelector('[data-scene="computer"]').classList.remove('hidden')
    }

    update(){
        const {mouse, opponent, player} = this.app
        
        const cells = opponent.cells.flat()
        
        cells.forEach(cell => cell.classList.remove("battlefield-item__active"))
        if(isUnderPoint(mouse, opponent.table)){
            const cell = cells.find((cell) => isUnderPoint(mouse, cell))

            if(cell){
                cell.classList.add("battlefield-item__active")
                if(mouse.left && !mouse.pLeft){
                    const x = parseInt(cell.dataset.x)
                    const y = parseInt(cell.dataset.y)

                    const shot = new ShotView(x, y)
                    opponent.addShot(shot)
                    console.log(x, y)
                }
            }
        
        }
    }
}