//Create db di mongo (sementara)
use belajar;
use hello;
use mongodb;

//Basic mongo
db.dropDatabase();
db.getName();
db.hostInfo();
db.version();
db.stats();
db.getCollectionNames();
db.getCollection("products");
db.getCollectionInfos();
db.customers.find()

//Create collection
db.createCollection("customers");
db.createCollection("products");
db.createCollection("orders");

//Insert document
db.customers.insertOne({
    _id: "hasan",
    name : "M. Hasan"
})

db.customers.insertOne({
    _id: "musa",
    name : "musa"
})

db.products.insertMany([
    {
        _id: 1,
        name: "Bakso sapi asli",
        price: new NumberLong("15000")
    },
    {
        _id: 2,
        name: "Mie ayam sukabumi",
        price: new NumberLong("12000")
    }
])

db.products.insertMany([
    {
        _id: 3,
        name: "Susu sapi segar 1L",
        price: new NumberLong("120000"),
        category: "Minuman"
    },
    {
        _id: 4,
        name: "Iphone 16 Pro Black",
        price: new NumberLong("22000000"),
        category: "Hp"
    },
    {
        _id: 5,
        name: "Macbook M3 Pro 16/512",
        price: new NumberLong("35000000"),
        category: "Laptop"
    }
])

db.products.insertMany([
    {
        _id: 6,
        name: "Mouse Logimech AB90 Bloetooth",
        price: new NumberLong("180000"),
        category: "Laptop",
        tags: ["logimech", "mouse", "accessories"]
    },
    {
        _id: 7,
        name: "Pendingin Sumsang Gaming 50cc",
        price: new NumberLong("210000"),
        category: "Laptop",
        tags: ["pendingin", "laptop", "accessories", "fan"]
    },
    {
        _id: 8,
        name: "Monitor GL 32inch full hd",
        price: new NumberLong("3000000"),
        category: "computer",
        tags: ["GL", "monitor", "komputer"]
        }
])

db.orders.insertOne(
    {
    _id: new Object(),
    total: new NumberLong("39000"),
    items: [
        {
            product_id: 1,
            price: new NumberLong("15000"),
            quantity: new NumberInt("1")
        },
        {
            product_id: 2,
            price: new NumberLong("12000"),
            quantity: 2
        }
    ]
})

//Query document
db.customers.find({
    _id: "hasan"
})

db.products.find({
    price: 12000
})

db.orders.find({
    "items.product_id": 1
})

//Comparison operator
//$eq = equal                 $lte = less than equal
//$gt = greater than          $in = in
//$gte = greater than equal   $nin = not in
//$lt = less than             $ne = not equal
db.customers.find({
    _id: {
        $eq: "hasan"
    }
})

db.products.find({
    price: {
        $gt: 50000
    }
})

db.products.find({
    category: {
        $in: ["Hp", "Laptop"]
    }
})

db.products.find({
    category: {
        $in: ["Hp", "Laptop"]
    },
    price: {
        $gt: 22000000
    }
})

//Logical operator ($and (default), $or, $nor, $not)
db.products.find({
    $and:[
        {
            category: {
               $in: ["Hp", "Laptop"]
            }
        },
        {
            price: {
               $gt: 22000000
            }
        }
    ]
})

db.products.find({
    category: {
        $not: {
            $in: ['Hp', 'Laptop']
        }
    }
})

//Element operator (exists & type)
db.products.find({
    category: {
        $exists: true //show yg ada value category
    }
})

db.products.find({
    price: {
        $type: "long" //show yg value price long
    }
})

//Evaluation operator
db.customers.find({
    $expr: { //expression
        $eq: ['$_id','$name']
    }
})

db.products.find({
    $jsonSchema: { //json schema
        required: ['name','category']
    }
})

db.products.find({
    $jsonSchema: {
        required: ['name'],
        properties : {
            name: {
                type: 'string'
            },
            price: {
                type: 'number'
            }
        }
    }
})

db.products.find({
    price: {
        $mod: [1000000,0] //Modulo
    }
})

db.products.find({
    name: {
        $regex: /sapi/, //Regular expression (Regex)
        $options: 'i' //in case sensitive
    }
})

db.products.find({
    name: {
        $regex: /^Bakso/
    }
})

db.customers.find({
    $where: function (){ //Where js function
        return this._id == this.name;
    }
})

//Array operator
db.products.find({
    tags: {
        $all: ['GL', 'monitor']
    }
})

db.products.find({
    tags: {
        $elemMatch: {
            $in: ['logimech', 'fan']
        }
    }
})

db.products.find({
    tags: {
        $size: 4
    }
})

//Projection (1 = true ambil, 2 = false no ambil)
db.products.find({},{
    name: 1,
    category: 1
})

db.products.find({},{
    tags: 0
})

db.products.find({},{
    name: 1,
    tags: {
        $elemMatch: {
            $in: ["logimech", "GL", "accessories"]
        }
    }
})

db.products.find({ //ambil yg punya tags dan tags pertama saja
    tags: {
        $exists: true
    }
},{
    name: 1,
    "tags.$": 1
})

db.products.find({ //ambil yg punya tags dan 2 tags pertama saja
    tags: {
        $exists: true
    }
},{
    name: 1,
    tags: {
        $slice: 2
    }
})

//Query modifier
db.products.find({}).count()

db.products.find({}).limit(4)

db.products.find({}).limit(4).skip(2)

db.products.find({}).sort({
    category: 1, //ASC
    name: -1 //DESC
}).limit(5).skip(1)

//Update document
db.products.updateOne({
    _id: 2
}, {
    $set: {
        category: "food"
    }
})

db.products.updateMany({
    $and: [
        {
            category: {
                $eq: "food"
            }
        },
        {
            tags: {
                $exists: false
            }
        }
    ]
}, {
    $set: {
        tags: "food"
    }
})

db.products.replaceOne({
    _id: 3
}, {
    name: "Nice shoes running 5n0",
    price:new NumberLong("1500000"),
    category: "shoes",
    tags: [
        "sepatu", "shoes", "running"
    ]
})

//Field update operator
db.products.updateMany({}, {
    $set: {
        stock: 0
    }
})

db.products.updateMany({}, {
    $inc: {
        stock: 10
    }
})

db.customers.updateMany({}, {
    $rename: {
        name: "full_name"
    }
})

db.customers.updateMany({}, {
    $set: {
        wrong: "untuk test unset"
    }
})

db.customers.updateMany({}, {
    $unset: {
        wrong: ""
    }
})

db.products.updateMany({}, {
    $currentDate: {
        lastModifiedDate: {
            $type: "date"
        }
    }
})






