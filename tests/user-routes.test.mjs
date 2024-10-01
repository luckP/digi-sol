import request from 'supertest';
import app from '../app'; // Adjust this path according to your structure

describe('User Routes', () => {
  it('should return a list of users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
  });
});
