// components/LiveFeed.tsx
import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface Message {
  message: string;
  user: string;
}

interface LiveFeedProps {
  classroomId: string;
}

let socket: Socket;

const LiveFeed: React.FC<LiveFeedProps> = ({ classroomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    socket = io('http://localhost:8000');

    socket.emit('joinClassroom', classroomId);

    socket.on('receiveMessage', (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [classroomId]);

  const sendMessage = () => {
    if (input.trim() === '' || !user) return;
    socket.emit('sendMessage', { classroomId, message: input, user: user.name });
    setInput('');
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-xl font-semibold mb-2">Live Feed</h3>
      <div className="h-64 overflow-y-scroll border p-2 mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-1 text-black">
            <strong>{msg.user}: </strong>{msg.message}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 px-2 py-1 border rounded-l text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-1 bg-blue-600 text-white rounded-r hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default LiveFeed;
