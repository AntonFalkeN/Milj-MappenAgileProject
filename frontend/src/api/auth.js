const backendUrl = import.meta.env.VITE_API_URL;

export async function getMe() {
  const res = await fetch(`${backendUrl}/api/me`, {
    credentials: "include",
  });

  return res.ok ? res.json() : { loggedIn: false };
}