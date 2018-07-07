export function transformUserProfile({ profile, token }) {
  return {
    token,
    profile: {
      id: profile.id,
      email: profile.email,
      role: profile.role
    }
  };
}

export function transformUser({ profile }) {
  return {
    id: profile.id,
    email: profile.email,
    role: profile.role
  };
}
