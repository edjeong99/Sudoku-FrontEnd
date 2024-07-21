
const HowToPlay = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  

return(
    <>
    <div
    className="fixed inset-0 bg-black bg-opacity-50 z-40"
    onClick={onClose}
  ></div>
  <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-2xl bg-white p-6 rounded-lg shadow-xl z-50">
  <h2 className="text-2xl font-bold mb-4 text-center">How to play Sudoku</h2>
  <div className="prose max-w-none">
           
  <p className="mb-4">         
Sudoku is a logic-based number-placement puzzle. 
</p>
<p>
The objective is to fill a 9×9 grid with digits so that each column, row, and 3×3 sub-grid contains all digits from 1 to 9 without repetition.
{/* [A 9x9 Sudoku grid with some numbers filled in and empty spaces] */}
</p>
<p className="mt-2">
The Sudoku grid consists of 81 cells arranged in 9 rows, 9 columns, and 9 3x3 sub-grids. The puzzle starts with some cells pre-filled with numbers, and the challenge is to fill in the remaining cells while following these rules:
</p>
 <div className="flex justify-center mb-4">
      {/* Place your Sudoku grid image or component here 
      <img src="/path-to-your-sudoku-grid-image.png" alt="9x9 Sudoku grid with some numbers filled in and empty spaces" className="max-w-full h-auto" />
   */} </div> 
<ul className="list-disc list-inside mb-4">
      <li>Each row must contain the numbers 1-9, without repetitions</li>
      <li>Each column must contain the numbers 1-9, without repetitions</li>
      <li>Each of the nine 3×3 sub-boxes must contain the numbers 1-9, without repetitions</li>
    </ul>
    <p className="mt-2">
Start by scanning the grid to find cells where only one number can fit, 
based on the existing numbers in its row, column, and 3×3 sub-grid. 

{/*[A zoomed-in portion of a Sudoku grid highlighting a cell where only one number can fit]
Another useful technique is "single position," where you identify the only possible position for a number within a row, column, or 3×3 sub-grid:
[A Sudoku grid highlighting a row where only one position is possible for a specific number]
As you progress, you may need to use more advanced techniques like "candidate lines" or "naked pairs":
[A Sudoku grid illustrating the candidate lines technique]
*/}
</p>
<p className="mt-2">
enter multiple numbers to note possible numbers for each empty cell. 
If two cells in a row, column, or sub-grid can only contain the same pair of numbers, these numbers can be eliminated from other cells.  

</p>
<p className="mt-2">Remember:

Never guess. Each move should be based on logical deduction.
Start with easier puzzles and progress to more difficult ones as you improve.
</p>
<p className="mt-2">
Sudoku improves logical thinking, pattern recognition, and concentration. With practice, you'll develop strategies to tackle even the most challenging puzzles."

</p>
</div>
<button 
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
        </div>
</>
)
}

export default HowToPlay;