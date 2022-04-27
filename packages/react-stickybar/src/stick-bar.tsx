import React, { useState, useEffect, useRef } from 'react';
import { useThrottleFn } from 'ahooks';
import TabBar, { TabBarProps } from './tab-bar';

import StickyBarContext from './context';

type StickyBarProps = {
  scrollContainer: React.RefObject<HTMLElement>;
  CustomTabBar?: (props: TabBarProps) => JSX.Element;
  tabBarHeight?: number;
};
let isScrolling = false;
const smoothScroll = (target: HTMLElement, scrollTop: number, duration = 300) => {
  const startTop = target.scrollTop;
  const startTime = Date.now();
  const scrollDistance = scrollTop - startTop;
  const setScrollTop = () => {
    isScrolling = true;
    const now = Date.now();
    if (now - startTime >= duration) {
      target.scrollTop = scrollTop;
      isScrolling = false;
      return;
    }
    target.scrollTop = startTop + ((now - startTime) / duration) * scrollDistance;
    requestAnimationFrame(setScrollTop);
  };
  setScrollTop();
};
const MARGIN_TOP = 30;

const StickyBar = (props: React.PropsWithChildren<StickyBarProps>) => {
  const { scrollContainer, CustomTabBar = TabBar, tabBarHeight = MARGIN_TOP } = props;
  const [indexes, setIndexes] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(indexes[0]);

  function scrollTo(index: string) {
    if (!scrollContainer.current) return;

    const children = scrollContainer.current.getElementsByClassName('sticky-bar_panel');
    for (let i = 0; i < children.length; i++) {
      const panel = children.item(i) as HTMLElement;
      const panelIndex = panel.dataset['index'];
      if (panelIndex === index) {
        smoothScroll(scrollContainer.current, panel.offsetTop - tabBarHeight);
        setActiveIndex(index);
        return;
      }
    }
  }

  const { run: checkActiveIndex } = useThrottleFn(
    () => {
      if (!scrollContainer.current || isScrolling) return;
      const scrollTop = scrollContainer.current.scrollTop;

      const children = scrollContainer.current.getElementsByClassName('sticky-bar_panel');
      for (let i = 0; i < children.length; i++) {
        const panel = children.item(i) as HTMLElement;
        const panelIndex = panel.dataset['index'];
        if (!panelIndex) continue;
        if (panel.offsetTop + panel.clientHeight - tabBarHeight > scrollTop) {
          setActiveIndex(panelIndex);
          return;
        }
      }
    },
    { wait: 50, trailing: true, leading: true },
  );
  useEffect(() => {
    if (!indexes.length) return;
    checkActiveIndex();
  }, [indexes]);
  useEffect(() => {
    const scrollContainerEle = scrollContainer.current;
    if (!scrollContainerEle) return;
    scrollContainerEle.addEventListener('scroll', checkActiveIndex);

    return () => {
      scrollContainerEle.removeEventListener('scroll', checkActiveIndex);
    };
  }, [scrollContainer]);

  const handleActive = (index: string) => {
    scrollTo(index);
  };
  return (
    <StickyBarContext.Provider value={{ indexes, setIndexes }}>
      <div className="sticky-bar">
        <CustomTabBar items={indexes} activeItem={activeIndex} onActive={handleActive} />
        {props.children}
      </div>
    </StickyBarContext.Provider>
  );
};
export default StickyBar;
