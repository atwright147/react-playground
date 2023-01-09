import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Nav } from '../../components/Nav/Nav';

import './Root.scss'

export const Root = (): JSX.Element => (
  <div className="app grid">
    <div className="header">
      <Header>
        <div className="left">
          <img src="/vite.svg" style={{ width: '25px' }} alt="" />
          Left
        </div>
        <div className="right">
          Right
        </div>
      </Header>
    </div>
    <div className="aside">
      <Nav />
    </div>
    <div className="main">
      <Outlet />
    </div>
    <div className="footer">Footer</div>
  </div>
);
