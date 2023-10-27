const express = require("express");
const http = require("http");
const logger = require("morgan");
const cors = require("cors");
const routerMain = require("./router/index");
const path = require("path");
const methodOverride = require('method-override');


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = http.createServer(this.app);
  }

  middlewares() {

    this.app.set("view engine", "ejs");
    this.app.set("views", path.join(__dirname, "views"));
    this.app.use(express.urlencoded({ extended: true }));


    //Morgan
    this.app.use(logger("dev"));
    //CORS
    this.app.use(cors());
    //Parse Body
    this.app.use(express.json());
    //Routes

    this.app.use(express.static("./public"))

    this.app.use(methodOverride('_method'));
    

    this.app.use("/", routerMain);
    // ERROR HANDLER
    this.app.use((err, req, res, next) => {
      console.log(err);
      res.status(err.status || 500).send(err.stack);
    });
  }

  execute() {
    // Run Middlewares
    this.middlewares();

    this.server.listen(this.port, () => {
      console.log("Server is running on port:", this.port);
    });
  }
}

module.exports = Server;