export type Profile = {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
};

export type ProfilePreview = {
  id: number;
  name: string;
};

export type ProfilePatch = {
  name?: string;
  email?: string;
};

export function toProfilePreview(profile: ProfilePreview): ProfilePreview {
  // TODO
  return profile;
}

export function applyProfilePatch(
  profile: Profile,
  patch: ProfilePatch,
): Profile {
  // TODO
  return profile;
}
