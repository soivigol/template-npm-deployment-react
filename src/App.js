import React, { useState } from 'react';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('');
  const [response, setResponse] = useState(null);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleTextareaChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const aiResponse = await fetch('/generate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await aiResponse.json();
      setCode(data.code);
      setResponse('Code generated successfully!');
    } catch (error) {
      setResponse('Error generating code.');
    }
  };

  const handleCommit = async () => {
    try {
      const commitResponse = await fetch('/commit-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await commitResponse.json();
      setResponse(data.message);
    } catch (error) {
      setResponse('Error committing code.');
    }
  };

  return (
    <div>
      <h1>Micro App Generator</h1>
      <textarea
        value={prompt}
        onChange={handlePromptChange}
        placeholder="Enter a prompt"
        cols="50"
        rows="4"
      />
      <button onClick={handleSubmit}>Generate Code</button>
      <textarea
        value={code}
        onChange={handleTextareaChange}
        placeholder="Generated code"
        cols="50"
        rows="10"
      />
      <button onClick={handleCommit}>Commit to GitHub</button>
      {response && <p>{response}</p>}
    </div>
  );
};

export default App;