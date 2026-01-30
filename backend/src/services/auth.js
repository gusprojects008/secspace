import userRepository from '../repositories/user';
import {ErrorCodes, error} from '../utils/errors';
import {hashPassword, verifyPassword, generateToken} from '../utils/security';
const {RESOURCE_ALREADY_EXISTS, RESOURCE_NOT_FOUND, INVALID_CREDENTIALS} = ErrorCodes;

export async function register(username, email, password) {
  const user_exists = await userRepository.findUserByEmail(email);
  if (user_exists) {
    error(RESOURCE_ALREADY_EXISTS);
  };
  const passwordHash = await hashPassword(password);
  const result = await userRepository.create(username, email, passwordHash);
  return result;
};

export async function login(email, password) {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    error(RESOURCE_NOT_FOUND);
  };
  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    error(INVALID_CREDENTIALS);
  };
  const token = generateToken(user);
  return {user, token};
};

export async function loginWithProvider({provider, providerUserId, email, emailVerified, username}) {
  const existingProvider =
    await authProviderRepository.findByProviderUserId(
      provider,
      providerUserId
    );

  if (existingProvider) {
    await authProviderRepository.markEmailAsVerified(emailVerified);
    const user = await userRepository.findByEmail(email);
    const token = generateToken(user);
    return {user, token};
  }

  const user = await userRepository.findByEmail(email);

  if (!user) {
    user = await userRepository.create(
      username,
      email,
      null,
    );
  }

  await authProviderRepository.create(
    user.id,
    provider,
    providerUserId,
    emailVerified
  );

  const token = generateToken(user);
  return {user, token};
}
