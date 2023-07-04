import { useState, useEffect } from 'react';
import Header from './components/Header';
import Canvas from './components/Canvas';
import History from './components/History';
import ToolButtons from './components/ToolButtons';
import CanvasControls from './components/CanvasControls';
import ResizeCanvasForm from './components/ResizeCanvasForm';
import MeasuresOps from './components/MeasuresOps';
import ConvertBoardToCss from './utility/ConverBoarToCss';
import CodeBlock from './components/CodeBlock';
import Footer from './components/Footer';
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

    if (e.type === 'change') return;
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
          className='flex px-8 py-2 gap-4 flex-col justify-start items-center md:flex-row md:items-start'
        >
          {/* Canvas */}
          <Canvas
            size={sizeBorad}
            color={currentColor}
            tool={currentTool}
            getBoard={getBoard}
          />

          <CanvasControls convertBoardToCSs={convertBoardToCSs}>
            {/* tools and current color */}
            <ToolButtons
              currentTool={currentTool}
              currentColor={currentColor}
              setCurrentTool={setCurrentTool}
              handleClickColor={handleClickColor}
            />
            {/* History */}
            <History
              items={history}
              clear={clearColorHistory}
              updateColor={updateCurrentColor}
            />
            {/* Form size */}
            <ResizeCanvasForm changeSize={changeSize} />
            {/* Measure options */}
            <MeasuresOps changeMeasure={changeMeasure} />
          </CanvasControls>
        </article>

        {/* Code css */}
        <article className='flex flex-wrap gap-2 p-8'>
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
      <Footer></Footer>
    </>
  )
}

export default App;
