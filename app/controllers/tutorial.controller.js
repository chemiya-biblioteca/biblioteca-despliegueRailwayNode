const Tutorial = require("../models/tutorial.model.js");


exports.create = (req, res) => {
  // compruebo que no este vaica
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // creo un tutorial con los datos
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // llamo al tutorial para que lo guarde
  Tutorial.create(tutorial, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);//Mando los datos
  });
};


exports.findAll = (req, res) => {
  const title = req.query.title;//cojo el titulo

  Tutorial.getAll(title, (err, data) => {
    if (err)//busco en la base de datos o deuvlevo error
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);//devuelvo lo que encuentre
  });
};


exports.findOne = (req, res) => {
  Tutorial.findById(req.params.id, (err, data) => {
    if (err) {//busco por el id y si no lo encuentra, erro r
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with id " + req.params.id
        });
      }
    } else res.send(data);//devuevlo los campos emcontrados
  });
};


exports.findAllPublished = (req, res) => {
  Tutorial.getAllPublished((err, data) => {
    if (err)//busco todos los publicados
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);//devuelvo los encontrados o error
  });
};


exports.update = (req, res) => {
  //compruebo que no esta vacia
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Tutorial.updateById(
    req.params.id,//cojo el id y creo tutporial con los campos
    new Tutorial(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {//si no encuentra con el id
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Tutorial with id " + req.params.id
          });
        }
      } else res.send(data);//devuelvo los datos
    }
  );
};


exports.delete = (req, res) => {
  Tutorial.remove(req.params.id, (err, data) => {
    if (err) {//boro con el id, si no lo encuentra
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutorial with id " + req.params.id
        });
      }//si se borra mando mensaje
    } else res.send({ message: `Tutorial was deleted successfully!` });
  });
};


exports.deleteAll = (req, res) => {
  Tutorial.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });//borro todos y mando mensaje de que se ha borrado
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
};
