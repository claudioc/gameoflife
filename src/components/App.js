import * as React from 'react';
import { Cells, Controls } from './';
import { AutomataProvider } from '../automata-context'

const Component = () => {
  return (
    <AutomataProvider>
      <Cells />
      <Controls/>
    </AutomataProvider>
  );
}

export default Component;
