import commentService from '../services/comment';
import {ErrorCodes, serverError} from '../utils/errors';
import {response} from '../utils/http';

const {
  RESOURCE_NOT_FOUND,
  RESOURCE_CREATION_FAILED,
  RESOURCE_UPDATE_FAILED,
  RESOURCE_DELETION_FAILED,
  DATABASE_ERROR,
  VALIDATION_ERROR,
} = ErrorCodes;

export async function list(req, res) {
  try {
    const comments = await commentService.listComments();
    response(res, 'OK', null, null, comments);
  } catch (err) {
    if (err.code === RESOURCE_NOT_FOUND) {
      response(res, 'NO_CONTENT');
      return;
    }
    serverError(res, DATABASE_ERROR);
  }
}

export async function create(req, res) {
  const {content} = req.body;
  const userId = req.user?.id;

  if (!userId || !content) {
    response(res, 'BAD_REQUEST', VALIDATION_ERROR);
    return;
  }

  try {
    const comment = await commentService.createComment(userId, content);
    response(res, 'CREATED', null, null, comment);
  } catch (err) {
    if (err.code === RESOURCE_CREATION_FAILED) {
      response(res, 'UNPROCESSABLE_ENTITY', err.code);
      return;
    }
    serverError(res, DATABASE_ERROR);
  }
}

export async function update(req, res) {
  const commentId = req.params?.id;
  const userId = req.user?.id;
  const {content} = req.body;

  if (!commentId || !userId || !content) {
    response(res, 'BAD_REQUEST', VALIDATION_ERROR);
    return;
  }

  try {
    const result = await commentService.updateComment(commentId, userId, content);
    response(res, 'OK', null, null, result);
  } catch (err) {
    if (err.code === RESOURCE_UPDATE_FAILED) {
      response(res, 'UNPROCESSABLE_ENTITY', err.code);
      return;
    }
    serverError(res, DATABASE_ERROR);
  }
}

export async function remove(req, res) {
  const commentId = req.params?.id;
  const userId = req.user?.id;

  if (!commentId || !userId) {
    response(res, 'BAD_REQUEST', VALIDATION_ERROR);
    return;
  }

  try {
    await commentService.deleteComment(commentId, userId);
    response(res, 'NO_CONTENT');
  } catch (err) {
    if (err.code === RESOURCE_DELETION_FAILED) {
      response(res, 'UNPROCESSABLE_ENTITY', err.code);
      return;
    }
    serverError(res, DATABASE_ERROR);
  }
}
