import * as React from 'react';
import { Board, Controls } from './';
import { AutomataProvider } from '../automata-context'

const Component = () => {
  return (
    <AutomataProvider>
      <Board />
      <Controls/>
    </AutomataProvider>
  );
}

export default Component;
