import InternalStickyBar from './stick-bar';
import Panel from './panel';
import './index.less';

type StickyBarType = typeof InternalStickyBar & { Panel: typeof Panel };
const StickyBar = InternalStickyBar as StickyBarType;

StickyBar.Panel = Panel;

export default StickyBar;
