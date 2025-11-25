// resolvers.test.js

// Importa os resolvers e os dados mockados
const { rootResolver } = require('./resolvers');
const { mockUsers } = require('./mockDb'); 

// Usaremos 'describe' para agrupar testes
describe('Mutations CRUD Logic', () => {

  // Teste 1: Verificar se a criação funciona (C de CRUD)
  test('should create a new user and add it to the mock database', () => {
    // Definimos os argumentos que a mutation createUser receberá
    const args = {
      name: 'Test User',
      email: 'test@example.com',
    };
    
    const initialCount = mockUsers.length; // Deve ser 2
    
    // 1. Executa o resolver
    const newUser = rootResolver.createUser(args);

    // 2. Verifica se a lógica funcionou
    
    // O array mockUsers DEVE ter crescido em 1
    expect(mockUsers.length).toBe(initialCount + 1); 

    // O objeto retornado DEVE ter o nome e email corretos
    expect(newUser.name).toBe('Test User');
    expect(newUser.email).toBe('test@example.com');
  });

  // Teste 2: Verificar se a exclusão funciona (D de CRUD)
  test('should delete the last created user', () => {
    // Sabendo que o último usuário criado terá o ID mais alto (4)
    const userIdToDelete = String(mockUsers.length);
    const initialCount = mockUsers.length;

    // 1. Executa o resolver de deleção
    const deletedUser = rootResolver.deleteUser({ id: userIdToDelete });

    // 2. Verifica se a lógica funcionou
    
    // O array mockUsers DEVE ter diminuído em 1
    expect(mockUsers.length).toBe(initialCount - 1); 

    // O objeto retornado DEVE ser o usuário que foi removido
    expect(deletedUser.id).toBe(userIdToDelete);
  });
});