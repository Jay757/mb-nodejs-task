import Product from '../models/product.js';
import Category from '../models/category.js';

export const createProduct = async (req, res) => {
    const { title, description, price, category } = req.body;

    try {
        // Check if the category exists
        const existingCategory = await Category.findById(category);

        if (!existingCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Create new product
        const newProduct = await Product.create({ title, description, price, category });

        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
};

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find().populate('category');
        res.send(products);
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (error) {
        next(error);
    }
};

export const searchProducts = async (req, res, next) => {
    try {
        const { title, category } = req.query;
        let query = {};
        if (title) {
            query.title = new RegExp(title, 'i');
        }
        if (category) {
            const foundCategory = await Category.findOne({ name: category });

            if (foundCategory) {
                query.category = foundCategory._id;
            } else {
                return res.status(404).json({ error: 'Category not found' });
            }
        }

        const products = await Product.find(query).populate('category');
        res.send(products);
    } catch (error) {
        next(error);
    }
};
