import { createContext } from 'react';

const CollectionContext = createContext({
  colData: null,
  setColData: () => { },
});

export default CollectionContext;

