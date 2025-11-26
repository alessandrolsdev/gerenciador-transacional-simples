import { render, screen } from '@testing-library/react';
import App from './App';

/**
 * Teste básico do componente App.
 * Verifica se o componente renderiza corretamente.
 * 
 * @note Este é um teste gerado automaticamente pelo Create React App.
 * Considere adicionar testes mais específicos baseados nas funcionalidades da aplicação.
 */
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
