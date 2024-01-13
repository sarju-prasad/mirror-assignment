import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { productSchema } from "../model/product.schema.js";
import { variantSchema } from "../model/variant.schema.js";
const ProductModel = mongoose.model("Product", productSchema);
const VariantModel = mongoose.model("Variant", variantSchema);
class ProductRepository {
  //adding the product
  async add(product) {
    try {
      const newProduct = new ProductModel(product);
      await newProduct.save();
      return newProduct;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  //Adding the product int variant
  async addVariant(productId, variantProduct) {
    try {
      const newVariant = new VariantModel({
        ...variantProduct,
        productId: new ObjectId(productId),
      });
      await newVariant.save();
      return newVariant;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  //Find the all the Product
  async getAll() {
    try {
      const products = await ProductModel.find();
      return products;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  //find the one product
  async get(id) {
    try {
      return await ProductModel.findOne({ _id: new ObjectId(id) });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  //getAll the variant
  async getAllVariant(){
    try {
      const variantProduct = await VariantModel.find();
      return variantProduct;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  //filter the product using Product Name ,Varaint Name,price and description
  async filter(filterProduct) {
    try {
      const obj={}
      if(filterProduct.description){
        obj.description=filterProduct.description
      }
      if(filterProduct.productName){
        obj.productName=filterProduct.productName
      }
      const productResult = await ProductModel.find(obj);
      const variantResult = await VariantModel.find({name:filterProduct.variantName});
      console.log("Product result->",productResult);

      console.log("varian readoih->",variantResult);
      if (productResult.length > 0) {
        return {...productResult};
      }
  
      if (variantResult.length > 0) {
        return {...variantResult};
      }
  
      return { products, variants}; 
    } catch (err) {
      console.error(err);
      throw new ApplicationError("Something went wrong with the database", 500);
    }
  }
  

  //Deleting one product
  async delete(productId) {
    try {
      return await ProductModel.deleteOne({ _id: new ObjectId(productId) });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  //updating the one product
  async update(productId, name, price, description) {
    try {
      const existingProdut = await ProductModel.findOne({
        _id: new ObjectId(productId),
      });
      if (!name) {
        name = existingProdut.name;
      }
      if (isNaN(parseFloat(price))) {
        price = existingProdut.price;
      }
      if (!description) {
        description = existingProdut.description;
      }
      await ProductModel.updateOne(
        { _id: new ObjectId(productId) },
        {
          name: name,
          price: parseFloat(price),
          description: description,
        }
      );
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  //update variant
  async updateVariant(variant) {
    try {
      const existingVariant = await VariantModel.findOne({
        _id: new ObjectId(variant.variantId),
      });

      if (!existingVariant) {
        throw new ApplicationError("Variant not found", 404);
      }

      // Update only if the new value is provided, otherwise keep the existing value
      variant.name = variant.name || existingVariant.name;
      variant.additionalPrice = isNaN(parseFloat(variant.additionalPrice))
        ? existingVariant.additionalPrice
        : variant.additionalPrice;
      variant.sku = variant.sku || existingVariant.sku;
      variant.stockCount = variant.stockCount || existingVariant.stockCount;

      await VariantModel.updateOne(
        { _id: new ObjectId(variant.variantId) },
        {
          $set: {
            ...variant,
          },
        }
      );    

      console.log("Variant updated successfully");
    } catch (err) {
      console.error(err);
      throw new ApplicationError("Something went wrong with the database", 500);
    }
  }

  //Delete one variant
  async deleteVariant(variantId) {
    try {
      return await VariantModel.deleteOne({ _id: new ObjectId(variantId) });
    } catch (err) {
      console.error(err);
      throw new ApplicationError("Something went wrong with the database", 500);
    }
  }
    
}

export default ProductRepository;
