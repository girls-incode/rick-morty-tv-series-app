import express, {
    Application,
    NextFunction,
    Request,
    Response,
} from 'express';
import mongoose from 'mongoose';
import supertest from 'supertest';
// import app from 'app';

beforeEach((done) => {
    mongoose.connect(
        process.env.MONGODB_URI || '',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        },
        () => done()
    )
});

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    })
});

test("GET /", async () => {
    await supertest(app)
        .get("/")
        .expect(200)
        .then((response) => {
            console.log(response.body);
            
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toEqual(2);

            expect(response.body[0].a).toBe(1);
            expect(response.body[0].b).toBe(2);
            expect(response.body[1].a).toBe(4);
        });
});
