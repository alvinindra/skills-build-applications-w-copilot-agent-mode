import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Fetching activities from:', apiUrl);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Activities data:', data);
        setActivities(data.results || data);
      })
      .catch(error => console.error('Error fetching activities:', error));
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0 h4">Activities</h2>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0">
              <thead className="table-light">
                <tr>
                  <th>Type</th>
                  <th>Duration (mins)</th>
                  <th>Distance (km)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.length > 0 ? (
                  activities.map(activity => (
                    <tr key={activity.id}>
                      <td>{activity.activity_type}</td>
                      <td>{activity.duration}</td>
                      <td>{activity.distance}</td>
                      <td>{new Date(activity.date).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No activities found</td>
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

export default Activities;
