import styles from './index.module.less';

declare global {
  const env: {
    version: string;
    isDev: boolean;
  };
}
function Table() {
  const [a] = useState(1);
  console.log(process.env.version, process.env.isDev);
  return (
    <div className={styles.test}>
      123:{a}
      <Spin />
      <h2 className={styles.test2}>子节点, 测试unocss打包</h2>
      <FastBackwardOutlined />
      <h2 className="h-full text-center select-none all:transition-400 text-cyan-10">
        子节点1
      </h2>
      <h2 className="bg-colorPrimary text-color-text-quaternary h-full text-center select-none all:transition-400">
        子节点, 使用unocss 预定义的css变量
      </h2>
      <div
        className="w-25px hover:bg-rose"
        style={{ background: `var(--colorPrimary)` }}
      >
        test
      </div>
    </div>
  );
}

export default Table;
