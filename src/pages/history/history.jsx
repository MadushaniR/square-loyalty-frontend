import { useOutletContext } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import './history.scss';

const History = () => {
  const context = useOutletContext();
  const purchaseHistory = context?.purchaseHistory || [];
  const totalPoints = context?.totalPoints || 0;

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Item', width: 150 },
    { field: 'price', headerName: 'Price (Rs)', width: 150 },
    { field: 'points', headerName: 'Points Earned', width: 180 },
    { field: 'time', headerName: 'Time', width: 180 },
  ];

  const rows = purchaseHistory.map((item, idx) => ({
    id: idx + 1,
    name: item.name,
    price: item.price.toFixed(2),
    points: item.points,
    time: item.time,
  }));

  return (
    <div className="history-page">
      <h2>Purchase History</h2>
      {purchaseHistory.length === 0 ? (
        <p>No purchases yet.</p>
      ) : (
        <>
          <Box sx={{ height: 400, width: '100%' }}>
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
            <strong>Total Points Earned:</strong> {totalPoints}
          </div>
        </>
      )}
    </div>
  );
};

export default History;
