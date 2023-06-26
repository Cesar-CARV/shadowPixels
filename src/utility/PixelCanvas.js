import TOOLS from "./Tools";

class PixelCanvas {
    constructor(canvas, ctx, tool, size) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.TOOLS = TOOLS;
        this.WIDTHDEFAULT = this.canvas.width < 400 ? this.canvas.width : 400;
        this.ZOOMLIMIT = 4;

        this.currentTool = tool;
        this.zoom = 1; // por defecto es 1 // el zoom que se le aplicara al tamaño del lienzo
        this.size = size;
        this.SIZELIMIT = 32;
        this.width = this.WIDTHDEFAULT * this.zoom; // tamaño del lienzo 
        this.box = this.width / this.size; // tamaño de los recuadros / pixeles

        this.board = new Array(this.size).fill([]);
        this.board.forEach((_, i) => this.board[i] = new Array(this.size).fill("transparent"));

        this.offsetPoint = { x: 0, y: 0 };
        this.cursorPoint = { x: 0, y: 0 };

        this.handToolPoint = { x: 0, y: 0 };
        this.handToolLastPoint = { x: 0, y: 0 };

        this.drawBoard();
    }
    
    getBoard = () => {
        return this.board;
    }

    resizeBoard = newSize => {
        this.size = newSize > this.SIZELIMIT ? this.SIZELIMIT : newSize;
        this.board = new Array(this.size).fill([]);
        this.board.forEach((_, i) => this.board[i] = new Array(this.size).fill("transparent"));
        this.recalculateBox();
        this.drawBoard();
    }

    recalculateBox = () => {
        this.WIDTHDEFAULT = this.canvas.width < 400 ? this.canvas.width : 400;
        this.width = this.WIDTHDEFAULT * this.zoom; // tamaño del lienzo 
        this.box = this.width / this.size; // tamaño de los recuadros / pixeles
    }

    zoomBoard = direction => {
        if (direction < 0 && this.zoom < this.ZOOMLIMIT) { this.zoom += .1 }
        else if (direction > 0 && this.zoom > 1) { this.zoom -= .1 }

        const oldBox = this.box;
        const oldOffsetX = this.offsetPoint.x / oldBox;
        const oldOffsetY = this.offsetPoint.y / oldBox;

        this.width = this.WIDTHDEFAULT * this.zoom; // tamaño del lienzo
        this.box = this.width / this.size; // tamaño de los recuadros / pixeles

        this.offsetPoint.x = oldOffsetX * this.box;
        this.offsetPoint.y = oldOffsetY * this.box;

        this.drawBoard();
    }

    // updateCursorPoint, esta funcion actualiza la posicion del cursor 
    // segun x, y que pase el componente con referencia al offsetPoint que
    // son las cordenadas del board.
    // se debe delvolver la newva posicion del cursor para que se actualize en el componente.
    updateCursorPoint = (x, y) => {
        // const newCursorX = Math.floor(((x - this.offsetPoint.x * this.zoom) / this.width) * (this.size / this.zoom));
        // const newCursorY = Math.floor(((y - this.offsetPoint.y * this.zoom) / this.width) * (this.size / this.zoom));
        const newCursorX = Math.floor(((x - this.offsetPoint.x) / this.width) * this.size);
        const newCursorY = Math.floor(((y - this.offsetPoint.y) / this.width) * this.size);

        this.cursorPoint = { x: newCursorX, y: newCursorY };
        this.drawBoard();

        return this.cursorPoint;
    }

    updateCurrentTool = tool => {
        this.currentTool = this.TOOLS[tool];
    }

    rezetHandToolPoint = () => {
        this.handToolPoint.x = 0;
        this.handToolPoint.y = 0;
    }

    setPixel = (e, color) => {
        if ((this.cursorPoint.x < 0 || this.cursorPoint.y < 0) &&
            this.currentTool !== this.TOOLS.HAND) return;
        if ((this.cursorPoint.x >= this.size || this.cursorPoint.y >= this.size) &&
            this.currentTool !== this.TOOLS.HAND) return;

        if (this.currentTool === this.TOOLS.PEN) {
            this.board[this.cursorPoint.y][this.cursorPoint.x] = color;
        }
        else if (this.currentTool === this.TOOLS.ERASER) {
            this.board[this.cursorPoint.y][this.cursorPoint.x] = "transparent";
        }
        else if (this.currentTool === this.TOOLS.LENS) {
            e.preventDefault();
            const zoomInOut = e.button === 0 ? -1 : 1; // 0 = LEFT, 1 = MIDLE, 2 = RIGHT | -1 = in, 1 = out
            this.zoomBoard(zoomInOut);
        }
        else if (this.currentTool === this.TOOLS.HAND) {
            if (this.handToolPoint.x === 0 && this.handToolPoint.y === 0) {
                this.handToolPoint.x = this.cursorPoint.x;
                this.handToolPoint.y = this.cursorPoint.y;
            }

            const moveX = Math.sign(this.cursorPoint.x - this.handToolPoint.x);
            const moveY = Math.sign(this.cursorPoint.y - this.handToolPoint.y);

            if (this.cursorPoint.x === this.handToolLastPoint.x && this.cursorPoint.y === this.handToolLastPoint.y) return;

            this.offsetPoint.x += moveX * this.box;
            this.offsetPoint.y += moveY * this.box;

            this.handToolLastPoint.x = this.cursorPoint.x;
            this.handToolLastPoint.y = this.cursorPoint.y;
        }

        this.drawBoard();
        //console.log(this.board);
    }

    drawBoard = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let y = 0; y < this.board.length; y++) {
            for (let x = 0; x < this.board[y].length; x++) {
                this.ctx.strokeStyle = "#36363623";
                this.ctx.strokeRect(
                    this.offsetPoint.x + (x * this.box),
                    this.offsetPoint.y + (y * this.box),
                    this.box, this.box
                );

                this.ctx.fillStyle = this.board[y][x];
                this.ctx.fillRect(
                    this.offsetPoint.x + (x * this.box),
                    this.offsetPoint.y + (y * this.box),
                    this.box, this.box
                );
            }
        }
        // this.ctx.fillStyle = 'green';
        // this.ctx.fillRect(this.handToolPoint.x * this.box, this.handToolPoint.y * this.box, 4, 4);
        // this.ctx.fillStyle = '#ffffff33';
        // this.ctx.fillRect(this.cursorPoint.x * this.box, this.cursorPoint.y * this.box, this.box, this.box);
    }

}

export default PixelCanvas;