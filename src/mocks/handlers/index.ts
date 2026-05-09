import { chatHandlers } from './chat';
import { matchHandlers } from './match';
import { profileHandlers } from './profile';
import { reportHandlers } from './report';
import { reviewHandlers } from './review';
import { scheduleHandlers } from './schedule';

export const handlers = [
  ...profileHandlers,
  ...matchHandlers,
  ...scheduleHandlers,
  ...chatHandlers,
  ...reviewHandlers,
  ...reportHandlers,
];
