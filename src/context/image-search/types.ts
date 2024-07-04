import { ImageItem } from 'src/types/image';

export type ContextType = StateType & {
  setImages: (images: string[]) => void;
  setDataset: (value: string) => void;
};

export type StateType = {
  images: ImageItem[];
  dataset: string;
};

export enum ETypes {
  SET_IMAGES = 'SET_IMAGES',
  SET_DATASET = 'SET_DATASET',
}

type TPayload = {
  [ETypes.SET_IMAGES]: {
    images: string[];
  };
  [ETypes.SET_DATASET]: {
    dataset: string;
  };
};

type TActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type TActions = TActionMap<TPayload>[keyof TActionMap<TPayload>];
