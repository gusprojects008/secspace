import googleAdapter from '../../adapters/google';
import authService from '../../services/auth';
import {response, createAuthCookie} from '../utils/http';

export async function googleLogin(req, res) {
  const url = googleAdapter.getAuthUrl();
  res.redirect(url);
}

export async function googleCallback(req, res) {
  const code = req.query?.code;
  const {googleId, email, emailVerified, username} = await googleAdapter.handleCallback(code);
  if (!googleId || !email || !username) serverError(res, ADAPTER_ERROR) return;
  try {
    const {user, token} = await authService.loginWithGoogle(googleId, email, emailVerified, username);
    req.session.userId = user.id;
    createAuthCookie(res, token);
    res.redirect('/');
  } catch (err) {
    if (err.code === RESOURCE_CREATION_FAILED) {
      response(res, 'CONFLICT', err.code);
      return; 
    };
  };
  serverError(res, DATABASE_ERROR);
}
