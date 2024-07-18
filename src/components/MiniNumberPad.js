const MiniNumberPad = ({ handleNumberSelect }) => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'x'];
    
    return ( 
        <div className=" mt-4 mb-4 w-full flex justify-center">

        <div className="grid grid-cols-5 gap-1 bg-zinc-200 p-2 rounded-lg shadow-lg  max-w-[300px] ">
        {numbers.map((num) => (
          <button
            key={num}
            className={` w-9 h-9 rounded-full flex items-center justify-center text-base font-bold
                         ${num === 'x'? "bg-red-400" : "bg-lime-200"} 
                    `}
           
            onClick={() => handleNumberSelect(num)}
          >
            {num}
          </button>
        ))}
      </div>
      </div>
    );
  };

  export default MiniNumberPad;