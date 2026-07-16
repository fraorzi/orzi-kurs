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
  return {
    displayName:
      "displayName" in patch ? patch.displayName : profile.displayName,
    avatarUrl: "avatarUrl" in patch ? patch.avatarUrl : profile.avatarUrl,
  };
}

export function hasProfileChanges(patch: ProfilePatch): boolean {
  return "displayName" in patch || "avatarUrl" in patch;
}
