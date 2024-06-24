import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import Category from '../models/category.js';

describe('Category API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });
    afterEach(async () => {
        await Category.deleteMany({});
    });

    describe('POST /categories', () => {
        it('should create a new category', async () => {
            const response = await request(app).post('/categories').send({ name: 'Electronics' });
            expect(response.statusCode).toBe(201);
            expect(response.body.name).toBe('Electronics');
        });

        it('should return 400 if name is missing', async () => {
            const response = await request(app).post('/categories').send({});
            expect(response.statusCode).toBe(400);
        });

        it('should return 400 if category name is less than 3 characters', async () => {
            const response = await request(app).post('/categories').send({ name: 'E' });
            expect(response.statusCode).toBe(400);
        });

        it('should return 400 if category name is not unique', async () => {
            // Create a category with the name 'Electronics' initially
            await Category.create({ name: 'Electronics1' });

            // Attempt to create another category with the same name
            const response = await request(app).post('/categories').send({ name: 'Electronics1' });

            // Expecting a 400 status code due to duplicate name
            expect(response.statusCode).toBe(400);
        });
    });

    describe('PUT /categories/:id', () => {
        it('should update a category', async () => {
            const category = await Category.create({ name: 'Electronics' });

            const response = await request(app).put(`/categories/${category._id}`).send({ name: 'Updated Electronics' });
            expect(response.statusCode).toBe(200);
            expect(response.body.name).toBe('Updated Electronics');
        });

        it('should return 404 if category not found', async () => {
            const invalidId = mongoose.Types.ObjectId();
            const response = await request(app).put(`/categories/${invalidId}`).send({ name: 'Updated Electronics' });
            expect(response.statusCode).toBe(404);
        });
    });
});
