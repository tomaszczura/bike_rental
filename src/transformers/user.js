export function transformUser({ profile, token }) {
  return {
    token,
    profile: {
      id: profile.id,
      email: profile.email,
      role: profile.role
    }
  };
}
