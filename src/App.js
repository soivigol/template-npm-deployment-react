import React from 'react';

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
    <div className="min-h-screen bg-gray-100 py-8">
      <p>Hello world</p>
    </div>
  );
};

export default App;