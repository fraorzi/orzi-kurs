export async function loadUserProfile(fetchUser, fetchPosts) {
  const user = await fetchUser();
  const posts = await fetchPosts(user.id);
  return { user, posts };
}

export async function loadWithFallback(fetchData, fetchBackup) {
  try {
    return await fetchData();
  } catch {
    return fetchBackup();
  }
}
