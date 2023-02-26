import ky from 'ky';

import { useSpinnerStore } from '../../stores/spinner.store';

export const client = ky.create({
  hooks: {
    beforeRequest: [
      () => useSpinnerStore.getState().increment(),
    ],
    beforeError: [
      () => useSpinnerStore.getState().decrement() as any,
    ],
    afterResponse: [
      () => useSpinnerStore.getState().decrement() as any,
    ],
  }
});
