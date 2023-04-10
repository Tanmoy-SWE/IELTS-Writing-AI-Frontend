import React, { useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import Note from './Note';

function App() {
  const [topic, setTopic] = useState('');
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic,
        input_text: inputText, // change to inputText
      }),
    };
  
    setIsLoading(true);
    const response = await fetch(
      'https://writingtest-rbarohit.pythonanywhere.com/generate_text',
      requestOptions
    );
    const data = await response.json();
    let final_result = data['generated_text:'];
    console.log(final_result)
    setResult(final_result); // remove object notation
    setIsLoading(false);
  };
  

  return (
    <div>
      <Navbar />
      <Note />
      <div className="container">
        <h1>IELTS WRITING Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="input-text"><h2>Question</h2></label>
            <textarea 
              type="text"
              id="input-text"
              name="input-text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your Question here" 
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="input-text"><h2>Answer</h2></label>
            <textarea
              id="input-text"
              name="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your answer here"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <button type="submit" disabled={isLoading}>{isLoading ? 'Generating...' : 'Generate Result'}</button>
          </div>
        </form>
        {result && (
          <div className="result-container">
            <h1>EVALUATION</h1>
            <form>
              <div className="result-title">
              </div>
              <div className="result-box">
                <b><h1>Question</h1></b>
                <p>{topic}</p>
              </div>
              <div className="result-box">
                <b><h1>Your Answer</h1></b>
                <p>{inputText}</p>
              </div>
              <div className="result-box">
                <b><h1>Score and Suggested Answer</h1></b>
                <p>{result}</p>
              </div>
            </form>
          </div>
        )}
      </div>
      <footer className="footer">
        <p>&copy; IELTS WRITING 2023</p>
      </footer>
    </div>
  );
}

export default App;
