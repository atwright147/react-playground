import { useState } from 'react';
import classnames from 'classnames';
import styles from './Accordion.module.scss';

export interface Props {
  id: string,
  title: string,
  items: Item[],
}

export interface Item {
  heading: string,
  content: string,
}

// Panel open state (`true` if open)
type State = Record<string, boolean>;

export const Accordion = ({ id, title, items }: Props): JSX.Element => {
  const initialState: State = {};
  items.forEach((_, index) => initialState[index + ''] = false);
  const [state, setState] = useState<State>(initialState);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    event.stopPropagation();
    const _id = id.toString();
    const isOpen = state[_id];

    // Animation
    const accordionItem = ((event.nativeEvent.target as HTMLButtonElement).parentNode as HTMLHeadingElement).parentNode;
    const contentElement = accordionItem?.querySelector('.content') as HTMLElement;
    const contentElementHeight = contentElement?.scrollHeight;

    if (isOpen) {
      contentElement.style.maxHeight = '0';
    } else {
      contentElement.style.maxHeight = `${contentElementHeight}px`;
    }

    setState(prevState => ({ ...prevState, [_id]: !prevState[_id] }));
  }

  return (
    <>
      <h2 className={styles.title}>{title}</h2>

      {items.map((item, index) => {
        const isOpen = state[index];

        return (
          <div className={classnames(styles.item, {
            [styles.open]: isOpen,
            [styles.closed]: !isOpen,
          })} key={`${item.heading}__${index}`} id={id}>
            <h3 className={styles.heading} id={`${id}-heading--${index}`}>
              <button
                onClick={(event) => handleClick(event, index)}
                aria-expanded={isOpen}
                aria-controls={`${id}-section--${index}`}
              >
                {item.heading}
              </button>
            </h3>

            <section
              id={`${id}-section--${index}`}
              aria-labelledby={`${id}-heading--${index}`}
              className={classnames('content', styles.section)}
              style={{ maxHeight: isOpen ? 'auto' : '0' }}
            >
              <div className={styles.contentWrapper}>
                <p>{item.content}</p>
              </div>
            </section>
          </div>
        )
      })}
    </>
  );
}
