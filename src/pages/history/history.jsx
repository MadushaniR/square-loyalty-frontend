import { useOutletContext } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import './history.scss';

const History = () => {
  const context = useOutletContext();
  const purchaseHistory = context?.purchaseHistory || [];
  const totalPoints = context?.totalPoints || 0;

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
    type: item.redeemedPoints ? 'Redeem' : 'Purchase',
    name: item.name,
    price: item.redeemedPoints ? '-' : item.price.toFixed(2),
    points: item.points || 0,
    redeemedPoints: item.redeemedPoints || 0,
    time: item.time,
  }));

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
          <div className="total-points">
            <strong>Total Points Available:</strong> {totalPoints}
          </div>
        </>
      )}
    </div>
  );
};

export default History;
