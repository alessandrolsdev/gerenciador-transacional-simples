import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { RelayEnvironment } from './RelayEnvironment';
import { RelayEnvironmentProvider } from 'react-relay';

/**
 * Inicializa a raiz da aplicação React.
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * Renderiza a aplicação envolvida no RelayEnvironmentProvider e Suspense.
 * 
 * - RelayEnvironmentProvider: Conecta o ambiente Relay à árvore de componentes React.
 * - Suspense: Gerencia o estado de carregamento enquanto os dados estão sendo buscados.
 * - React.StrictMode: Destaca problemas potenciais em uma aplicação.
 */
root.render(
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <Suspense fallback={<div className="loading-fallback"><h1>Carregando dados...</h1></div>}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Suspense>
  </RelayEnvironmentProvider>
);

reportWebVitals();
