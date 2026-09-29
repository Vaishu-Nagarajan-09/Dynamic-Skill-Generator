import { useState } from "react"

const App = () => {

  const [inputNum, setInputNum] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  const [savedData, setSavedData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);


  const handleInputChange = (e) => {
    const value = +e.target.value;

    if(value < 0){
      return;
    }

    setInputNum(Array(value).fill(""));

    // keep existing values only with in the new num of inputs
    const updatedValue = inputValue.slice(0, value);
    setInputValue(updatedValue);

    //clear previously submitted data and error
    setSavedData([]);
    setErrors([]); 
    

    setIsSubmitted(false);
  };

  const handleInputValue = (index, value) => {
    const tempArr = [...inputValue];
    tempArr[index] = value;
    setInputValue(tempArr);

    //clear error for this input
    const tempErrors = [...errors];
    tempErrors[index] = "";
    setErrors(tempErrors);
  };

  const handleSubmit = () => {
    const newError = inputValue.map((_, index) => {
      const value = inputValue[index] || "" ;
      return value.trim() === "" ? "Skills is required" : "";
    });

    setErrors(newError);

    if (newError.some((error) => error !== "")) {
      return;
    }

    setSavedData(inputValue);
    setIsSubmitted(true);
  }

  const handleReset = () => {
    setInputNum([]);
    setInputValue([]);
    setSavedData([]);
    setErrors([]);
    setIsSubmitted(false);
  };

  return (
    <>

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Skill Manager </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              {/* enter skill section */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Enter Skills </h2>
              {!isSubmitted && (
                <>
                  <label className="block text-gray-700 font-medium mb-2">
                    Number of Skills
                  </label>

                  <input type="number" value={inputNum.length || ""}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleInputChange} />
                </>
              )}

              <div className="space-y-4">
                {inputNum.map((data, index) => {
                  return (
                    <div key={index}>
                      <label className="block text-gray-700 font-medium mb-2">
                        Skill {index + 1}
                      </label>

                      <input type="text" value={inputValue[index] || ""}
                        onChange={(e) =>
                          handleInputValue(index, e.target.value)}
                        placeholder={`Enter skill ${index + 1}`}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2
                                 focus:outline-none focus:ring-2 focus:ring-blue-500" />

                      {errors[index] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors[index]}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

             {!isSubmitted ? (
             <button type="button" className="mt-6 w-full bg-blue-600 text-white font-medium
                         py-2.5 rounded-lg hover:bg-blue-700
                         transition duration-200"  onClick={handleSubmit} >
                SUBMIT
              </button>
             ): (
               <button
                  type="button"
                  onClick={handleReset}
                  className="w-full bg-red-500 text-white font-medium
                             py-2.5 rounded-lg hover:bg-red-700
                             transition duration-200">
                  RESET
                </button>
             )  
            }
            </div>

            {/* Submitted Data */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6"> After Submitting </h2>
              {savedData.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">

                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left"> # </th>
                        <th className="border border-gray-300 px-4 py-3 text-left"> Skills </th>
                      </tr>
                    </thead>

                    <tbody>
                      {savedData.map((data, index) => {
                        return (
                          <tr
                            key={index} className="hover:bg-gray-50 transition">
                            <td className="border border-gray-300 px-4 py-3">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-3"> {data}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-10">
                  No skills submitted yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;