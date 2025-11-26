const { rootResolver } = require('./resolvers');
const { mockUsers } = require('./mockDb'); 

/**
 * Suíte de testes para Resolvers de Mutation GraphQL.
 * Verifica as operações CRUD para usuários.
 */
describe('Mutations CRUD Logic', () => {

  /**
   * Caso de Teste: Criar Usuário
   * Verifica se um novo usuário é criado corretamente e adicionado ao banco de dados simulado.
   */
  test('should create a new user and add it to the mock database', () => {
    const args = {
      name: 'Test User',
      email: 'test@example.com',
    };
    
    const initialCount = mockUsers.length;
    
    // Executa o resolver
    const newUser = rootResolver.createUser(args);

    // Verifica os efeitos colaterais e o valor de retorno
    expect(mockUsers.length).toBe(initialCount + 1); 
    expect(newUser.name).toBe('Test User');
    expect(newUser.email).toBe('test@example.com');
  });

  /**
   * Caso de Teste: Excluir Usuário
   * Verifica se um usuário é removido corretamente do banco de dados simulado pelo ID.
   */
  test('should delete the last created user', () => {
    // Assumindo que o último usuário criado tem o ID mais alto
    const userIdToDelete = String(mockUsers.length);
    const initialCount = mockUsers.length;

    // Executa o resolver de exclusão
    const deletedUser = rootResolver.deleteUser({ id: userIdToDelete });

    // Verifica os efeitos colaterais e o valor de retorno
    expect(mockUsers.length).toBe(initialCount - 1); 
    expect(deletedUser.id).toBe(userIdToDelete);
  });
});