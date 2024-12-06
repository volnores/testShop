import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import { publicRoutes } from '../routes';
import Welcome from '../pages/Welcome';

const AppRouter: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Welcome />} />
          {publicRoutes.map((item) => (
            <Route key={item.path} path={item.path} element={<item.element />} />
          ))}
        </Route>
      </Routes>
    </div>
  );
};

export default AppRouter;
