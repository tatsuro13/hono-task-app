const API_URL = 'http://localhost:9000';

export const fetchTasks = async () => {
  const res = await fetch(`${API_URL}/tasks`);
  return res.json();
}