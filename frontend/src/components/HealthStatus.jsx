import { getHealth } from '../services/api';
import { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

const HealthStatus = () => {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    getHealth().then(() => setStatus('online')).catch(() => setStatus('offline'));
  }, []);

  if (status === 'checking') return null;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${status === 'online' ? 'bg-[#12161B] border-[#10B981]/20' : 'bg-[#12161B] border-[#EF4444]/20'}`}>
      <span className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-[#10B981] animate-pulse' : 'bg-[#EF4444]'}`}></span>
      <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">{status === 'online' ? 'API Online' : 'API Offline'}</span>
    </div>
  );
};

export default HealthStatus;
