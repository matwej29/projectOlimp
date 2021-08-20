const express = require('express');
const router = express.Router();

const basicAuth = require('express-basic-auth');
const adminConfig = require('../adminConfig.json');
const auth = basicAuth({
  users: adminConfig,
  challenge: true,
  realm: 'Imb4T3st4pp',
});

const AdminPages = require('../adminPages');
const adminPages = new AdminPages();

const NewsController = require('../newsController');
const newsController = new NewsController();

const TeamsController = require('../teamsController');
const teamsController = new TeamsController();

router.get('/admin', auth, adminPages.home);

router.get('/admin/news/add', auth, newsController.getAdd);

router.post('/admin/news/add', auth, newsController.postAdd);

router.get('/admin/news/delete', auth, newsController.delete);

router.get('/admin/news/edit', auth, newsController.getEdit);

router.post('/admin/news/edit', auth, newsController.postEdit);

router.get('/admin/teams', auth, adminPages.teams);

router.get('/admin/teams/edit', auth, teamsController.getEdit);

router.post('/admin/teams/edit', auth, teamsController.postEdit);

router.get('/admin/teams/add', auth, teamsController.getAdd);

router.post('/admin/teams/add', auth, teamsController.postAdd);

router.get('/admin/teams/delete', auth, teamsController.delete);

router.get('/admin/teams/edit', auth, teamsController.getEdit);

router.post('/admin/teams/edit', auth, teamsController.postEdit);

router.get('/admin/info', auth, adminPages.info);

router.get('/admin/info/edit', auth, adminPages.getInfo);

router.post('/admin/info/edit', auth, adminPages.postInfo);

module.exports = router;