import { Color } from './color.model';

export const COLOR_REPOSITORY = 'COLOR_REPOSITORY';

export const ColorRepository = {
  provide: COLOR_REPOSITORY,
  useValue: Color,
};
