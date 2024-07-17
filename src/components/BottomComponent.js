import Timer from './Timer';

const BottomComponent = ({ handleCheckClick, fetchPuzzle, requestHint, message, isSolved, resetTimer, stat }) => {

    return (
<>
<div className="mt-4 flex justify-center space-x-4">
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleCheckClick}>Check</button>
<button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => fetchPuzzle()}>New Game</button>
<button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600" onClick={requestHint}>Hint</button>
</div>

<Timer isSolved={isSolved} reset={resetTimer} />
<div className="whitespace-pre mt-4 text-center text-lg font-semibold text-gray-700">{stat}</div>
{message && <div className="mt-4 text-center text-lg font-semibold text-gray-700 w-[340px]">{message}</div>}
</>
    )
}
export default BottomComponent;