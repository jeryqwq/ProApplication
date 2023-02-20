import { useDebounceFn } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import styles from './index.module.less';
import {
  HitType,
  renderSearchKeywordNode,
  RoutersType,
  searchRouterInfo,
} from './layoutHelper';
export default () => {
  const [isSearch, setIsearch] = useState<boolean>(false);
  const selectRef = useRef<{ focus?: () => void; blur?: () => void }>({});
  const [searchList, setSearchList] = useState<RoutersType[]>([]);
  const [searchKeyWord, setSearchKeyword] = useState('');
  const { run: debounceSearch } = useDebounceFn(async (val) => {
    console.time('search');
    const hitList = searchRouterInfo(val);
    console.timeEnd('search');
    setSearchKeyword(val);
    hitList && setSearchList([...hitList]);
  }, 300);
  return (
    <div
      className={`hover:bg-colorBgTextHover overflow-hidden items-center flex h-32px  p-4px border-rd-5px transition-all-500
        ${isSearch ? 'bg-colorBgTextHover' : ''}
      `}
      style={{ width: isSearch ? 250 : 30 }}
    >
      <SearchOutlined
        onClick={(e) => {
          e.preventDefault();
          setIsearch(!isSearch);
          startTransition(() => {
            selectRef.current.focus?.();
          });
        }}
        style={{ paddingRight: isSearch ? 0 : 20 }} // 防止在未开启搜索情况下误操作点击到搜索
        className="p-l-5px "
      />
      <Select
        showSearch
        labelInValue
        showArrow={false}
        filterOption={false}
        onSearch={debounceSearch}
        placeholder="站内搜索:支持中文|拼音|简写"
        bordered={false}
        ref={selectRef as any}
        onBlur={() => {
          setIsearch(false);
        }}
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
          flex: 1,
        }}
        dropdownMatchSelectWidth={false}
        dropdownStyle={{ width: 400 }}
        options={[]}
        dropdownRender={() => {
          return (
            <>
              {searchList.length ? (
                searchList.map((i) => (
                  <div
                    key={i.key}
                    className={styles['menu-item']}
                    onClick={() => {
                      if (!i.routes) {
                        i.path && history.push(i.path);
                      }
                      selectRef.current.blur?.();
                    }}
                  >
                    <div className="text-14px font-bold ">{i.name}</div>
                    <div className="text-12px ">
                      {i.hitType === HitType.Desc
                        ? renderSearchKeywordNode(searchKeyWord, i.meta?.desc)
                        : i.meta?.desc}
                    </div>
                  </div>
                ))
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </>
          );
        }}
      />
    </div>
  );
};
