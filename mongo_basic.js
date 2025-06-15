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

db.customers.insertMany([
    {
        _id: "account3",
        full_name: "Account 3"
    },
    {
        _id: "account4",
        full_name: "Account 4"
    },
    {
        _id: "account5",
        full_name: "Account 5"
    }
])

db.customers.insertMany([
    {
        _id: "andy",
        full_name: "Andy Jaya",
        custom_fields: {
            hobby: "Futsal",
            university: "University Open"
        }
    },
    {
        _id: "budy",
        full_name: "Budy Sukses",
        customFields: {
            ipk: 3.9,
            university: "University Close"
        }
    },
    {
        _id: "Cindy",
        full_name: "Cyndy Prety",
        customFields: {
            fatherName: "Chris",
            passion: "Model"
        }
    }
])

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

db.products.updateMany({}, {
    $set: {
        ratings: [90,80,70]
    }
})

//Array update operator
db.products.updateMany({
    ratings: 90
}, {
    $set: {
        'ratings.$': 100 //update index pertama yg value: 90
    }
})

db.products.updateMany({},{
    $set: {
        'ratings.$[]': 100 //update semua isi array
    }
})

db.products.updateMany({}, {
    $set: {
        'ratings.$[element]': 100
    }
 }, {
    arrayFilters: [ //update array base on arrayFilters
        {
         element: {
            $gte: 80
         }
        }
    ]
})

db.products.updateMany({}, {
    $set: {
        'ratings.0': 40, //update array by index
        'ratings.1': 65
    }
})

db.products.updateOne({
    _id: 8
},{
    $addToSet: {
        tags: "32" //update add new value, ignore when already data
    }
})

db.products.updateOne({
    _id: 8
},{
    $pop: {
        ratings: -1 //hapus value array pertama, if 1 = last value
    }
})

db.products.updateMany({}, {
    $pull: {
        ratings: {
            $gte: 80 //hapus all > 80
        }
    }
})

db.products.updateMany({},{
    $push: {
    ratings: 100 //add new vallue array, if already data = add again not ignore
    }
})

db.products.updateMany({},{
    $pullAll: {
        ratings : [100] //hapus semua value
    }
})

//Array update operator modifier
db.products.updateMany({},{
    $push: {
        ratings: {
            $each : [50, 55, 60] //add some value array, for $push & $addToSet
        }
    }
})

db.products.updateMany({},{
    $push: {
        ratings: {
            $each : [99],
            $position: 0
        }
    }
})

db.products.updateMany({},{
    $push: {
        ratings: {
            $each : [100,200,300],
            $sort: -1 //sort after add by desc
        }
    }
})

db.products.updateMany({},{
    $push: {
        ratings: {
            $each : [1000,2000,3000],
            $slice: -10 //add but limit 10 from behind
        }
    }
})

//Delete document
db.customers.deleteOne({
    _id: "account1"
})

db.customers.deleteMany({
    _id: {
        $regex: "account"
    }
})

//Bulkwrite operator (run some command)
db.customers.bulkWrite([
    {
        insertOne: {
            document: {
                _id: "m",
                full_name: "M"
            }
        }
    },
    {
        insertOne: {
             document: {
                 _id: "hasanain",
                 full_name: "Hasanain"
             }
        }
    },
    {
        updateMany: {
            filter: {
                _id: {
                    $in: ['m','hasan','hasanain']
                }
            },
            update: {
                $set: {
                    full_name: 'M. Hasan QA'
                }
            }
        }
    }
])

//Indexes
db.customers.getIndexes()

db.products.createIndex({
    category: 1
})

db.products.find({ //find & debug with index (lebih cepat)
    category: "Laptop"
}).explain()

db.products.find({ //find & debug without index (lebih lama)
    tags: "mouse"
}).explain()

db.products.dropIndex("category_1")

db.products.createIndex({ //compound index (some index in 1 col)
    stock: 1,
    tags: 1
})

db.products.find({//find & debug with compound index
    stock: 10,
    tags: "mouse"
}).explain()

//Text index (untuk pencarian dgn $text)
db.products.createIndex({
    name: 'text',
    category: 'text',
    tags: 'text'
}, {
    weights: {
       name: 10,
       category: 5,
       tags: 1
    }
})

db.products.find({
    $text: {
        $search: 'pro' //pro
    }
})

db.products.find({
    $text: {
        $search: 'pro laptop' //pro AND laptop
    }
})

db.products.find({
    $text: {
        $search: '"pro black"' //pro black
    }
})

db.products.find({
    $text: {
        $search: 'pro -black' //pro NOT black
    }
})

db.products.find({
    $text: {
        $search: 'pro laptop' //pro AND laptop
    }
}, {
    searchScore: {
        $meta: 'textScore'
    }
})

//Willcard index (auto indexing in field yg belum ada/berubah2 - Biasanya embedded field)
db.customers.createIndex({
    "customFields.$**": 1
})

db.customers.find({
    "customFields.passion": "Model"
}).explain()

//Index properties
db.createCollection("sessions");

db.sessions.createIndex({ //TTL Time To Live
    createdAt: 1
}, {
    expiredAfterSeconds: 10 //data deleted after 10S
})

db.sessions.insertOne({
    _id: 1,
    session: "Session 1",
    createdAt: new Date()
})

db.customers.createIndex({
    email: 1
},{
    unique: true, //unique index
    sparse: true //ignore null/kosong
})

db.customers.updateOne({
    _id: "hasan"
}, {
    $set: {
        email: "hasan@example.com" //success
    }
})

db.customers.updateOne({
    _id: "musa"
}, {
    $set: {
        email: "hasan@example.com" //fail, email must be unique
    }
})

//Index incase sensitive
db.customers.find({
    full_name: "m. Hasan QA" //fail bcs case sensitive
})

db.customers.createIndex({
    full_name: 1
}, {
    collation: {
        locale: "en",
        strength: 2 //2: incasesensitive | 1: casesensitive
    }
})

db.customers.find({
    full_name: "m. Hasan QA"
}).collation ({ //succes after set 2
      locale: "en",
      strength: 2
});

//Partial filter
db.products.createIndex({
    price: 1
},{
    partialFilterExpression: { //index must with kriteria stock
        stock: {
            $gt: 0
        }
    }
})

db.products.find({
    price: {
        $eq: 15000
    },
    stock: {
        $gt: 1
    }
}).explain()

//Security
use admin; //move or create db admin

db.createUser({ //create admin role
    user: 'admin',
    pwd: 'admin',
    roles: [
        'userAdminAnyDatabase',
        'readWriteAnyDatabase'
    ]
})

//mongod --auth --dbpath="C:\mongodb\data" | running db with auth

//mongosh "mongodb://username:password@localhost:27017/db_name?authSource=db_location_user" | auth to connect db
mongosh "mongodb://admin:admin@localhost:27017/mongo_db?authSource=admin"

//User management
use admin;

db.createUser({ //create user role read only 1 db
    user: 'userR',
    pwd: 'userR',
    roles: [
        {
            role: 'read',
            db: 'test'
        }
    ]
})

db.createUser({ //create user role read and write only 1 db
    user: 'userRW',
    pwd: 'userRW',
    roles: [
        {
            role: 'readWrite',
            db: 'test'
        }
    ]
})

db.getUsers()

mongosh "mongodb://userR:userR@localhost:27017/test?authSource=admin"

db.sample.insertOne({ //fail in userRW
    _id: 1,
    name: 'hasan'
})

db.sample.find() //success in userRW

mongosh "mongodb://userRW:userRW@localhost:27017/test?authSource=admin"

db.sample.insertOne({ //success in userRW
    _id: 1,
    name: 'hasan'
})

db.sample.find() //success in userRW

db.changeUserPassword('userR','userRR') //change pwd user

//relogin with new pwd
mongosh "mongodb://userR:userRR@localhost:27017/test?authSource=admin"

db.dropUser("userR") //delete user

db.updateUser("userRW", { //update user
    roles: [
        {
            role: 'readWrite',
            db: 'test'
        },
        {
            role: 'readWrite',
            db: 'mongo_db'
        }
    ]
})

//Role function
db.createRole({
    role: "session_management",
    roles: [
        {
            role:'read',
            db: 'mongo_db'
        }
    ],
    privileges: [
        {
        resource: {
                    db: "mongo_db",
                    collection: "sessions"
                },
                actions: ['insert']
        }
    ]
})

db.getRoles({
    showPrivileges: true
})

db.createUser({
    user: 'hasan',
    pwd: 'hasan',
    roles: ['session_management']
})

//Backup
mongodump --uri="mongodb://admin:admin@localhost:27017/mongo_db?authSource=admin" --out=backup-dump

mongoexport --uri="mongodb://admin:admin@localhost:27017/mongo_db?authSource=admin" --collection="customers" --out=customers.json

//Restore
mongorestore --uri="mongodb://admin:admin@localhost:27017/mongo_db_restore?authSource=admin" --dir=backup-dump\mongo_db

mongoimport --uri="mongodb://admin:admin@localhost:27017/mongo_db_import?authSource=admin" --collection="customers" --file=customers.json

