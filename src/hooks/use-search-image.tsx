import { useContext } from 'react';

//
import { ImageSearchContext } from 'src/context/image-search';

// ----------------------------------------------------------------------

export const useSearchImage = () => {
  const context = useContext(ImageSearchContext);

  if (!context) throw new Error('useSearchImage context must be use inside ImageSearchProvider');

  return context;
};
