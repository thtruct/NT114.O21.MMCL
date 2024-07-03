import { useMemo, useReducer, useCallback } from 'react';

import { getLink } from 'src/utils/image';

import { ETypes, TActions, StateType } from './types';
import { ImageSearchContext } from './image-search-context';

//----------------------------------------------------------------------
const initialState: StateType = {
  images: [],
  dataset: 'cirr',
};
const reducer = (state: StateType, action: TActions) => {
  switch (action.type) {
    case ETypes.SET_IMAGES:
      return {
        ...state,
        images: action.payload.images.map((image) => ({
          name: image,
          url: getLink(image),
        })),
      };
    case ETypes.SET_DATASET:
      return {
        ...state,
        dataset: action.payload.dataset,
      };
    default:
      return state;
  }
};
// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function ImageSearchProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setImages = useCallback((value: string[]) => {
    dispatch({
      type: ETypes.SET_IMAGES,
      payload: {
        images: value,
      },
    });
  }, []);

  const setDataset = useCallback((dataset: string) => {
    dispatch({
      type: ETypes.SET_DATASET,
      payload: {
        dataset,
      },
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      //
      setImages,
      setDataset,
    }),
    [state, setImages, setDataset]
  );

  return (
    <ImageSearchContext.Provider value={memoizedValue}>{children}</ImageSearchContext.Provider>
  );
}
