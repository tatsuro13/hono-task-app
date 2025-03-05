const API_URL = 'http://localhost:9000';

export const fetchTasks = async () => {
  const res = await fetch(`${API_URL}/tasks`);
  return res.json();
}

export const addTask = async (title: string) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title })
  });
  
  if(!res.ok) {
    throw new Error('Failed to add task');
  }
  
  return res.json();
}