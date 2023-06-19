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
        return `.sprite {\n\twidth: 1${measure};\n\theight: 1${measure};\n\tbackground-color: ${this.board[0][0]};\n\tbox-shadow: ${shadows.join(',')};\n}`;
    }

    #getSpriteContainerCss = measure => {
        return `.sprite-container {\n\tposition: relative;\n\twidth: ${this.board.length + measure};\n\theight: ${this.board.length + measure};\n}`;
    }

    getComponent = measure => {
        if (this.#convertBoardToList().filter(pixel => pixel.color !== "transparent").length === 0) {
            return { html: "", container: "", sprite: "" };
        }

        const shadows = this.#getShadows(measure);
        const component = `<div class="sprite-container">\n\t<div class="sprite">\n\t</div>\n</div>`;
        const classSpriteContainer = this.#getSpriteContainerCss(measure);
        const classSprite = this.#getSpriteCss(measure, shadows);
        return { html: component, container: classSpriteContainer, sprite: classSprite };
    }
}

export default ConvertBoardToCss;