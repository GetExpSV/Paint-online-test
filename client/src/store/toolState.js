import {makeAutoObservable} from "mobx";

class ToolState{
    tool = null;
    constructor(){
        makeAutoObservable(this)
    }
    setTool(tool){
        this.tool = tool
    }

    setFillColor(color){
        this.tool.FillColor = color
    }

    setStrokeColor(color){
        this.tool.StrokeColor = color
    }

    setLineWidth(width){
        this.tool.LineWidth = width
    }
}

export default new ToolState();