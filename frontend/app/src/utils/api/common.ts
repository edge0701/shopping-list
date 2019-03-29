import { API_URL } from '../../../config';

const onError = (resp) => {
  if (resp && resp.error) {
    const {error} = resp;
    throw {error};
  } else {
    throw new Error('Unknown error');
  }
};

const processResponse = async (resp: Response) => {
  if (resp.ok) {
    return await resp.json();
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
  try {
    const resp = await fetch(`${API_URL}${path}`, {
      method: 'GET',
      ...opts,
    });
    return await processResponse(resp);

  } catch (err) {
    onError(err);
  }
};

export const post = async (path: string, body: any) => {
  try {
    const resp = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      ...opts,
    });
    return await processResponse(resp);

  } catch (err) {
    onError(err);
  }
};

export const put = async (path: string, body: any) => {
  try {
    const resp = await fetch(`${API_URL}${path}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...opts,
    });
    return await processResponse(resp);

  } catch (err) {
    onError(err);
  }
};
