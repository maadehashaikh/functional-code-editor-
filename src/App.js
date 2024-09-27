import React, { useState, useEffect } from 'react';
import CodeDiv from './components/CodeDiv';
import { HTMLHint } from 'htmlhint'; 
import { CSSLint } from 'csslint';   
import { JSHINT } from 'jshint';

// Basic HTML template
const basicHTML = `<!DOCTYPE html>
<html>
<body>
    <h1>Hello, World!</h1>
</body>
</html>`;

// Debounce function
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

// Main App component
function App() {
  const [html, setHtml] = useState(basicHTML);
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [srcDoc, setSrcDoc] = useState('');
  const [htmlError, setHtmlError] = useState('');
  const [cssError, setCssError] = useState('');
  const [jsError, setJsError] = useState('');

  useEffect(() => {
    const validateCode = () => {
      // HTML validation
      const results = HTMLHint.verify(html);
      const newHtmlError = results.length > 0 ? results[0].message : '';

      // CSS validation
      const cssResults = CSSLint.verify(css);
      const newCssError = cssResults && cssResults.messages.length > 0 ? cssResults.messages[0].message : '';

      // JavaScript validation
      // Adding the JSHint directive as a comment
      JSHINT(`/* jshint esversion: 6 */\n${js}`);
      const newJsError = JSHINT.errors.length > 0 ? JSHINT.errors[0].reason : '';

      // Update state in a single call
      setHtmlError(newHtmlError);
      setCssError(newCssError);
      setJsError(newJsError);

      // Update srcDoc with a timeout
      const timeout = setTimeout(() => {
        setSrcDoc(`
          <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${js}</script>
          </html>
        `);
      }, 250);
      return () => clearTimeout(timeout);
    };

    // Debounced validation function
    const debouncedValidate = debounce(validateCode, 300);
    debouncedValidate(); // Call the debounced function
  }, [html, css, js]);

  return (
    <>
      <h1 className='bg-slate-600 text-white text-3xl text-center p-2'> 
        Functional Code Editor 
      </h1>
      <div className='flex'> 
        <div className='w-[50%] bg-slate-600 h-[91vh] flex flex-col justify-center items-center'>
          <CodeDiv placeholder="Enter HTML code here" onChange={setHtml} error={htmlError} value={html}/>
          {htmlError && <p className="text-blue-400">{htmlError}</p>}
          <CodeDiv placeholder="Enter CSS code here" onChange={setCss} error={cssError}/>  
          {cssError && <p className="text-blue-400">{cssError}</p>}
          <CodeDiv placeholder="Enter JavaScript code here" onChange={setJs} error={jsError}/>
          {jsError && <p className="text-blue-400">{jsError}</p>}
        </div>
        <div className='w-[50%] bg-slate-600 h-[91vh] border-white border border-2 rounded'>   
          <iframe
            className='w-[100%] h-[100%]'
            srcDoc={srcDoc}
            sandbox="allow-scripts"
            title="output"
          />
        </div>
      </div>
    </> 
  );
}
export default App;
