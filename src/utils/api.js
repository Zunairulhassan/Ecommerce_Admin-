import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL || "https://ecommerce-server-brown.vercel.app/"; // fallback when env isn't loaded
console.log('[API] VITE_API_URL ->', apiUrl);
const getToken = () => localStorage.getItem("accessToken");

export const postData = async (url, formData) => {
  try {
    const token = localStorage.getItem("accessToken");
    const base = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
    const fullUrl = url.startsWith('/') ? base + url : base + '/' + url;
    console.log('[postData] POST ->', fullUrl);

    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : "",
      },
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
    const token = localStorage.getItem("accessToken");
    const params = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    }

    const base = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
    const fullUrl = url.startsWith('/') ? base + url : base + '/' + url;

    const { data } = await axios.get(fullUrl, params);
    return data;
  } catch (error) {
    console.error("GET DATA ERROR:", error);
    throw error;
  }
};


export const uploadData = async (url, formData ) => {
  const token = localStorage.getItem("accessToken");

  const params = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "multipart/form-data",
    },
  };

  const base = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
  const fullUrl = url.startsWith('/') ? base + url : base + '/' + url;

  try {
    const response = await axios.post(fullUrl, formData, params);
    return response;
  } catch (error) {
    console.error('[uploadData] error', error);
    throw error;
  }
};

export const editData = async (url, updatedData) => {
  const token = localStorage.getItem("accessToken");

  const params = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };

  const base = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
  const fullUrl = url.startsWith('/') ? base + url : base + '/' + url;

  var response;
  await axios.put(fullUrl, updatedData, params).then((res) => {
    console.log(res)
    response = res
  }).catch((err) => {
    console.log(err)
    response = err
  });

  return response;
};


export const deleteImages = async (url, image) => {
    const fullUrl = url.startsWith("/")
        ? apiUrl + url
        : apiUrl + "/" + url;

    const res = await axios.delete(fullUrl, {
        data: { image },
        headers: {
            Authorization: getToken() ? `Bearer ${getToken()}` : "",
        },
    });

    return res.data;
};