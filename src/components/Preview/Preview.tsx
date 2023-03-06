import { FC } from 'react';

export const Preview: FC = (data): JSX.Element | null => {
  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
};
