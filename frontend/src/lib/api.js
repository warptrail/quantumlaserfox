const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL is not defined');
}

export async function getIdeas() {
  const response = await fetch(`${API_BASE_URL}/ideas`);

  if (!response.ok) {
    throw new Error('Failed to fetch ideas');
  }

  return response.json();
}

export async function createIdea(ideaData) {
  const response = await fetch(`${API_BASE_URL}/ideas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ideaData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to create idea');
  }

  return data;
}

export async function updateIdea(id, ideaData) {
  const response = await fetch(`${API_BASE_URL}/ideas/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ideaData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to update idea');
  }

  return data;
}

export async function deleteIdea(id) {
  const response = await fetch(`${API_BASE_URL}/ideas/${id}`, {
    method: 'DELETE',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete idea');
  }

  return data;
}
