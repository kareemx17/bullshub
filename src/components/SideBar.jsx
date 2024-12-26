import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-screen w-44 bg-gray-800 text-white flex flex-col">
      <div className="p-6">
        <Link
          to="/messages"
          className="flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <FaEnvelope className="mr-2" /> Messaging
        </Link>
      </div>
      {/* Sidebar Header */}
      {/* <div className="text-2xl font-semibold p-6">
        Sidebar
      </div> */}

      {/* Sidebar Categories */}
      <div className="flex-grow">
        <ul className="space-y-4 p-6">
          <li>
            <Link to="/lab-project-kits" className="text-m hover:text-gray-400">
              Lab Project Kits
            </Link>
          </li>
          <li>
            <Link to="/books" className="text-m hover:text-gray-400">
              Books
            </Link>
          </li>
          <li>
            <Link to="/dorm" className="text-m hover:text-gray-400">
              Dorm essentials
            </Link>
          </li>
        </ul>
      </div>

      {/* Messaging Button */}
    </div>
  );
};

export default Sidebar;
