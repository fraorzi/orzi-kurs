export function namesByIds(users, ids) {
  const byId = new Map(users.map((user) => [user.id, user.name]));
  return ids.map((id) => byId.get(id));
}
