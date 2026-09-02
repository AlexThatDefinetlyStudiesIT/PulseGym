import React, { useEffect, useState } from 'react';

const ConsoleLogger = () => {
  const [log, setLog] = useState<string | null>(null); // Defining log as nullable string

  useEffect(() => {
    const oldLog = console.log;
    console.log = (...args: any[]) => { 
      setLog(args.join(' '));

      setTimeout(() => {
        setLog(null);
      }, 5000);

      oldLog(...args);
    };
  }, []);

  return (
    <div>
      {log && (
        <div style={{ border: '1px solid #c33149', backgroundColor:'black', padding: '10px', margin: '10px', borderRadius: '5px' }}>
          <h2 style={{ color: '#c33149' }}>Ошибка:</h2>
          <p style={{ color: '#c33149' }}>{log}</p>
        </div>
      )}
    </div>
  );
};

export default ConsoleLogger;
