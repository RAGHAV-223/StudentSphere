import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ThreadDetailPage = () => {
  const { threadId } = useParams();  // Get the thread ID from the URL
  const [thread, setThread] = useState(null);

  useEffect(() => {
    // Fetch thread data from the backend
    fetch(`/api/threads/${threadId}`)
      .then(response => response.json())
      .then(data => setThread(data))
      .catch(error => console.error('Error fetching thread:', error));
  }, [threadId]);

  if (!thread) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{thread.title}</h1>
      <p className="text-gray-700 mb-4">{thread.content}</p>
      {/* Render comments and other thread details */}
    </div>
  );
};

export default ThreadDetailPage;