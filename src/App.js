
import React, { useState } from 'react';
import axios from 'axios';
import { Octokit } from 'octokit';
import { Controlled as CodeMirror } from 'react-codemirror2';

// Importing CodeMirror CSS
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

// Importing CodeMirror addons
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/lint/lint.js';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('// Your generated code will appear here');
  const [status, setStatus] = useState('');

  const handleGenerateCode = async () => {
    try {
      setStatus('Generating code...');
      // Assume this is a function to get AI generated code
      const response = await axios.post('https://api.example-ai-service.com/generate', { prompt });
      setCode(response.data.code || '// Failed to generate code');
      setStatus('Code generated successfully!');
    } catch (error) {
      console.error(error);
      setStatus('Error generating code');
    }
  };

  const handleCommitToGithub = async () => {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    try {
      // Get the current file content and update
      const { data: { content: currentContent, sha } } = await octokit.rest.repos.getContent({
        owner: 'your-github-username',
        repo: 'your-repository',
        path: 'src/components/App.js',
      });

      const updatedContent = btoa(code); // Encode the new content

      setStatus('Committing code to GitHub...');
      await octokit.rest.repos.createOrUpdateFileContents({
        owner: 'your-github-username',
        repo: 'your-repository',
        path: 'src/components/App.js',
        message: 'Automated commit with new code',
        content: updatedContent,
        sha: sha,
      });

      setStatus('Code committed successfully!');
    } catch (error) {
      console.error(error);
      setStatus('Error committing code');
    }
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>Micro App Generator</h1>
      <div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here"
          rows="4"
          style={{ width: '100%', marginBottom: '10px' }}
        />
      </div>
      <button onClick={handleGenerateCode}>Generate Code</button>
      <h3>Status: {status}</h3>
      <div style={{ marginTop: '20px' }}>
        <CodeMirror
          value={code}
          options={{
            mode: 'javascript',
            theme: 'material',
            lineNumbers: true,
            gutters: ['CodeMirror-lint-markers'],
            lint: true,
          }}
          onBeforeChange={(editor, data, value) => setCode(value)}
        />
      </div>
      <button onClick={handleCommitToGithub} style={{ marginTop: '20px' }}>
        Commit to GitHub
      </button>
    </div>
  );
};

export default App;
