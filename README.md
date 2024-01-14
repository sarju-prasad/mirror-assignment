# mirror-assignment
#First install all the dependencies using-> npm install
#then run the project usnig command-> npm start
1-> Add the product in the ProductModel
http://localhost:3200/api/products
inputs-> {
    "name":"Andriod Phone",
    "description":"Created by apple",
    "price":12000
}
o/p->{"name":"Andriod Phone","description":"Created by apple","price":12000,"_id":"65a3654a20087d225607443e","__v":0}

2->Find the all the product from the ProductModel
http://localhost:3200/api/products
o/p
[
    {
        "_id": "65a13d12386c1368abe90cff",
        "name": "Customer1",
        "description": "customer type product",
        "price": 123,
        "__v": 0
    },
    {
        "_id": "65a151fc10ad4c8e657c1ed7",
        "name": "Customer1",
        "description": "seller",
        "price": 1100,
        "__v": 0
    },
    {
        "_id": "65a2bf88da78cce581566edb",
        "name": "iphone",
        "description": "Created by apple",
        "price": 1000,
        "__v": 0
    },
    {
        "_id": "65a3654a20087d225607443e",
        "name": "Andriod Phone",
        "description": "Created by apple",
        "price": 12000,
        "__v": 0
    }
]

3->deleting the product from the ProductModel
http://localhost:3200/api/products/delete/65a13d12386c1368abe90cff
o/p->Product is deleted
remaining Product->  
[
    {
        "_id": "65a151fc10ad4c8e657c1ed7",
        "name": "Customer1",
        "description": "seller",
        "price": 1100,
        "__v": 0
    },
    {
        "_id": "65a2bf88da78cce581566edb",
        "name": "iphone",
        "description": "Created by apple",
        "price": 1000,
        "__v": 0
    },
    {
        "_id": "65a3654a20087d225607443e",
        "name": "Andriod Phone",
        "description": "Created by apple",
        "price": 12000,
        "__v": 0
    }
]  
4-> updatig the product
input->
{
    "productID":"65a2bf88da78cce581566edb",
    "name":"book",
    "price":100,
    "description":"seller"
}
http://localhost:3200/api/products/update
o/p-> Product is updated
   {
        "_id": "65a2bf88da78cce581566edb",
        "name": "book",
        "description": "seller",
        "price": 100,
        "__v": 0
    },






