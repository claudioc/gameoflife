import { useState, useEffect } from 'react';
import { useAutomataDispatch, useAutomataState } from '../automata-context'

const Component = () => {
  const dispatch = useAutomataDispatch();
  const automata = useAutomataState();
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning && automata.alive > 0) {
      setImmediate(() => {
        setTimeout(updateBoard, 0);
      });
    }
  });

  const updateBoard = () => {
    dispatch({
      type: 'update',
    });
  }

  const handleStepFwd = () => {
    updateBoard();
  };

  const handleStepBack = () => {
    dispatch({
      type: 'undo'
    })
  };

  const handleGo = () => {
    setIsRunning(automata.alive > 0);
    console.log('Started at:', Date.now());
  };

  const handleReset = () => {
    setIsRunning(false);
    dispatch({
      type: 'reset'
    })
  };

  const handleStop = () => {
    setIsRunning(false);
    console.log('Stopped at:', Date.now());
  };

  return (
    <div className="controls">
      {!isRunning && <button onClick={handleGo}>Go!</button>}
      {isRunning && <button onClick={handleStop}>Stop</button>}
      <button disabled={isRunning} onClick={handleStepFwd}>Step fwd</button>
      <button disabled={isRunning} onClick={handleStepBack}>Step back</button>
      <button onClick={handleReset}>Reset</button>
      <span> Gen: {automata.gen} – {automata.alive}</span>
    </div>
  )
}

export default Component;
