export function loadUserProfile(fetchUser, fetchPosts) {
  return fetchUser().then((user) => {
    return fetchPosts(user.id).then((posts) => {
      return { user, posts };
    });
  });
}

export function loadWithFallback(fetchData, fetchBackup) {
  return fetchData().catch(() => {
    return fetchBackup();
  });
}
