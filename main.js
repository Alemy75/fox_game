import './style.css'
import Player from "./src/compnents/Player/Player.js";
import InputHandler from "./src/compnents/Input/Input.js";
import {Background} from "./src/compnents/Background/Background.js";

window.addEventListener('load', () => {
    const canvas = document.getElementById("game")
    const ctx = canvas.getContext("2d")
    canvas.width = 500
    canvas.height = 500

    class Game {
        constructor(width, height) {
            this.width = width
            this.height = height
            this.groundMargin = 83
            this.speed = 3
            this.background = new Background(this)
            this.player = new Player(this)
            this.input = new InputHandler()
        }
        update(deltaTime) {
            this.background.update()
            this.player.update(this.input.keys, deltaTime)
        }
        draw(ctx) {
            this.background.draw(ctx)
            this.player.draw(ctx)
        }
    }

    const gameInstance = new Game(canvas.width, canvas.height)
    let lastTime = 0
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        gameInstance.update(deltaTime)
        gameInstance.draw(ctx)
        requestAnimationFrame(animate)
    }
    animate(0)
})