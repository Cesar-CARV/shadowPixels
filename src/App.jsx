import { useState, useEffect } from 'react';
import Header from './components/Header';
import Canvas from './components/Canvas';
import History from './components/History';
import ToolButton from './components/ToolButton';
import ColorButton from './components/ColorButton';
import CanvasControls from './components/CanvasControls';
import TOOLS from './utility/Tools';
import './App.css';

function App() {
  const [currentColor, setCurrentColor] = useState('#000000');
  const [currentTool, setCurrentTool] = useState(null);
  const [history, setHistory] = useState([]);
  const [board, setBoard] = useState([]);
  const [sizeBorad, setSizeBoard] = useState(8);

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
  const onApply = newsize => {
    const dialogResult = confirm("¿Seguro de cambiar el tamaño del board?, esto borrara todo lo que este en el");
    if (!dialogResult) return;

    setSizeBoard(newsize);
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
          {/* Form size */}
          <CanvasControls onApply={onApply} />

          {/* tools and current color */}
          <div className='flex justify-left align-center p-2 gap-2'>
            <ToolButton type={TOOLS.PEN} active={currentTool === TOOLS.PEN} cb={() => setCurrentTool(TOOLS.PEN)} />
            <ToolButton type={TOOLS.ERASER} active={currentTool === TOOLS.ERASER} cb={() => setCurrentTool(TOOLS.ERASER)} />
            <ToolButton type={TOOLS.HAND} active={currentTool === TOOLS.HAND} cb={() => setCurrentTool(TOOLS.HAND)} />
            <ToolButton type={TOOLS.LENS} active={currentTool === TOOLS.LENS} cb={() => setCurrentTool(TOOLS.LENS)} />
            <ColorButton color={currentColor} click={() => { }} />
            <input type="color" onChange={handleClickColor} />
          </div>

          {/* History */}
          <History items={history} clear={clearColorHistory} updateColor={updateCurrentColor} />
        </aside>

        {/* Code css */}
        <section>

        </section>
      </main>

      {/* Footer */}
      <footer>
      </footer>
    </>
  )
}

export default App;
