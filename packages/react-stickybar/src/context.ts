import { createContext } from 'react';

const StickyBarContext = createContext<{
  indexes: string[];
  setIndexes: React.Dispatch<React.SetStateAction<string[]>>;
}>({
  indexes: [],
  setIndexes: () => {},
});
export default StickyBarContext;
