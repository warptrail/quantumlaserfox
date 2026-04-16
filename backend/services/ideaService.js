const Idea = require('../models/Idea');
const isValidObjectId = require('../utils/isValidObjectId');
const AppError = require('../utils/AppError');

const getAllIdeas = async () => {
  return await Idea.find().sort({ createdAt: -1 });
};

const getIdeaById = async (id) => {
  if (!isValidObjectId(id)) {
    throw new AppError('Invalid idea ID', 400);
  }

  const idea = await Idea.findById(id);

  if (!idea) {
    throw new AppError('Idea not found', 404);
  }

  return idea;
};

const createIdea = async (ideaData) => {
  const { title, description, category, tags, isStarred } = ideaData;

  if (!title || !title.trim()) {
    throw new AppError('Title is required', 400);
  }

  const newIdea = await Idea.create({
    title: title.trim(),
    description: description?.trim() || '',
    category: category?.trim() || 'general',
    tags: Array.isArray(tags) ? tags : [],
    isStarred: Boolean(isStarred),
  });

  return newIdea;
};

const updateIdea = async (id, ideaData) => {
  if (!isValidObjectId(id)) {
    throw new AppError('Invalid idea ID', 400);
  }

  const existingIdea = await Idea.findById(id);

  if (!existingIdea) {
    throw new AppError('Idea not found', 404);
  }

  if (ideaData.title !== undefined) {
    if (!ideaData.title.trim()) {
      throw new AppError('Title cannot be empty', 400);
    }

    existingIdea.title = ideaData.title.trim();
  }

  if (ideaData.description !== undefined) {
    existingIdea.description = ideaData.description.trim();
  }

  if (ideaData.category !== undefined) {
    existingIdea.category = ideaData.category.trim() || 'general';
  }

  if (ideaData.tags !== undefined) {
    existingIdea.tags = Array.isArray(ideaData.tags) ? ideaData.tags : [];
  }

  if (ideaData.isStarred !== undefined) {
    existingIdea.isStarred = Boolean(ideaData.isStarred);
  }

  const updatedIdea = await existingIdea.save();

  return updatedIdea;
};

const deleteIdea = async (id) => {
  if (!isValidObjectId(id)) {
    throw new AppError('Invalid idea Id, 400');
  }

  const idea = await Idea.findById(id);

  if (!idea) {
    throw new AppError('Idea not found', 404);
  }

  await idea.deleteOne();

  return {
    message: 'Idea deleted successfully',
    deletedIdeaId: id,
  };
};

module.exports = {
  getAllIdeas,
  getIdeaById,
  createIdea,
  updateIdea,
  deleteIdea,
};
