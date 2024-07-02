export type ContextType = {
  images: string[];
  //
  setImages: (images: string[]) => void;
};

export type StateType = {
  images: string[];
};

export enum ETypes {
  SET_IMAGES = 'SET_IMAGES',
}

type TPayload = {
  [ETypes.SET_IMAGES]: {
    images: string[];
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
