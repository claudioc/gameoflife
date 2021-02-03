import { useAutomataState } from '../automata-context'
import { Cell } from './';

function MakeBoard({cells}) {
  const l = cells.length;
  const board = Array(l);
  // Slightly faster than a .map() and avoid .push()
  for (let idx = 0; idx < l; idx++) {
    board[idx] = <Cell key={idx} id={`c-${idx}`} isSelected={cells[idx] === 1} />;
  }
  return board;
}

const Component = () => {
  const { cells } = useAutomataState();
  return (
    <MakeBoard cells={cells}/>
  );
};

export default Component;
