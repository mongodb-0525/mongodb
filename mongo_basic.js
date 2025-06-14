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

