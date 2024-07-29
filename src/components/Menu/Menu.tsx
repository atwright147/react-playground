import classnames from 'classnames';
import type { ComponentPropsWithoutRef, FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './Menu.module.scss';

export interface MenuItem {
  title: string;
  action: (() => void) | string | (string | number)[];
}

export interface Props extends ComponentPropsWithoutRef<'menu'> {
  menu: MenuItem[];
}

export const arrayToLink = (menuItem: MenuItem): JSX.Element => {
  const url = (menuItem.action as (string | number)[]).join('/');
  return <Link to={url}>{menuItem.title}</Link>;
};

export const stringToLink = (menuItem: MenuItem): JSX.Element => <Link to={menuItem.action as string}>{menuItem.title}</Link>;

export const Menu: FC<Props> = ({ menu, className, ...props }): JSX.Element => (
  <menu className={classnames(styles.menu, className)} role="menu" {...props}>
    {menu &&
      menu.map((item, index) => (
        <li className={styles.menuItem} key={index} role="none">
          <button key={`${index}__${item.title}`} type="button" onClick={() => console.info(item.title)} role="menuitem">
            {item.title}
          </button>
        </li>
      ))}
  </menu>
);
