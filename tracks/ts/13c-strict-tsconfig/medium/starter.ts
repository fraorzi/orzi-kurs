export type Profile = {
  displayName: string;
  avatarUrl: string | null;
};

export type ProfilePatch = {
  displayName?: string;
  avatarUrl?: string | null;
};

export function applyProfilePatch(
  profile: Profile,
  patch: ProfilePatch,
): Profile {
  // TODO
  return profile;
}

export function hasProfileChanges(patch: ProfilePatch): boolean {
  // TODO
  return false;
}
