import { type ComponentPropsWithRef, type FC, type ReactNode, useState } from 'react';
import classnames from 'classnames';
import useClickAway from 'react-use-click-away';

import styles from './Popover.module.scss';

export interface Props extends ComponentPropsWithRef<'div'> {
  children: ReactNode;
}

// https://accessibleit.disability.illinois.edu/courses/aria-intro/slide30.html

export const Popover: FC<Props> = ({ children, className, ...props }: Props): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  useClickAway({
    open,
    setOpen,
    reactAppId: 'root',
    clickable: [props.id],
  });

  return (
    <div className={classnames('popover', { [styles.open]: open })}>
      <div className="buttonGroup">
        <button type="button" onClick={console.info}>
          Label
        </button>
        <button type="button" onClick={() => setOpen(!open)} id={props.id} aria-haspopup="true" aria-controls="id-menu">
          <div className={styles.indicator}>&#9650;</div>
        </button>
      </div>

      <div className={classnames(styles.container, className)}>
        {open && children && <div className={classnames(styles.content)}>{children}</div>}
      </div>
    </div>
  );
};
