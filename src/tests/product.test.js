import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import Product from '../models/product.js';
import Category from '../models/category.js';

describe('Product API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await Product.deleteMany({});
        await Category.deleteMany({});
    });

    describe('POST /products', () => {
        it('should create a new product', async () => {
            const category = await Category.create({ name: 'ElectronicsENv' });

            const response = await request(app).post('/products').send({
                title: 'Laptop',
                description: 'A high-end laptop',
                price: 1500,
                category: category._id
            });

            expect(response.statusCode).toBe(201);
            expect(response.body.title).toBe('Laptop');
        });

        it('should return 400 if required fields are missing', async () => {
            const response = await request(app).post('/products').send({
                description: 'A high-end laptop',
                price: 1500
            });

            expect(response.statusCode).toBe(400);
        });

        it('should return 404 if category does not exist', async () => {
            const nonExistentCategoryId = mongoose.Types.ObjectId(); // Generate a non-existent ObjectId

            const response = await request(app)
                .post('/products')
                .send({
                    title: 'Laptop',
                    description: 'A high-end laptop',
                    price: 1500,
                    category: nonExistentCategoryId
                });

            expect(response.statusCode).toBe(404);
        });
    });

    describe('GET /products', () => {
        it('should get all products', async () => {
            const category = await Category.create({ name: 'Electronics' });
            await Product.create({ title: 'Laptop', description: 'A high-end laptop', price: 1500, category: category._id });

            const response = await request(app).get('/products');
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0].title).toBe('Laptop');
        });
    });

    describe('GET /products/:id', () => {
        it('should get a product by ID', async () => {
            const category = await Category.create({ name: 'Electronics' });
            const product = await Product.create({ title: 'Laptop', description: 'A high-end laptop', price: 1500, category: category._id });

            const response = await request(app).get(`/products/${product._id}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.title).toBe('Laptop');
        });

        it('should return 404 if product not found', async () => {
            const invalidId = mongoose.Types.ObjectId();
            const response = await request(app).get(`/products/${invalidId}`);
            expect(response.statusCode).toBe(404);
        });
    });

    describe('PUT /products/:id', () => {
        it('should update a product', async () => {
            const category = await Category.create({ name: 'Electronics' });
            const product = await Product.create({ title: 'Laptop', description: 'A high-end laptop', price: 1500, category: category._id });

            const response = await request(app).put(`/products/${product._id}`).send({
                title: 'Updated Laptop',
                description: 'An updated high-end laptop',
                price: 1600,
                category: category._id
            });

            expect(response.statusCode).toBe(200);
            expect(response.body.title).toBe('Updated Laptop');
        });

        it('should return 404 if product not found', async () => {
            const invalidId = mongoose.Types.ObjectId();
            const response = await request(app).put(`/products/${invalidId}`).send({
                title: 'Updated Laptop'
            });

            expect(response.statusCode).toBe(404);
        });
    });

    describe('DELETE /products/:id', () => {
        it('should delete a product', async () => {
            const category = await Category.create({ name: 'Electronics' });
            const product = await Product.create({ title: 'Laptop', description: 'A high-end laptop', price: 1500, category: category._id });

            const response = await request(app).delete(`/products/${product._id}`);
            expect(response.statusCode).toBe(200);
        });

        it('should return 404 if product not found', async () => {
            const invalidId = mongoose.Types.ObjectId();
            const response = await request(app).delete(`/products/${invalidId}`);
            expect(response.statusCode).toBe(404);
        });
    });

});
