import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Fetching leaderboard from:', apiUrl);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Leaderboard data:', data);
        setLeaderboard(data.results || data);
      })
      .catch(error => console.error('Error fetching leaderboard:', error));
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-success text-white">
          <h2 className="mb-0 h4">Leaderboard</h2>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0">
              <thead className="table-light">
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Total Distance (km)</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length > 0 ? (
                  leaderboard.map((entry, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{entry.user}</td>
                      <td>{entry.total_distance}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">No leaderboard data found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
