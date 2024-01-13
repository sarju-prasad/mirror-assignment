// 1. Import Exprerss
import express from 'express';
import productRouter from './src/features/product/product.routes.js';
import { ApplicationError } from './src/error-handler/applicationError.js';
import {connectUsingMongoose} from './src/config/mongodb.js';
// 2. Create Server
const server = express();


server.use(express.json());
server.use(
  '/api/products',
  
  productRouter
);


// 3. Default request handler
server.get('/', (req, res) => {
  res.send('Welcome to Ecommerce APIs');
});

// Error handler middleware
server.use((err, req, res, next)=>{
  console.log(err);
  if (err instanceof ApplicationError){
    res.status(err.code).send(err.message);
  }

  // server errors.
  res
  .status(500)
  .send(
    'Something went wrong, please try later'
    );
});

// 4. Middleware to handle 404 requests.
server.use((req, res)=>{
  res.status(404).send("API not found. Please check our documentation for more information at localhost:3200")
});


// 5. Specify port.
server.listen(3200, ()=>{
  console.log('Server is running at 3200');
  connectUsingMongoose();

});

