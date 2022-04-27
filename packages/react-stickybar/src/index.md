---
toc: content
nav:
  path: /react-stickybar
  title: react-stickybar
group:
  title: 介绍
  order: 1
---

## StickBar

垂直方向滚动切换 tab,tabbar 吸顶

```tsx
import React, { useRef } from 'react';
import StickyBar from '@viewer/react-stickybar';

export default () => {
  const containerRef = useRef(null);
  const items = ['test1', 'test2', 'testsssss3', 'tssssest4', 'tesssssst5', 'tessssst6', 'test7'];

  return (
    <div
      style={{
        height: '667px',
        width: '100%',
        overflow: 'scroll',
        position: 'relative',
        border: '1px solid #ddd',
      }}
      ref={containerRef}
    >
      <div style={{ height: '200px', border: '1px solid #333' }}>top area</div>
      <StickyBar scrollContainer={containerRef}>
        {items.map((i) => (
          <StickyBar.Panel key={i} index={i}>
            <div
              style={{
                height: '500px',
                border: '1px solid red',
              }}
            >
              {i}
            </div>
          </StickyBar.Panel>
        ))}
      </StickyBar>
      <div style={{ height: '500px' }}></div>
    </div>
  );
};
```

## StickyBar

<API src="./stick-bar.tsx">

## StickyBar.Panel

<API src="./panel.tsx">

## tab-bar

<API src="./tab-bar.tsx">
