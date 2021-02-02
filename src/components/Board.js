import { useAutomataState } from '../automata-context'
import { Cell } from './';

const Component = () => {
  const { cells } = useAutomataState();

  return (
    <>
      {cells.map((cell, idx) => {
        return <Cell key={idx} id={`c-${idx}`} isSelected={cell === 1} />
      })}
    </>
  );
}

export default Component;
