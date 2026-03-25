const API = "http://localhost:5000/api";

export async function apiGet(path, token) {
  const res = await fetch(`${API}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.json();
}

export async function apiPost(path, body, token, isForm = false) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: isForm
      ? (token ? { Authorization: `Bearer ${token}` } : {})
      : {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    body: isForm ? body : JSON.stringify(body),
  });
  return res.json();
}

export async function apiDelete(path, token) {
  const res = await fetch(`${API}${path}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.json();
}