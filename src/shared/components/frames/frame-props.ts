import type { FrameMood } from './types';

export type FrameComponentProps = {
  mood: FrameMood;
  drawProgress: number;
  useMountAnimation?: boolean;
};
