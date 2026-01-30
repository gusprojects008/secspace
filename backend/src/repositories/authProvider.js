import db from "../adpaters/db";

export async function findByProviderUserId(provider, providerUserId) {
  const {rows} = await db.query(
    `
    SELECT *
    FROM auth_providers
    WHERE provider = $1
      AND provider_user_id = $2
    `,
    [provider, providerUserId]
  );

  return rows[0] || null;
}

export async function markEmailAsVerified(provider, providerUserId, emailVerified) {
  if (!emailVerified) return;

  await db.query(
    `
    UPDATE auth_providers
    SET email_verified = true,
        update_at = NOW()
    WHERE provider = $1
      AND provider_user_id = $2
    `,
    [provider, providerUserId]
  );
}

export async function create(userId, provider, providerUserId, emailVerified) {
  const {rows} = await db.query(
    `
    INSERT INTO auth_providers (
      user_id,
      provider,
      provider_user_id,
      email_verified
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [userId, provider, providerUserId, emailVerified]
  );

  return rows[0];
}
