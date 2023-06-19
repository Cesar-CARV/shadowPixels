class ConvertBoardToCss {
    constructor(board) {
        this.board = board;
        this.MESURES = { PX: 'px', REM: 'rem', EM: 'em' };
    }

    #convertBoardToList = () => {
        const boardSize = this.board.length - 1;
        let listOfColors = [];

        for (let y = 0; y <= boardSize; y++) {
            for (let x = 0; x <= boardSize; x++) {
                listOfColors.push({ color: this.board[y][x], x: x, y: y });
            }
        }

        return listOfColors;
    }

    #getShadows = measure => {
        const list = this.#convertBoardToList().filter(pixel => pixel.color !== "transparent");
        const pxRemEm = measure === this.MESURES.PX ? this.MESURES.PX : measure === this.MESURES.REM ? this.MESURES.REM : this.MESURES.EM;
        const shadowsList = list.map((pixel, i) => `${pixel.x + pxRemEm} ${pixel.y + pxRemEm} ${pixel.color}`);
        return shadowsList;
    }

    #getSpriteCss = (measure, shadows) => {
        return `width: 1${measure};\nheight: 1${measure};\nbackground-color: ${this.board[0][0]};\nbox-shadow: ${shadows.join(',')};`;
    }

    #getSpriteContainerCss = measure => {
        return `position: relative\nwidth: ${this.board.length + measure}\nheight: ${this.board.length + measure}`;
    }

    getComponent = measure => {
        const shadows = this.#getShadows(measure);
        return [this.#getSpriteContainerCss(measure),this.#getSpriteCss(measure, shadows)];
        // return (`
        //     <>
        //     <>
        // `)
    }
}

export default ConvertBoardToCss;