1. Clone the repository:
    ```sh
    git clone https://github.com/Jay757/mb-nodejs-task.git
    cd mb-nodejs-task
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root of the project and add your MongoDB URI:
    ```
    MONGO_URI=your_mongo_uri
    PORT=5000
    ```

4. Start the server:
    ```sh
    npm start
    ```

5. The API will be running on `http://localhost:5000`.

## Endpoints

### Categories
- `POST /categories` - Create a new category
- `PUT /categories/:id` - Update an existing category

### Products
- `POST /products` - Create a new product
- `GET /products` - Get all products
- `GET /products/search` - Search products by title or category
- `GET /products/:id` - Get a product by ID
- `PUT /products/:id` - Update a product by ID
- `DELETE /products/:id` - Delete a product by ID

## Running Tests

Run the tests using Jest:
```sh
npm test
- In Test I used the following current db instance we can also use test DB instance