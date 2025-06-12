import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function usePoints() {
  const [totalPoints, setTotalPoints] = useState(0);

  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/balance`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotalPoints(res.data.balance);
    } catch {
      setTotalPoints(0);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return { totalPoints, setTotalPoints, fetchBalance };
}
