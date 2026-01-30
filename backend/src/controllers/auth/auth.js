import authService from '../services/auth';
import googleAdapter from '../adapters/google';
import {response, createCookie} from '../utils/http';
import constants from '../utils/constants';
import security from '../utils/security';
import {ErrorCodes, serverError} from '../utils/errors';

const {
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
  INVALID_CREDENTIALS,
  DATABASE_ERROR,
  VALIDATION_ERROR,
} = ErrorCodes;

export async function register(req, res) {
  const {username, email, password} = req.body;

  if (!username || !email || !password) {
    response(res, 'BAD_REQUEST', VALIDATION_ERROR);
    return;
  }

  try {
    const user = await authService.createUser(username, email, password);
    response(res, 'CREATED', null, null, user);
  } catch (err) {
    if (err.code === USER_ALREADY_EXISTS) {
      response(res, 'CONFLICT', err.code);
      return;
    }
    serverError(res, DATABASE_ERROR);
  }
}

export async function login(req, res) {
  const {email, password} = req.body;
  if (!email || !password) {
    response(res, 'BAD_REQUEST', VALIDATION_ERROR);
    return;
  }

  try {
    const {user, token} = await authService.login(email, password);
    createCookie(res, token); 
    response(res, 'OK', null, null, user);
  } catch (err) {
    if (err.code === USER_NOT_FOUND) {
      response(res, 'NOT_FOUND', err.code);
      return;
    }
    if (err.code === INVALID_CREDENTIALS) {
      response(res, 'UNAUTHORIZED', err.code);
      return;
    }
    serverError(res, DATABASE_ERROR);
  }
}
