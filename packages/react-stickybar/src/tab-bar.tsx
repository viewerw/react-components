import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

export type TabBarProps = {
  items: string[];
  activeItem: string;
  onActive: (index: string) => void;
};
const TabBar = (props: TabBarProps) => {
  const { items, activeItem, onActive } = props;

  const tabBar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    tabBar.current
      ?.querySelector('.active')
      ?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [activeItem]);
  return (
    <div className="sticky-bar_tab-bar" ref={tabBar}>
      {items.map((index) => (
        <div
          className={classNames('sticky-bar_tab-bar-item', {
            active: index === activeItem,
          })}
          onClick={() => onActive(index)}
          key={index}
        >
          {index}
        </div>
      ))}
    </div>
  );
};
export default TabBar;
