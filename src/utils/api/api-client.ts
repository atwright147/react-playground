import ky from 'ky';

import { useSpinnerStore } from '../../stores/spinner.store';

export const client = ky.create({
  hooks: {
    beforeRequest: [() => useSpinnerStore.getState().increment()],
    beforeError: [
      // @ts-ignore
      () => useSpinnerStore.getState().decrement(),
    ],
    afterResponse: [
      // @ts-ignore
      () => useSpinnerStore.getState().decrement(),
    ],
  },
});
