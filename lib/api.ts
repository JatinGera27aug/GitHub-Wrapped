import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const fetchGithubData = async (username: string) => {
  try {
    const { data } = await api.get(`/github/${username}`);
    return data;
  } catch (error) {
    throw new Error('Failed to fetch GitHub data');
  }
};