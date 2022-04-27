import React, { useEffect, useContext } from 'react';

import StickyBarContext from './context';
type PanelProps = {
  index: string;
};
const Panel = (props: React.PropsWithChildren<PanelProps>) => {
  const { setIndexes } = useContext(StickyBarContext);
  const { index } = props;
  useEffect(() => {
    setIndexes((prev) => prev.concat(index));
    return () => {
      setIndexes((prev) => prev.filter((i) => i !== index));
    };
  }, [index]);
  return (
    <div data-index={index} className="sticky-bar_panel">
      {props.children}
    </div>
  );
};
export default Panel;
