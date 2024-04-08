import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
    <div>
      <h2>Scanned Result: {result}</h2>
      {inputs.map((input) => (
        <div key={input.id}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={input.fullName}
            onChange={(e) => handleInputChange(input.id, e)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={input.email}
            onChange={(e) => handleInputChange(input.id, e)}
          />
        </div>
      ))}
      <button onClick={handleAddInput}>+</button>
      <button onClick={handleRemoveInput}>-</button>
      <button onClick={handleSubmit}>Check-in</button>
    </div>
  );
}

export default VisitorInput;
