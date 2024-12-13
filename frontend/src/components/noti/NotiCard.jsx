import React from 'react'
import { Link } from 'react-router-dom'

const NotiCard = () => {
    const notifications = [
        {
          header: "New message",
          content: "You have a new message from John Doe."
        },
        {
          header: "Order shipped",
          content: "Order #1234 has been shipped and is on its way."
        },
        {
          header: "Subscription expiring",
          content: "Your subscription will expire in 3 days. Renew now!"
        },
        {
          header: "New comment",
          content: "Someone commented on your post 'How to cook pasta'."
        }
      ];

  return (
     <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-72 p-4 z-50">
      <h4 className="font-semibold text-lg mb-2">Notifications</h4>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} className="py-2 border-b">
            <p className="font-medium text-sm text-gray-800">{notification.header}</p>
            <p className="text-sm text-gray-600">{notification.content}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-center">
        <Link to="/notifications" className="text-primary-color hover:underline text-sm">
          View all notifications
        </Link>
      </div>
    </div>
  )
}

export default NotiCard