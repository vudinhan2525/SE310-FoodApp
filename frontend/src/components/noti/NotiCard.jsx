import notiApi from '@/apis/notiApi';
import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';



const NotiCard = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await notiApi.getNotiByUser(1, 4, userId);
        setNotifications(response.data); 
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]); 

  const handleDeleteNotification = async (notificationId) => {
    try {
      await notiApi.deleteNotification(notificationId);
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== notificationId)
      );
    } catch (error) {
      console.log('Error deleting notification:', error);
    }
  };
  useEffect(() => {
    console.log('Updated notifications:', notifications);
  }, [notifications]);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-72 p-4 z-50">
      <h4 className="font-semibold text-lg mb-2">Notifications</h4>
      <ul>
        {notifications?.length > 0 ? (
          notifications.map((notification, index) => (
            <li key={index} className="py-2 border-b flex justify-between">
                <div>
                    <p className="font-medium text-sm text-gray-800">{notification.header}</p>
                    <p className="text-sm text-gray-600">{notification.content}</p>
                </div>
                <button
                    onClick={() => handleDeleteNotification(notification.notiId)}
                    className="text-gray-500 hover:text-red-500"
                >
                <FaTimes />
                </button>
            </li>
          ))
        ) : (
          <li>No notifications available.</li>
        )}
      </ul>
    </div>
  );
};

export default NotiCard;
