const express = require('express');
const router = express.Router();

const PagesController = require('../pages.js');
const pages = new PagesController();

router.get('/', pages.home);

router.get('/info', pages.info);

router.get('/home', pages.home);

router.get('/organizers', pages.organizers);

router.get('/partners', pages.partners);

router.get('/help', pages.help);

router.get('/teams', pages.teams);

module.exports = router;
