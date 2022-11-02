const connect = require("mongoose").connect;

connect("mongodb://localhost:27017/test", {}, () => {
    console.log("db connected");
});
