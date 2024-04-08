import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './VisitorInput.css'; 

function VisitorInput() {
  const { result } = useParams();
  const [inputs, setInputs] = useState([{ id: 1, fullName: "", email: "" }]);
  const navigate = useNavigate();

  const handleAddInput = () => {
    setInputs([...inputs, { id: inputs.length + 1, fullName: "", email: "" }]);
  };

  const handleRemoveInput = () => {
    if (inputs.length > 1) {
      const newInputs = [...inputs];
      newInputs.pop();
      setInputs(newInputs);
    }
  };

  const handleInputChange = (id, event) => {
    const newInputs = inputs.map((input) =>
      input.id === id
        ? { ...input, [event.target.name]: event.target.value }
        : input
    );
    setInputs(newInputs);
  };

  const handleSubmit = () => {
    console.log("Scanned Result:", result);
    console.log("Visitor Inputs:", inputs);
    navigate("/insurance", { state: { visitors: inputs } });
  };

  return (
    <div class="container-fluid">
      <h2>Scanned Result: {result}</h2>
        <div className="buttons">
        <h4>Number of people:</h4>
        <button onClick={handleAddInput}>+</button>
        <button onClick={handleRemoveInput}>-</button>
        
      </div>
      {inputs.map((input, index) => (
        <div key={input.id} className="input-group">
          <h4>Person {index + 1}</h4>
          <input
            type="text"
            name="fullName"
            placeholder=" Full Name"
            value={input.fullName}
            onChange={(e) => handleInputChange(input.id, e)}
          />
          <input
            type="email"
            name="email"
            placeholder=" Email"
            value={input.email}
            onChange={(e) => handleInputChange(input.id, e)}
          />
          
        </div>
      ))}
      <div className="submit-button">
        <button onClick={handleSubmit} className="subi">Check-in</button>
      </div>
    </div>
  );
}

export default VisitorInput;
