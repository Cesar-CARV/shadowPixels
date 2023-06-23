import { useState, useEffect } from 'react';
import Header from './components/Header';
import Canvas from './components/Canvas';
import History from './components/History';
import ToolButton from './components/ToolButton';
import ColorButton from './components/ColorButton';
import CanvasControls from './components/CanvasControls';
import ConvertBoardToCss from './utility/ConverBoarToCss';
import CodeBlock from './components/CodeBlock';
import TOOLS from './utility/Tools';
import MEASURES from './utility/Measures';
import './App.css';

function App() {
  const [currentColor, setCurrentColor] = useState('#000000');
  const [currentTool, setCurrentTool] = useState(null);
  const [history, setHistory] = useState(["#000000"]);
  const [board, setBoard] = useState([]);
  const [sizeBorad, setSizeBoard] = useState(8);
  const [spriteComponent, setSpriteComponent] = useState([]);
  const [measure, setMeasure] = useState(MEASURES.REM);

  // canvas
  const getBoard = newboard => {
    setBoard(newboard);
  }

  // hitorial
  const addColorToHistory = color => {
    const newHistory = [color, ...history];
    setHistory(newHistory);
  }

  const clearColorHistory = () => {
    setHistory([]);
  }

  // herramientas
  const updateCurrentColor = color => {
    setCurrentColor(color);
  }

  const handleClickColor = e => {
    const newCurrentColor = e.target.value;
    setCurrentColor(newCurrentColor);
    addColorToHistory(newCurrentColor);
  }

  // controles 
  const changeSize = newsize => {
    const dialogResult = confirm("¿Seguro de cambiar el tamaño del board?, esto borrara todo lo que este en el");
    if (!dialogResult) return;

    setSizeBoard(newsize);
  }

  const changeMeasure = newMeasure => {
    setMeasure(newMeasure);
  }

  // convertir el board a css
  const convertBoardToCSs = () => {
    const convertBoard = new ConvertBoardToCss(board);
    // const measure = convertBoard.MESURES.EM;
    const shadowsList = convertBoard.getComponent(measure);
    setSpriteComponent(shadowsList);
  }

  return (
    <>
      {/* Header */}
      <Header />

      {/* Main */}
      <main>
        <article
          className='flex px-8 py-2 gap-4 flex-col justify-center items-center md:flex-row md:items-start'
        >
          {/* Canvas */}
          <Canvas
            size={sizeBorad}
            color={currentColor}
            tool={currentTool}
            getBoard={getBoard}
          />

          {/* Controls */}
          <aside className='bg-gray-900 p-4 w-96 h-96 lg:w-auto lg:h-auto'>
            {/* tools and current color */}
            <section className='flex flex-wrap justify-left align-center gap-2'>
              <ToolButton
                type={TOOLS.PEN}
                active={currentTool === TOOLS.PEN}
                cb={() => setCurrentTool(TOOLS.PEN)}
              />
              <ToolButton
                type={TOOLS.ERASER}
                active={currentTool === TOOLS.ERASER}
                cb={() => setCurrentTool(TOOLS.ERASER)}
              />
              <ToolButton
                type={TOOLS.HAND}
                active={currentTool === TOOLS.HAND}
                cb={() => setCurrentTool(TOOLS.HAND)}
              />
              <ToolButton
                type={TOOLS.LENS}
                active={currentTool === TOOLS.LENS}
                cb={() => setCurrentTool(TOOLS.LENS)}
              />
              <ColorButton
                color={currentColor}
                click={handleClickColor}
                showHex={true}
              />
            </section>
            
            {/* History */}
            <History
              items={history}
              clear={clearColorHistory}
              updateColor={updateCurrentColor}
            />

            {/* Form size */}
            <CanvasControls
              changeSize={changeSize}
              changeMeasure={changeMeasure}
            />
            <button
              className="bg-teal-500 text-slate-950 px-4 py-2"
              onClick={convertBoardToCSs}
            >
              Get Code
            </button>

          </aside>
        </article>

        {/* Code css */}
        <article className='flex flex-wrap gap-2'>
          <CodeBlock
            code={spriteComponent.html}
            title={"HMTL"}
          />
          <CodeBlock
            code={spriteComponent.container}
            title={"CSS Container"}
          />
          <CodeBlock
            code={spriteComponent.sprite}
            title={"CSS Sprite"}
          />
        </article>
      </main>

      {/* Footer */}
      <footer>
      </footer>
    </>
  )
}

export default App;
