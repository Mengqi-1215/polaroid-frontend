import AsyncStorage from "@react-native-async-storage/async-storage";
export const API_BASE_URL = "http://192.168.1.218:3001";

export async function getStoredToken() {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem("polaroid.token");
  }

  return AsyncStorage.getItem("polaroid.token");
}

export async function saveStoredToken(token: string) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("polaroid.token", token);
  }

  await AsyncStorage.setItem("polaroid.token", token);
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
}

export async function authApiFetch(path: string, options: RequestInit = {}) {
  const token = await getStoredToken();

  if (!token) {
    throw new Error("No auth token found. Please log in first.");
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
}

export async function getPhotoSignedUrl(photoId: string) {
  const body = await authApiFetch(`/photos/${photoId}/url`, {
    method: "GET",
  });

  return body?.data?.url as string;
}

export async function processPhoto(photoId: string, mode: "mini" | "square" | "wide" = "mini") {
  return authApiFetch(`/photos/${photoId}/process`, {
    method: "POST",
    body: JSON.stringify({
      mode,
      autoProcess: true,
    }),
  });
}

export async function restorePhoto(photoId: string) {
  return authApiFetch(`/photos/${photoId}/restore`, {
    method: "POST",
  });
}

export async function uploadPhotoUri(uri: string) {
  const token = await getStoredToken();

  if (!token) {
    throw new Error("No auth token found. Please log in first.");
  }

  const formData = new FormData();
  const filename = `camera-${Date.now()}.jpg`;

  if (uri.startsWith("data:") || uri.startsWith("blob:")) {
    const blob = await fetch(uri).then((res) => res.blob());
    formData.append("file", blob, filename);
  } else {
    formData.append("file", {
      uri,
      name: filename,
      type: "image/jpeg",
    } as any);
  }

  console.log("[uploadPhotoUri] uploading", {
    uriType: uri.slice(0, 32),
    filename,
    api: `${API_BASE_URL}/upload`,
  });

  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("[uploadPhotoUri] upload failed", data);
    throw new Error(data?.message || "Upload failed");
  }

  console.log("[uploadPhotoUri] upload success", data);
  return data;
}