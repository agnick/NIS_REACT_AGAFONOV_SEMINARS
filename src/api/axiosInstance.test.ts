import axiosInstance from './axiosInstance';

describe('axiosInstance interceptors (асинхронный)', () => {
  test('добавляет baseURL и Authorization через request interceptor', async () => {
    const handler = (axiosInstance.interceptors.request as any).handlers[0];
    const config = await handler.fulfilled({
      headers: {},
    });

    expect(config.baseURL).toBe('https://jsonplaceholder.typicode.com');
    expect(config.headers.Authorization).toBe('Bearer demo-token');
  });
});
