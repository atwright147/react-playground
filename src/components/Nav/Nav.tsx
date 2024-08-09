import { NavLink } from 'react-router-dom';

import { type NamedRouteObject, routes } from '../../routes';

import styles from './Nav.module.scss';

export const Nav = (): JSX.Element => (
  <nav className={styles.nav} aria-label="Primary">
    <h2>Routes</h2>
    {routes.map((route) => (
      <>
        <NavLink key={route.path} className={styles.link} to={route.path}>
          {route.name}
        </NavLink>
        {(route.children as NamedRouteObject[])?.map((child) => (
          <NavLink key={child.path} className={styles.link} to={child.path}>
            {child.name}
          </NavLink>
        ))}
      </>
    ))}
  </nav>
);
