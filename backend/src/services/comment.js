import commentRepository from('../repository/comment');
import {ErrorCodes, error} from '../utils/errors';
const {RESOURCE_NOT_FOUND, RESOURCE_CREATION_FAILED, RESOURCE_UPDATE_FAILED, RESOURCE_DELETION_FAILED} = ErrorCodes;

export async function listComments() {
  const comments = await commentRepository.list();
  if (!comments) {
    error(RESOURCE_NOT_FOUND);
  }
  return comments
};

export async function createComment(userId, content) {
  const result = await commentRepository.create(userId, content);
  if (!result) {
    error(RESOURCE_CREATION_FAILED);
  };
  return result;
};

export async function updateComment(commentId, userId, content) {
  const result = await commentRepository.update(commentId, userId, content);
  if (!result) {
    error(RESOURCE_UPDATE_FAILED);
  };
  return result;
};

export async function removeComment(commentId, userId) {
  const result = await commentRepository.remove(commentId, userId);
  if (!result) {
    error(RESOURCE_DELETION_FAILED);
  };
  return result;
};
