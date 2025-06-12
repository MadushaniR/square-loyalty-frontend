import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import './history.scss';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const History = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchHistory = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [resHistory, resBalance] = await Promise.all([
          axios.get(`${API_BASE_URL}/history`, config),
          axios.get(`${API_BASE_URL}/balance`, config),
        ]);

        setPurchaseHistory(resHistory.data.history || []);
        setTotalPoints(resBalance.data.balance || 0);
      } catch (err) {
        console.error('Failed to fetch history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [token, navigate]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'type', headerName: 'Type', width: 120 },
    { field: 'name', headerName: 'Item', width: 150 },
    { field: 'price', headerName: 'Price (Rs)', width: 130 },
    { field: 'points', headerName: 'Points Earned', width: 150 },
    { field: 'redeemedPoints', headerName: 'Points Redeemed', width: 160 },
    { field: 'time', headerName: 'Time', width: 200 },
  ];

  const rows = purchaseHistory.map((item, idx) => ({
    id: idx + 1,
    type: item.type,
    name: item.name,
    price: item.redeemedPoints ? '-' : item.price?.toFixed(2),
    points: item.points || 0,
    redeemedPoints: item.redeemedPoints || 0,
    time: item.time,
  }));

  if (loading) return <p>Loading transaction history...</p>;

  return (
    <div className="history-page">
      <h2>Transaction History</h2>
      {rows.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <>
          <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f0f8f8',
                  color: '#2b898c',
                },
                '& .MuiDataGrid-cell': {
                  textAlign: 'center',
                },
              }}
            />
          </Box>
          <div className="total-points" style={{ marginTop: 16 }}>
            <strong>Total Points Available:</strong> {totalPoints}
          </div>
        </>
      )}
    </div>
  );
};

export default History;
