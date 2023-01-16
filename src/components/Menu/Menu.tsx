import classnames from 'classnames';
import { ComponentPropsWithoutRef, FC } from 'react';

import styles from './Menu.module.scss';

export interface MenuItem {
  title: string,
  action: (() => void) | string | (string | number)[],
}

export interface Props extends ComponentPropsWithoutRef<'menu'> {
  menu: MenuItem[],
}

export const Menu: FC<Props> = ({ menu, className, ...props }): JSX.Element => (
  <menu className={classnames(styles.menu, className)} role="menu" {...props}>
    {menu && menu.map((item, index) => (
      <li className={styles.menuItem} key={index} role="none">
        <button
          key={`${index}__${item.title}`}
          type="button"
          onClick={() => console.info(item.title)}
          role="menuitem"
        >{item.title}</button>
      </li>
    ))}
  </menu>
);
