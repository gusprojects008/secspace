const db = require('./db');

export async function list() {
  const query = 'SELECT c.id, c.content, c.created_at, u.username FROM comments c JOIN users u ON u.id = c.user_id ORDER BY c.created_atASC';
  const result = await db.query(query);
  return result.rows;
};

export async function create(userId, content) {
  const query = 'INSERT INTO comments (user_id, content) VALUES ($1, $2) RETURNING id, content, user_id, created_at';
  const values = [userId, content];
  const result = await db.query(query, values);
  return result.row[0];
};

export async function update(commentId, userId, content) {
  const query = 'UPDATE comments SET content = $3 WHERE id = $1 AND user_id = $2 RETURNING id, content';
  const values = [commentId, userId, content];
  const result = await db.query(query, values);
  return result.rows[0];
};

export async function delete(commentId, userId) {
  const query = 'DELETE FROM comments WHERE id = $1 AND user_id = $2';
  const values = [commentId, userId];
  const result = await db.query(query, values);
  return result.rowCount;
};
