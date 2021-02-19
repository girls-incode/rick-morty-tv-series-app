import mongoose from 'mongoose';
import request from 'supertest';
import User from './models/user';
import app from './app';

beforeAll(async () => {
    await User.deleteMany({});
});

afterAll(() => {
    mongoose.connection.close()
});

describe('Database', () => {
    /**
        states:
        '0': 'disconnected',
        '1': 'connected',
        '2': 'connecting',
        '3': 'disconnecting',
        '99': 'uninitialized',
    */
    it('It should return the connected readyState', async () => {
        expect(mongoose.connection.readyState).toBe(1);
    });
});

describe('User', () => {
    it('It should return 404 "Not found" response for unimplemented routes', () => {
        return request(app)
            .get('/')
            .then((response) => {
                expect(response.status).toBe(404);
            });
    });

    it('It should forbbid non-loggedin users', async () => {
        await request(app)
            .get('/api/v1/users/44')
            .expect('Content-Type', /json/)
            .expect(403, { message: 'forbidden' });
    });

    describe('Register', () => {
        it('It should register an user', async () => {
            const res = await request(app).post('/api/v1/users/register')
                .send({
                    name: 'mary',
                    email: 'maria@gmail.com',
                    password: 'maria123456'
                });
            const { name, email, favorites, id, jwtToken, refreshToken } = res.body;
            expect(res.status).toBe(200);
            expect(name).toBe('mary');
            expect(email).toBe('maria@gmail.com');
            expect(favorites).toStrictEqual([]);
            expect(jwtToken).not.toBe('');
            expect(refreshToken).not.toBe('');
            expect(id).not.toBe('');
        });

        it('It shouldn\'t register an existing user', async () => {
            const res = await request(app).post('/api/v1/users/register')
                .send({
                    name: 'mary',
                    email: 'maria@gmail.com',
                    password: 'maria123456'
                })
                .expect(409, { message: 'User already exists' });
        })
    });

    describe('Login', () => {
        let res: any;

        it('It should give 200 status response', async () => {
            res = await request(app).post('/api/v1/users/login')
                .send({
                    email: 'maria@gmail.com',
                    password: 'maria123456'
                });
            expect(res.status).toBe(200);
        });

        it('It should give a json format response', () => {
            expect(res.header['content-type']).toEqual(expect.stringMatching(/^application\/json.*/))
        });

        it('It should return user data and 2 tokens', () => {
            const { name, email, favorites, id, jwtToken } = res.body;
            expect(name).toBe('mary');
            expect(email).toBe('maria@gmail.com');
            expect(favorites).toBeDefined();
            expect(jwtToken).not.toBe('');
            expect(id).not.toBe('');
        });

        it('It gives error when email or password is incorrect', async () => {
            await request(app)
                .post('/api/v1/users/login')
                .send({
                    email: 'zzzz@gmail.com',
                    password: 'hhhhh123456'
                })
                .expect(403, { message: 'Email or password is incorrect' });
        })
    });
});
