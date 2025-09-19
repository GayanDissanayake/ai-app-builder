import React, { useState } from "react";

const RequirementInputForm = () => {
  const [input, setInput] = useState("");
  const [requirements, setRequirements] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setRequirements(input);
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #eee",
        borderRadius: 8,
      }}
    >
      <h2>Requirement Capture Portal</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setInput(e.target.value)
          }
          rows={6}
          style={{ width: "100%", marginBottom: "1rem", fontSize: "1rem" }}
          placeholder="Paste or type requirements here..."
        />
        <button
          type="submit"
          style={{ padding: "0.5rem 1.5rem", fontSize: "1rem" }}
        >
          Submit
        </button>
      </form>
      {requirements && (
        <div
          style={{
            marginTop: "2rem",
            background: "#f9f9f9",
            padding: "1rem",
            borderRadius: 6,
          }}
        >
          <h3>Extracted Requirements</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{requirements}</pre>
        </div>
      )}
    </div>
  );
};

export default RequirementInputForm;
