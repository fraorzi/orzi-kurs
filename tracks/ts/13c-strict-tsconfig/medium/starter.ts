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
  // TODO: obecność klucza, nie porównanie z undefined
  return profile;
}

export function hasProfileChanges(patch: ProfilePatch): boolean {
  // TODO: pusty obiekt false; jawny null avatarUrl to zmiana
  return false;
}
