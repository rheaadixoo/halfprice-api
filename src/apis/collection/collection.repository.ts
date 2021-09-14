import { Collection } from './collection.model';

export const COLLECTION_REPOSITORY = 'COLLECTION_REPOSITORY';

export const CollectionRepository = {
  provide: COLLECTION_REPOSITORY,
  useValue: Collection,
};
