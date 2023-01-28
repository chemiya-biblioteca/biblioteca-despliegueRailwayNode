module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();//router de express

  // crear tutorial, la ruta y llamo al controlador
  router.post("/", tutorials.create);

  // buscar todos, llamo al controlador
  router.get("/", tutorials.findAll);

  // busco publicados
  router.get("/published", tutorials.findAllPublished);

  // busco por id
  router.get("/:id", tutorials.findOne);

  // actualizo por id
  router.put("/:id", tutorials.update);

  // borro po id
  router.delete("/:id", tutorials.delete);

  // borro todos
  router.delete("/", tutorials.deleteAll);

  app.use('/api/tutorials', router);//ruta basica: localhost:8080/api/tutorials
};
