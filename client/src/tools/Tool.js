export default class Tool{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')
        this.destroyEvents()
    }

    set FillColor(color){
        this.ctx.fillStyle = color
    }

    set StrokeColor(color){
        this.ctx.strokeStyle = color
    }

    set LineWidth(width){
        this.ctx.lineWidth = width
    }

    destroyEvents(){
        this.canvas.onmousemove = null;
        this.canvas.onmousedown = null;
        this.canvas.onmouseup = null;
    }
}