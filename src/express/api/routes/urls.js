const router = require('express').Router();
const express = require('express');
const bodyParser = require('body-parser');
const urlsController = require('../controllers/urls');

router.get('/urls',urlsController.getList);
router.get(`/urls/:id`,urlsController.getOne);
router.post(`/urls/:id`, bodyParser.json(), express.query(), urlsController.create);
router.put(`/urls/:id`,bodyParser.json(), express.query(), urlsController.update);
router.delete(`/urls/:id`, urlsController.delete);

module.exports = router;

