const pg = require('pg');
const initializePostgresClient = require('./initializePostgresClient');

jest.mock('pg');

describe('initializePostgresClient', () => {
  test('returns client instance if successful', async () => {
    const mockClientInstance = {
      connect: async () => {
        return undefined;
      }
    };
    pg.Client.mockReturnValueOnce(mockClientInstance);

    const result = await initializePostgresClient();
    expect(result).toStrictEqual(mockClientInstance);
  });

  test('throws error if unsuccessful', async () => {
    const mockClientInstance = {
      connect: async () => {
        throw new Error();
      },
    };
    pg.Client.mockReturnValueOnce(mockClientInstance);

    try {
      await initializePostgresClient();
    } catch ({ message }) {
      expect(message).toMatch('error connecting to postgres');
    }
  });
});
