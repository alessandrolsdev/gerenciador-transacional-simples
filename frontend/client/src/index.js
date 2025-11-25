import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// --- IMPORTAÇÕES DO RELAY ---
import { RelayEnvironment } from './RelayEnvironment';
import { RelayEnvironmentProvider } from 'react-relay';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // 1. O Provider conecta o Relay ao React
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    
    {/* 2. O Suspense segura a renderização enquanto os dados iniciais carregam */}
    <Suspense fallback={<div className="loading-fallback"><h1>Carregando dados...</h1></div>}>
      
      <React.StrictMode>
        <App />
      </React.StrictMode>
      
    </Suspense>

  </RelayEnvironmentProvider>
);
reportWebVitals();