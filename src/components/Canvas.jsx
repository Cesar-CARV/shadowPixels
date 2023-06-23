import { useState, useEffect, useRef } from "react";
import PixelCanvas from "../utility/PixelCanvas.js";
import TOOLS from "../utility/Tools.js";

function Canvas({ size, color, tool, getBoard }) {
    const sizeBoard = size;
    const currentTool = tool;
    const currentColor = color;
    const getCanvasBoard = getBoard;
    const canvasRef = useRef(null);
    const [pointer, setPointer] = useState({ x: 0, y: 0 });
    const [pixelCanvas, setPixelCanvas] = useState();
    const [paint, setPaint] = useState(false);

    // crear la clase pixelCanvas
    useEffect(() => {
        const newCtx = canvasRef.current.getContext('2d');
        setPixelCanvas(new PixelCanvas(canvasRef.current, newCtx, tool, size));
    }, []);

    // modificar el tamaño del board y redibujarlo al cambiar el "sizeBaord"
    useEffect(() => {
        if (!pixelCanvas) return;

        pixelCanvas.resizeBoard(sizeBoard);
        const canvasBoard = pixelCanvas.getBoard();
        getCanvasBoard(canvasBoard);
    }, [sizeBoard]);

    // modificar el tamaño del canvas y redibujar el board
    useEffect(() => {
        if (!pixelCanvas) return;

        const canvasW = canvasRef.current.clientWidth;
        const canvasH = canvasRef.current.clientHeight;

        canvasRef.current.width = canvasW;
        canvasRef.current.height = canvasH;

        pixelCanvas.recalculateBox();
        pixelCanvas.drawBoard();

        const canvasBoard = pixelCanvas.getBoard();
        getCanvasBoard(canvasBoard);
    }, [paint]);

    // cada que se eleccionar una herramienta se actualiza la herramienta en el pixelCanvas
    useEffect(() => {
        if (pixelCanvas) {
            pixelCanvas.updateCurrentTool(tool);
        }
    }, [tool]);

    const handleMouseDown = e => {
        setPaint(true);
        pixelCanvas.setPixel(e, currentColor);
    }

    const handleMouseUp = e => {
        setPaint(false);
        pixelCanvas.rezetHandToolPoint();
    }

    //  al mover el mouse calcular la posicion del mouse y dibujar en el board
    const handleMouseMove = e => {
        const x = e.pageX - canvasRef.current.offsetLeft;
        const y = e.pageY - canvasRef.current.offsetTop;

        const canvasPointer = pixelCanvas.updateCursorPoint(x, y);
        setPointer(canvasPointer);

        if (paint && currentTool !== TOOLS.LENS) {
            pixelCanvas.setPixel(e, currentColor);
        }
    }

    // desactivar el menu al hacer click derecho
    const handleContextMenu = e => {
        e.preventDefault();
        return false;
    }

    return (
        <section className="flex-grow max-w-fit">
            <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onContextMenu={handleContextMenu}
                id="canvas"
                className={`
                    border-2 border-slate-800 rounded-sm 
                    object-none object-left-top 
                    w-96 h-96 lg:w-[540px] lg:h-[540px]
                    ${currentTool === TOOLS.PEN ? "cursor-cell" : ""}
                    ${currentTool === TOOLS.ERASER ? "cursor-no-drop" : ""}
                    ${currentTool === TOOLS.HAND ? "cursor-move" : ""}
                    ${currentTool === TOOLS.LENS ? "cursor-zoom-in" : ""}
                `}
                width={540}
                height={540}
            >
                Tu navegador no soporta canvas
            </canvas>
            {/* canvas info */}
            <div>
                <span>X: {pointer.x}, Y: {pointer.y}</span>
            </div>
        </section>
    )
}

export default Canvas;