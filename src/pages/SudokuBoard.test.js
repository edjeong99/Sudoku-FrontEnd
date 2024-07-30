// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import axios from 'axios';
// import SudokuBoard from './SudokuBoard';

// // Mock axios
// jest.mock('axios');

// describe('SudokuBoard', () => {
//   const mockPuzzle = [
//     [5,3,0,0,7,0,0,0,0],
//     [6,0,0,1,9,5,0,0,0],
//     [0,9,8,0,0,0,0,6,0],
//     [8,0,0,0,6,0,0,0,3],
//     [4,0,0,8,0,3,0,0,1],
//     [7,0,0,0,2,0,0,0,6],
//     [0,6,0,0,0,0,2,8,0],
//     [0,0,0,4,1,9,0,0,5],
//     [0,0,0,0,8,0,0,7,9]
//   ];

//   const mockSolution = [
//     [5,3,4,6,7,8,9,1,2],
//     [6,7,2,1,9,5,3,4,8],
//     [1,9,8,3,4,2,5,6,7],
//     [8,5,9,7,6,1,4,2,3],
//     [4,2,6,8,5,3,7,9,1],
//     [7,1,3,9,2,4,8,5,6],
//     [9,6,1,5,3,7,2,8,4],
//     [2,8,7,4,1,9,6,3,5],
//     [3,4,5,2,8,6,1,7,9]
//   ];

//   beforeEach(() => {
//     axios.get.mockResolvedValue({ data: { puzzle: mockPuzzle, solution: mockSolution } });
//   });

//   test('renders SudokuBoard component', async () => {
//     render(<SudokuBoard difficulty="Hard" />);
    
//     await waitFor(() => {
//       expect(screen.getByText('Sudoku Game')).toBeInTheDocument();
//       expect(screen.getByText('Difficulty : Hard')).toBeInTheDocument();
//     });
//   });

//   test('fetches puzzle on mount', async () => {
//     render(<SudokuBoard difficulty="Medium" />);
    
//     await waitFor(() => {
//       expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/generate?difficulty=easy'));
//     });
//   });

//   test('handles user input', async () => {
//     render(<SudokuBoard difficulty="easy" />);
    
//     await waitFor(() => {
//       const inputs = screen.getAllByRole('textbox');
//       fireEvent.change(inputs[2], { target: { value: '4' } });
//       expect(inputs[2]).toHaveValue('4');
//     });
//   });

//   test('checks puzzle correctness', async () => {
//     render(<SudokuBoard difficulty="Easy" />);
    
//     await waitFor(() => {
//       const checkButton = screen.getByText('Check');
//       fireEvent.click(checkButton);
//       expect(screen.getByText(/Correct : 0/)).toBeInTheDocument();
//     });
//   });

//   test('requests hint', async () => {
//     axios.post.mockResolvedValue({ data: { row: 0, col: 2, num: 4 } });
    
//     render(<SudokuBoard difficulty="Easy" />);
    
//     await waitFor(() => {
//       const hintButton = screen.getByText('Hint');
//       fireEvent.click(hintButton);
//     });

//     await waitFor(() => {
//       const inputs = screen.getAllByRole('textbox');
//       expect(inputs[2]).toHaveValue('4');
//     });
//   });
// });


// SudokuBoard.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import SudokuBoard from './SudokuBoard';

const mock = new MockAdapter(axios);

describe('SudokuBoard Component', () => {
  const puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ];

  const solution = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
  ];

  beforeEach(() => {
    mock.reset();
  });

  test('renders SudokuBoard component', async () => {
    mock.onGet('/generate?difficulty=easy').reply(200, { puzzle, solution });

    render(<SudokuBoard difficulty="easy" />);

    await waitFor(() => {
      expect(screen.getByText('Sudoku Game')).toBeInTheDocument();
      expect(screen.getByText('Difficulty : easy')).toBeInTheDocument();
    });

    // Check if the puzzle is rendered
    await waitFor(() => {
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(81);
    }
  });

  test('handles user input change', async () => {
    mock.onGet('/generate?difficulty=easy').reply(200, { puzzle, solution });

    render(<SudokuBoard difficulty="easy" />);

    await waitFor(() => {
      expect(screen.getByText('Sudoku Game')).toBeInTheDocument();
    });
    await waitFor(() => {
    const firstEmptyCell = screen.getAllByRole('textbox')[2];
    fireEvent.change(firstEmptyCell, { target: { value: '4' } });
    expect(firstEmptyCell.value).toBe('4');
    }
  });

  test('requests hint correctly', async () => {
    mock.onGet('/generate?difficulty=easy').reply(200, { puzzle, solution });
    mock.onPost('/hint').reply(200, { row: 0, col: 2, num: 4 });

    render(<SudokuBoard difficulty="easy" />);

    await waitFor(() => {
      expect(screen.getByText('Sudoku Game')).toBeInTheDocument();
    });

    const hintButton = screen.getByText('Hint'); // Assuming the button text is 'Hint'
    fireEvent.click(hintButton);

    await waitFor(() => {
      const hintCell = screen.getAllByRole('textbox')[2];
      expect(hintCell.value).toBe('4');
      expect(hintCell).toHaveClass('bg-yellow-200');
    });
  });
});
