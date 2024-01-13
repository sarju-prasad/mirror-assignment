// Manage routes/paths to ProductController

// 1. Import express.
import express, { Router } from 'express';
import ProductController from './product.controller.js';
// 2. Initialize Express router.
const productRouter = express.Router();

const productController = new ProductController();

// All the paths to controller methods.
// localhost/api/products

productRouter.delete(
  '/delete/:id',
  (req, res)=>{
    productController.deleltProduct(req, res)
 }
);
productRouter.put(
  '/update',
  (req, res)=>{
    productController.updateProduct(req, res)
 }
);
productRouter.get(
  '/',
  (req, res)=>{
    productController.getAllProducts(req, res)
 }
);
productRouter.post(
  '/',
  (req, res)=>{
    productController.addProduct(req, res)
 }
);
productRouter.get(
  '/',
  (req, res)=>{
    productController.getOneProduct(req, res)
 }
 
);
productRouter.post('/variant',(req,res)=>{
  productController.addVariantProduct(req,res);
})

productRouter.get('/filter',(req,res)=>{
  productController.filterProducts(req,res);
})

productRouter.put('/updateVariant',(req,res)=>{
  productController.updateVariantHandler(req,res);
});
productRouter.delete('/deleteVariant',(req,res)=>{
  productController.deleteVariantHandler(req,res);
})

productRouter.get('/getAllVariant',(req,res)=>{
  productController.getAllVariantHandler(req,res);
})
export default productRouter;
  