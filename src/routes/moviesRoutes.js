const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const userGuest = require('../middlewares/userGuest')


router.get('/movies', moviesController.list);
router.get('/movies/new', moviesController.new);
router.get('/movies/recommended', moviesController.recomended);
router.get('/movies/detail/:id', moviesController.detail);
//Rutas exigidas para la creación del CRUD
router.get('/movies/add', userGuest, moviesController.add);
router.post('/movies/create', moviesController.create);
router.get('/movies/edit/:id', userGuest, moviesController.edit);
router.put('/movies/update/:id', moviesController.update);
router.get('/movies/delete/:id',userGuest, moviesController.delete);
router.put('/movies/delete/:id', moviesController.destroy);

router.post('/movies/buscar', moviesController.buscar);
module.exports = router;