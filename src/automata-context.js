import * as React from 'react'

const AutomataStateContext = React.createContext()
const AutomataDispatchContext = React.createContext()
const sizeInPercent = 1; // Keep it even (or 1) and match with the CSS!
const rowSize = 100 / sizeInPercent;
const numberOfCells = rowSize * rowSize;
const initialState = Array(numberOfCells).fill(0);
console.log(`Rendering ${numberOfCells} cells.`)

function neighbors(cells, idx) {
  return [
    cells[idx - 1],
    cells[idx - rowSize],
    cells[idx - (rowSize - 1)],
    cells[idx - (rowSize + 1)],
    cells[idx + 1],
    cells[idx + rowSize],
    cells[idx + (rowSize + 1)],
    cells[idx + (rowSize - 1)]
  ];
}

function automataReducer(state, action) {
  switch (action.type) {
    case 'update': {
      const newState = [...state.cells];
      let alive;
      let idx;
      for (idx = 0; idx < numberOfCells ; idx++) {
        alive = neighbors(state.cells, idx).filter(n => n === 1);
        newState[idx] = state.cells[idx];
        if (state.cells[idx] === 1) {
          if (alive.length > 3) { // Overpopulation
            newState[idx] = 0;
          }

          if (alive.length < 2) { // Underpopulation
            newState[idx] = 0;
          }
        } else {
          if (alive.length === 3) { // Reproduction
            newState[idx] = 1;
          }
        }
      }

      return {
        gen: state.gen + 1,
        cells: newState
      }
    }

    case 'on': {
      state.cells[action.idx] = 1;
      return {
        gen: state.gen,
        cells: state.cells
      }
    }

    case 'off': {
      state.cells[action.idx] = 0;
      return {
        gen: state.gen,
        cells: state.cells
      }
    }

    case 'reset': {
      return {
        gen: 0,
        cells: [...initialState]
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function AutomataProvider({children}) {
  const [state, dispatch] = React.useReducer(automataReducer, {
    gen: 0,
    cells: [...initialState]
  });

  return (
    <AutomataStateContext.Provider value={state}>
      <AutomataDispatchContext.Provider value={dispatch}>
        {children}
      </AutomataDispatchContext.Provider>
    </AutomataStateContext.Provider>
  );
}

function useAutomataState() {
  const context = React.useContext(AutomataStateContext);
  if (context === undefined) {
    throw new Error('useAutomataState must be used within a AutomataProvider');
  }
  return context;
}

function useAutomataDispatch() {
  const context = React.useContext(AutomataDispatchContext);
  if (context === undefined) {
    throw new Error('useAutomataDispatch must be used within a AutomataProvider');
  }
  return context;
}

export {AutomataProvider, useAutomataState, useAutomataDispatch};
