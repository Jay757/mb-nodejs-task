import mongoose from 'mongoose';
import Category from '../models/category.js';

export const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        // Check if a category with the same name already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ error: 'Category name must be unique' });
        }

        // If category name is unique, create and save the category
        const category = new Category({ name });
        await category.save();
        
        res.status(201).send(category);
    } catch (error) {
        next(error); // Pass any errors to the error handler middleware
    }
};

export const updateCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!category) {
            return res.status(404).send();
        }
        res.send(category);
    } catch (error) {
        next(error);
    }
};

export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};