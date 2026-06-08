import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL || "https://ecommerce-server-brown.vercel.app/"; // fallback when env isn't loaded
console.log('[API] VITE_API_URL ->', apiUrl);
const getToken = () => localStorage.getItem("accessToken");

const buildAuthHeaders = () => {
  const token = getToken();
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

const buildRequestConfig = (extraHeaders = {}) => ({
  headers: {
    ...buildAuthHeaders(),
    ...extraHeaders,
  },
  withCredentials: true,
});

export const postData = async (url, formData) => {
  try {
    const token = localStorage.getItem("accessToken");
    const base = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
    const fullUrl = url.startsWith('/') ? base + url : base + '/' + url;
    console.log('[postData] POST ->', fullUrl);

    const headers = {
      "Content-Type": "application/json",
      ...buildAuthHeaders(),
    };

    const response = await fetch(fullUrl, {
      method: "POST",
      credentials: "include",
      headers,
      body: JSON.stringify(formData)
    });

    const ct = response.headers.get('content-type') || '';
    if (ct.includes('application/json')) return await response.json();
    return { status: response.status, text: await response.text() };
  } catch (error) {
    console.error('[postData] error', error);
    throw error;
  }
};



export const getData = async (url) => {
  try {
    const base = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
    const fullUrl = url.startsWith('/') ? base + url : base + '/' + url;

    const { data } = await axios.get(fullUrl, buildRequestConfig({ "Content-Type": "application/json" }));
    return data;
  } catch (error) {
    console.error("GET DATA ERROR:", error);
    throw error;
  }
};


export const uploadData = async (url, formData ) => {
  const base = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
  const fullUrl = url.startsWith('/') ? base + url : base + '/' + url;

  try {
    const response = await axios.post(fullUrl, formData, buildRequestConfig());
    return response;
  } catch (error) {
    console.error('[uploadData] error', error);
    throw error;
  }
};

export const editData = async (url, updatedData) => {
  const base = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
  const fullUrl = url.startsWith('/') ? base + url : base + '/' + url;

  let response;
  await axios.put(fullUrl, updatedData, buildRequestConfig({ "Content-Type": "application/json" }))
    .then((res) => {
      console.log(res);
      response = res;
    })
    .catch((err) => {
      console.log(err);
      response = err;
    });

  return response;
};


export const deleteImages = async (url, image) => {
    const base = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
    const fullUrl = url.startsWith("/") ? base + url : base + "/" + url;

    const res = await axios.delete(fullUrl, {
        data: { image },
        ...buildRequestConfig(),
    });

    return res.data;
};