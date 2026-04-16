const req = require('express/lib/request');
const ideaService = require('../services/ideaService');

const getIdeas = async (req, res, next) => {
  try {
    const ideas = await ideaService.getAllIdeas();

    res.status(200).json(ideas);
  } catch (error) {
    next(error);
  }
};

const getIdeaById = async (req, res, next) => {
  try {
    const idea = await ideaService.getIdeaById(req.params.id);

    res.status(200).json(idea);
  } catch (error) {
    next(error);
  }
};

const createIdea = async (req, res, next) => {
  try {
    const idea = await ideaService.createIdea(req.body);

    res.status(201).json(idea);
  } catch (error) {
    next(error);
  }
};

const updateIdea = async (req, res, next) => {
  try {
    const updatedIdea = await ideaService.updateIdea(req.params.id, req.body);

    res.status(200).json(updatedIdea);
  } catch (error) {
    next(error);
  }
};

const deleteIdea = async (req, res, next) => {
  try {
    const result = await ideaService.deleteIdea(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getIdeas,
  getIdeaById,
  createIdea,
  updateIdea,
  deleteIdea,
};
