import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../utils/Consts';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="grid h-screen place-items-center">
      <button
        onClick={() => navigate(PRODUCTS)}
        className="flex items-center justify-center bg-blue-500 text-white p-2 px-12 rounded">
        Войти
      </button>
    </div>
  );
};

export default Welcome;
