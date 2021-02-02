import { useAutomataDispatch, useAutomataState } from '../automata-context'

let isRunning = false;

const Component = () => {
  const dispatch = useAutomataDispatch();
  const automata = useAutomataState();

  const updateBoard = () => {
    dispatch({
      type: 'update',
    });
  }

  const handleStep = () => {
    updateBoard();
  };

  const handleGo = () => {
    isRunning = true;
    tick();

    function tick() {
      if (!isRunning) {
        return;
      }

      updateBoard();
      setImmediate(() => {
        setTimeout(tick, 0);
      });
    }
  };

  const handleReset = () => {
    isRunning = false;
    dispatch({
      type: 'reset'
    })
  };

  const handleStop = () => {
    isRunning = false;
  };

  return (
    <div className="controls">
      <button onClick={handleGo}>Go!</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleStep}>Step</button>
      <button onClick={handleReset}>Reset</button>
      <span> Gen: {automata.gen}</span>
    </div>
  )
}

export default Component;
