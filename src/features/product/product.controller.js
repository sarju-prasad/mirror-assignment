import ProductRepository from "./product.repository.js";
export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }
  //find the all product
  async getAllProducts(req, res) {
    try {
      const products = await this.productRepository.getAll();
      res.status(200).send(products);
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }
  //adding the object in the variant 
  async addVariantProduct(req,res){
    try{
      const {productId,variantName,sku,additionalPrice,stockCount}=req.body;
      const newVariant={
        name:variantName,
        sku,
        additionalPrice:parseFloat(additionalPrice),
        stockCount
      }
      if (!productId) {
        return res.status(404).send("Product is not found");
      }
      const createVariant=await this.productRepository.addVariant(productId,newVariant);
      res.status(200).send(createVariant);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong adding the Variant");
    }
  }
  // adding the prodcut 
  async addProduct(req, res) {
    try {
      const { name, price, description } = req.body;
      const newProduct = {
        name,
        description,
        price: parseFloat(price),
      };
      const createdProduct = await this.productRepository.add(newProduct);
      res.status(201).send(createdProduct);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong adding the product");
    }
  }
  // deleting the product from the product
  async deleltProduct(req, res) {
    try {
      const productId = req.params.id;
      if (!productId) {
        res.status(404).send("Product is not found");
      } else {
        await this.productRepository.delete(productId);
        res.status(200).send("Product is deleted");
      }
        
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  //updating one product using productID
  async updateProduct(req,res){
   try {
    const {name,price,description, productID}=req.body;
    if(!productID){
      res.status(404).send("Product is not found");
      
    }
    else{
      await this.productRepository.update(productID,name,price,description);
      res.status(201).send("Product is updated");
    }
   } catch (err) {
    console.log(err);
    return res.status(200).send("Something went wrong");
   }
  }
  // Route handler for updating a variant
  async updateVariantHandler(req, res) {
  try {
    const { name, additionalPrice, sku, stockCount, productId, variantId } = req.body;
    if (!productId) {
      return res.status(404).send("Product is not found");
    }

    if (!variantId) {
      return res.status(404).send("Variant is not found");
    }

    const variant = {
      productId,
      variantId,
      name,
      additionalPrice,
      sku,
      stockCount,
    };

    await this.productRepository.updateVariant(variant);
    return res.status(200).send("Variant is updated");
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode || 500).send(err.message || "Something went wrong");
  }
} 
 
  //find the one product using req.param.id
  async getOneProduct(req, res) {
    try {
      const id = req.body;
      const product = await this.productRepository.get(id);
      if (!product) {
        res.status(404).send("Product not found");
      } else {
        return res.status(200).send(product);
      }
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }
  //get all the variant product
  async getAllVariantHandler(req,res){
    try {
      const variant = await this.productRepository.getAllVariant();
      res.status(200).send(variant);
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }
  //Filter the Product using productName, productName and description
  async filterProducts(req, res) {
    try{
    const{productName,variantName,description}=req.body;
    const filterProduct={
    }
    if(productName){
      filterProduct.productName=productName
    }
    if(variantName){
      filterProduct.variantName=variantName
    }
    if(description){
      filterProduct.description=description
    }
    const result = await this.productRepository.filter(filterProduct);
    res.status(200).send(result);
    }catch(err){
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }
  
  // Delete one variant route handler
  async deleteVariantHandler(req, res) {
    try {
      const { productId, variantId } = req.body;

      if (productId) {
        if (!variantId) {
          return res.status(404).send("Variant is not found");
        } else {
          await this.productRepository.deleteVariant(variantId);
          return res.status(204).send("Varaint deleting successfuly"); 
        }
      } else {
        return res.status(404).send("Product is not found");
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send("Something went wrong");
    }
  }  
}
