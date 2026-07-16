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
  return { id: profile.id, name: profile.name };
}

export function applyProfilePatch(
  profile: Profile,
  patch: ProfilePatch,
): Profile {
  return { ...profile, ...patch };
}
