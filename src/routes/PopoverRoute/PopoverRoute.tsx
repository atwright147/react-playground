import { Menu, MenuItem } from '../../components/Menu/Menu';
import { Popover } from '../../components/Popover/Popover';

const menu: MenuItem[] = [
  {
    title: 'Item 1',
    action: () => console.info('Item 1'),
  },
  {
    title: 'Item 2',
    action: () => console.info('Item 2'),
  },
  {
    title: 'Item 3',
    action: () => console.info('Item 3'),
  },
];

export const PopoverRoute = (): JSX.Element => (
  <>
    <Popover id="my-popover">
      <Menu menu={menu}/>
    </Popover>
  </>
);
