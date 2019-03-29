import { API_URL } from '../../../config';

const processResponse = async (resp: Response) => {
  if (resp.ok) {
    if (resp.status === 200) return await resp.json();
  } else {
    let body;
    try {
      body = await resp.json();
    } catch (err) {
      throw err;
    }
    throw new Error(body.error);
  }
};

const opts: RequestInit = {
  mode: 'cors',
  cache: 'no-cache',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Request-Headers': 'Content-Type',
  },
};

export const get = async (path: string) => {
  const resp = await fetch(`${API_URL}${path}`, {
    method: 'GET',
    ...opts,
  });
  return await processResponse(resp);
};

export const post = async (path: string, body: any) => {
  const resp = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    body: JSON.stringify(body),
    ...opts,
  });
  return await processResponse(resp);
};

export const put = async (path: string, body: any) => {
  const resp = await fetch(`${API_URL}${path}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    ...opts,
  });
  return await processResponse(resp);
};
