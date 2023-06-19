import { useState, useEffect } from 'react';
import Header from './components/Header';
import Canvas from './components/Canvas';
import History from './components/History';
import ToolButton from './components/ToolButton';
import ColorButton from './components/ColorButton';
import CanvasControls from './components/CanvasControls';
import TOOLS from './utility/Tools';
import ConvertBoardToCss from './utility/ConverBoarToCss';
import CodeBlock from './components/CodeBlock';
import './App.css';

function App() {
  const [currentColor, setCurrentColor] = useState('#000000');
  const [currentTool, setCurrentTool] = useState(null);
  const [history, setHistory] = useState(["#000000"]);
  const [board, setBoard] = useState([]);
  const [sizeBorad, setSizeBoard] = useState(8);
  const [spriteComponent, setSpriteComponent] = useState([]);

  useEffect(()=> {
    console.log(`${spriteComponent.html}\n${spriteComponent.container}\n${spriteComponent.sprite}`);
  },[spriteComponent]);

  // canvas
  const getBoard = newboard => {
    setBoard(newboard);
    // console.log(board);
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
  const onApply = newsize => {
    const dialogResult = confirm("¿Seguro de cambiar el tamaño del board?, esto borrara todo lo que este en el");
    if (!dialogResult) return;

    setSizeBoard(newsize);
  }

  // convertir el board a css
  const convertBoardToCSs = () => {
    const convertBoard = new ConvertBoardToCss(board);
    const measure = convertBoard.MESURES.EM;
    const shadowsList = convertBoard.getComponent(measure);
    setSpriteComponent(shadowsList);
  }

  return (
    <>
      {/* Header */}
      <Header />

      {/* Main */}
      <main>

        {/* Canvas */}
        <Canvas size={sizeBorad} color={currentColor} tool={currentTool} getBoard={getBoard} />

        {/* Controls */}
        <aside>
          {/* tools and current color */}
          <div className='flex justify-left align-center p-2 gap-2'>
            <ToolButton type={TOOLS.PEN} active={currentTool === TOOLS.PEN} cb={() => setCurrentTool(TOOLS.PEN)} />
            <ToolButton type={TOOLS.ERASER} active={currentTool === TOOLS.ERASER} cb={() => setCurrentTool(TOOLS.ERASER)} />
            <ToolButton type={TOOLS.HAND} active={currentTool === TOOLS.HAND} cb={() => setCurrentTool(TOOLS.HAND)} />
            <ToolButton type={TOOLS.LENS} active={currentTool === TOOLS.LENS} cb={() => setCurrentTool(TOOLS.LENS)} />
            <ColorButton color={currentColor} click={() => { }} />
            <input type="color" onChange={handleClickColor} />
          </div>
          
          {/* Form size */}
          <CanvasControls onApply={onApply} />
          <button className="bg-indigo-700 text-white px-4 py-2" onClick={convertBoardToCSs}>print board</button>

          {/* History */}
          <History items={history} clear={clearColorHistory} updateColor={updateCurrentColor} />
        </aside>

        {/* Code css */}
        <article className='flex flex-wrap gap-2'>
          <CodeBlock code={spriteComponent.html} title={"HMTL"}/>
          <CodeBlock code={spriteComponent.container} title={"CSS Container"}/>
          <CodeBlock code={spriteComponent.sprite} title={"CSS Sprite"}/>
        </article>
      </main>

      {/* Footer */}
      <footer>
      </footer>
    </>
  )
}

export default App;
