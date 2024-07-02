import { useMemo, useReducer, useCallback } from 'react';

import { endpoints } from '../../utils/axios';
import { ETypes, TActions, StateType } from './types';
import { ImageSearchContext } from './image-search-context';

//----------------------------------------------------------------------
const initialState: StateType = {
  images: [],
};
const reducer = (state: StateType, action: TActions) => {
  switch (action.type) {
    case ETypes.SET_IMAGES:
      return {
        ...state,
        images: action.payload.images.map((image) => endpoints.image.getImage(image)),
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

  const memoizedValue = useMemo(
    () => ({
      images: state.images,
      //
      setImages,
    }),
    [state, setImages]
  );

  return (
    <ImageSearchContext.Provider value={memoizedValue}>{children}</ImageSearchContext.Provider>
  );
}
