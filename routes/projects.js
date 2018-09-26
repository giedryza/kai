const express = require('express');
const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const { isAuthenticated } = require('../helpers/auth');
const router = express.Router();

// Load Project Model
require('../models/Project');
const Project = mongoose.model('projects');

// Projects Index Page
router.get('/', (req, res) => {
    Project.find({})
        .sort({ date: 'desc' })
        .then(projects => {
            res.render('projects/index', {
                projects
            });
        });
});

// Add Project Form
router.get('/add', isAuthenticated, (req, res) => {
    res.render('projects/add');
});

// Edit Project Form
router.get('/edit/:id', isAuthenticated, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).render('error');
    }

    Project.findOne({
        _id: id
    })
        .then(project => {
            if (!project) {
                return res.status(404).render('error');
            }
            res.render('projects/edit', {
                project
            });
        })
        .catch(e => {
            res.status(400).render('error');
        });
});

// Show Single Project
router.get('/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).render('error');
    }

    Project.findOne({
        _id: id
    })
        .then(project => {
            if (!project) {
                return res.status(404).render('error');
            }
            res.render('projects/project', {
                project
            });
        })
        .catch(e => {
            res.status(400).render('error');
        });
});

// Add Project Process
router.post('/', isAuthenticated, (req, res) => {
    new Project(req.body).save().then(project => {
        req.flash('success_msg', 'Projektas įkeltas');
        res.redirect('/projects');
    });
});

// Edit Project Process
router.put('/:id', isAuthenticated, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Project.findOne({
        _id: id
    })
        .then(project => {
            if (!project) {
                return res.status(404).send();
            } else {
                let completed;
                if (req.body.completed) {
                    completed = true;
                } else {
                    completed = false;
                }

                project.title = req.body.title;
                project.number = req.body.number;
                project.duration = req.body.duration;
                project.partners = req.body.partners;
                project.image = req.body.image;
                project.logoOne = req.body.logoOne;
                project.logoTwo = req.body.logoTwo;
                project.body = req.body.body;
                project.completed = completed;

                project.save().then(project => {
                    req.flash('success_msg', 'Projektas atnaujintas');
                    res.redirect('/projects');
                });
            }
        })
        .catch(e => {
            res.status(400).send();
        });
});

// Delete Project Process
router.delete('/:id', isAuthenticated, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Project.deleteOne({
        _id: id
    })
        .then(project => {
            if (!project) {
                return res.status(404).send();
            } else {
                req.flash('success_msg', 'Projektas ištrintas');
                res.redirect('/projects');
            }
        })
        .catch(e => {
            res.status(400).send();
        });
});

module.exports = router;
