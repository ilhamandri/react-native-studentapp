export const fetchData = async (method, url, body) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  try {
    const request = await fetch(url, config);
    const data = await request.json();
    return data;
  } catch (err) {
    Promise.reject(err);
  }
};
