
const mongoose = require('mongoose');
const marked = require('marked');

//For sanitizing html in markdown
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const Schema = mongoose.Schema; //this "Schema" constructor allows us to create a new Schema.

//Instantiating Schema (Project data schema)
const projectSchema = new Schema({
  title: {
    type: String,  //data type
    required: true 
  },
  type: {
    type: String, //data type
    required: true
  },
  imageUrl: {
    type: String,
    required: true 
  },

  description: {
    type: String,
    required: true
  },

  longDescription: {
    type: String,
    required: true
  },

  userId: {
    type: Schema.Types.ObjectId, //mongodb data type
    ref: 'User',
    required: true
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
  
});

//Markdown
projectSchema.pre('validate', function (next) {
  if(this.longDescription) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.longDescription));
  }
  next();
})

// NOTE---------
// We know that noSQL (mongodb) is schemaless but here we are creating a schema that is coz whilst we have flexibility of not having a schema but it wants to u to focus only on data for that it needs to know how our data looks like.

module.exports = mongoose.model('Project', projectSchema); //This just assigns a name 'Project' to our schema. Now we call it a "model"




//------------------WAS DONE USING MONGODB DRIVER (JUST FOR REF PURPOSES)----------------

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       // Update the product
//       dbOp = db
//         .collection('products')
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection('products').insertOne(this);
//     }
//     return dbOp
//       .then(result => {
//         console.log(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find()
//       .toArray()
//       .then(products => {
//         console.log(products);
//         return products;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find({ _id: new mongodb.ObjectId(prodId) })
//       .next()
//       .then(product => {
//         console.log(product);
//         return product;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then(result => {
//         console.log('Deleted');
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }

// module.exports = Product;
