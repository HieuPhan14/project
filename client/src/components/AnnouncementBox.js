import React from 'react';

const AnnouncementBox = ({ message, onClose }) => {
  return (
    <div className="card-panel #18ffff cyan accent-2">
      <p className='center'>{message}</p>
    </div>
  );
};

export default AnnouncementBox;