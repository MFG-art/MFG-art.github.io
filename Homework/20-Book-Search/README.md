npm # <img src="https://chriscastle.com/temp/shoppinglist_ss.png" alt="image-20200218151949220" style="zoom:50%;" />

# Shopping List MERN App

## Initial Setup MERN

1. Create new folder `shoppinglist` (cd into it)
2. Initalize your package.json by `npm init` (leave defaults)
3. Install Packages:
   **Express** `npm i express`
   **dotenv** `npm i dotenv`
   **mongoose** `npm i mongoose`
   **morgan** `npm i morgan`
   **body parser** `npm i body-parser`
4. Install Dev Packages:
   npm i concurrently --save-dev
   npm i nodemon --save-dev
5. Create an index.js file add basic information

- require express and .env (enviroment variables, db etc)
- init express and setup port
- Allow API to be accessed from everywhere (CORS issues)
- Send test message
- Setup Express Listener

```javascript
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(logger("dev"));

app.use((err, req, res, next) => {
  console.log(err);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
```

Test by running `node index` in terminal (Should just read running on port 3001)

## Mongoose/Mongo Model

1. Install mongoose `npm i mongoose`
2. Create a models directory off of the root of the shoppinglist app
3. Create a shoppinglist.js file in that folder
   - Create Schema
   - Create Model

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ShoppingListSchema = new Schema({
  item: {
    type: String,
    required: [true, "The text field is required"]
  }
});

const ShoppingList = mongoose.model("shoppinglist", ShoppingListSchema);

module.exports = ShoppingList;
```

## Create Express Routes to handle Model

1. Create routes Folder off of the root of the shoppinglist app

2. Create api.js in the routes folder

   - require express
   - init express router
   - setup 3 routes, **get**, **post** and **delete** (req for request, res for response, next for the next function)

3. Add find, create and findOneAndDelete Methods in Function

```javascript
const express = require("express");
const router = express.Router();
const ShoppingList = require("../models/shoppinglist");

router.get("/shoppinglist", (req, res, next) => {
  ShoppingList.find({}, "item")
    .then(data => res.json(data))
    .catch(next);
});

router.post("/shoppinglist", (req, res, next) => {
  if (req.body.item) {
    ShoppingList.create(req.body)
      .then(data => res.json(data))
      .catch(next);
  } else {
    res.json({ error: "The item field is empty" });
  }
});

router.delete("/shoppinglist/:id", (req, res, next) => {
  ShoppingList.findOneAndDelete({ _id: req.params.id })
    .then(data => res.json(data))
    .catch(next);
});

module.exports = router;
```

## Update index.js to handle routes and connections

1. We will need need to libraries, body parse for our post, mongoose for our database, routes and path
2. Connect to database (we will setup the DB environment variable in the .env we will create next)

```javascript
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/api");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.log(err));

app.use(logger("dev"));

app.use(bodyParser.json());
app.use("/api", routes);
app.use((err, req, res, next) => {
  console.log(err);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
```

## Setup Remote Mongo Database on mlab / Create .env file

1. Create mlab sandbox provision db through Heroku by setting up an app, going to resources and typing in mlab. Add collection called `shoppingcart` and user if neccessary.

2. Add user and get connection string. IE: mongodb://chrisuser:guestpass123@ds227865.mlab.com:27865/heroku_lwwghkmr

3. Create a `.env` file on your root of the application. Add your db connection to it.

- `DB = 'mongodb://chrisuser:guestpass123@ds227865.mlab.com:27865/heroku_lwwghkmr'`
  //This will be used my the mongoose connection string.

4. You can also setup a local db instance and replace the .env DB location with your own db

### Test Your Endpoints Using Postman

1. node index.js
2. Get by using GET http://localhost:3001/api/shoppinglist
3. Post by using POST http://localhost:3001/api/shoppinglist with json {"item":"cheese"}
4. Delete by using DELETE localhost:3001/api/shoppinglist/5e4ae903c544711c71125245 or whatever any of the unique items are

## Front End React

In the root directory.

1. Run `create-react-app client` This will setup the basic scaffolding for react.
2. _note_: dependences from the root folder. Concurrently to run scripts, after one other and nodemon to auto restart the server on change.

3. Within the root **package.json** file add the following between scripts:

```json
"start": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev",
    "start:prod": "node server.js",
    "start:dev": "concurrently \"nodemon --ignore 'client/*'\" \"npm run client\"",
    "client": "cd client && npm run start",
    "seed": "node scripts/seedDB.js",
    "install": "cd client && npm install",
    "build": "cd client && npm run build",
    "heroku-postbuild": "npm run build"
```

**In the new client folder**

Once create-react-app completes. You will need to add a proxy, so you we don't need to specify full urls.

1. Edit the /client version **package.json** file add the following line anywhere on the root node.. (under "private" is fine)

   `"proxy": "http://localhost:3001",`

#### From the **/client** folder, in terminal, install **Axios** `npm i axios`

## React Components

1. Create a folder inside your src folder, called `components`
2. Within that folder we will be creating 3 files: Input.js, ListItems.js and Item.js

#### Create `Input.js` Functional Component in components

```react

import React, { useState } from 'react';
import axios from 'axios';

function Input(props) {
    const [item, setItem] = useState([]);
    const addItem = () => {

        if (item && item.length > 0) {
            axios.post('/api/shoppinglist', { 'item': item })
                .then(res => {
                    if (res.data) {
                        props.getItems();
                        setItem("");
                    }
                })
                .catch(err => console.log(err))
        } else {
            console.log('Item required')
        }
    }

    const handleChange = (e) => {
        setItem(e.target.value);
    }

    return (
        <div>
            <input type="text" onChange={handleChange} value={item} />
            <button onClick={addItem}>add item</button>
        </div>
    )
}

export default Input


```

​

#### Create `ListItems.js` Functional Component in components

​

```react

import React from 'react';

const ListItems = ({ items, deleteItem }) => {

    return (
        <ul>
            {
                items &&
                    items.length > 0 ?
                    (
                        items.map(item => {
                            return (
                                <li key={item._id} onClick={() => deleteItem(item._id)}>{item.item}</li>
                            )
                        })
                    )
                    :
                    (
                        <li>No Items left</li>
                    )
            }
        </ul>
    )
}

export default ListItems
```

#### Create `Item.js` Functional Component in components

```react
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from './Input';
import ListItems from './ListItems';

function Item() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getItems();
    }, []);

    const getItems = () => {
        axios.get('/api/shoppinglist')
            .then(res => {
                if (res.data) {
                    setItems(res.data)
                }
            })
            .catch(err => console.log(err))
    }

    const deleteItem = (id) => {

        axios.delete(`/api/shoppinglist/${id}`)
            .then(res => {
                if (res.data) {
                    getItems()
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h1>Shopping List</h1>
            <Input getItems={getItems} />
            <ListItems items={items} deleteItem={deleteItem} />
        </div>
    );
}

export default Item;


```

#### Update App.js to use Item component:

```react
import React from 'react';

import Item from './components/Item';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Item />
    </div>
  );
}

export default App;
```

​

Run the App:

> ## npm start

Style to your liking....

### src/App.css (Optional Edits)

```
.App {
  text-align: center;
  font-size: calc(10px + 2vmin);
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}

input {
  height: 40px;
  width: 50%;
  border: none;
  border-bottom: 2px #101113 solid;
  background: none;
  font-size: 1.5rem;
  color: #787a80;
}

input:focus {
  outline: none;
}

button {
  width: 25%;
  height: 45px;
  border: none;
  margin-left: 10px;
  font-size: 25px;
  background: #101113;
  border-radius: 5px;
  color: #e7e7e7;
  cursor: pointer;
}

button:focus {
  outline: none;
}

ul {
  list-style: none;
  text-align: left;
  padding: 15px;
  background: #9dc2ff;
  border-radius: 5px;
}

li {
  padding: 15px;
  font-size: 1.5rem;
  margin-bottom: 15px;
  background: #bcd1f9;
  border-radius: 5px;
  overflow-wrap: break-word;
  cursor: pointer;
}

@media only screen and (min-width: 300px) {
  .App {
    width: 80%;
  }

  input {
    width: 100%;
  }

  button {
    width: 100%;
    margin-top: 15px;
    margin-left: 0;
  }
}

@media only screen and (min-width: 640px) {
  .App {
    width: 60%;
  }

  input {
    width: 50%;
  }

  button {
    width: 30%;
    margin-left: 10px;
    margin-top: 0;
  }
}
```
