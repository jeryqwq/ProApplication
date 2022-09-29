import { ProForm, ProFormColorPicker, ProFormDigit, ProFormSelect } from '@ant-design/pro-components';

interface MyStyle {
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  fontWeight?: string;
  marginLeft?: number;
  marginRight?: number;
  [other: string]: any;
}
export const FontFamilyList = [
  { label: '微软雅黑UI', value: 'Microsoft YaHei UI' },
  { label: '微软雅黑', value: 'Microsoft YaHei' },
  { label: '黑体', value: 'SimHei' },
  { label: '宋体', value: 'SimSun' },
  { label: '新宋体', value: 'NSimSun' },
  { label: '仿宋', value: 'FangSong' },
  { label: '楷体', value: 'KaiTi' },
  { label: 'Arial', value: 'Arial' },
  { label: 'Oswald-Regular', value: 'Oswald-Regular' },
  { label: 'Oswald', value: 'Oswald' },
  { label: 'BigNoodleTitling', value: 'BigNoodleTitling' },
  { label: 'DINCond-Black', value: 'DINCond-Black' },
];

function FontSetting({ style, onChange, ...others }: { style: MyStyle; onChange: (_: MyStyle) => void }) {
  return (
    <ProForm
      initialValues={style}
      onValuesChange={onChange}
      grid
      autoFocusFirstInput={false}
      omitNil={false}
      submitter={false}
      size="small"
    >
      <ProFormDigit
        label="左边距"
        name={'marginLeft'}
        colProps={{ span: 12 }}
      />
      <ProFormDigit
        label="右边距"
        name={'marginRight'}
        colProps={{ span: 12 }}
      />
      <ProFormSelect
        label="文字字体"
        colProps={{ span: 12 }}
        name="fontFamily"
        options={FontFamilyList}
      />
      <ProFormSelect
        colProps={{ span: 12 }}
        label="文字粗细"
        name="fontWeight"
        options={[{
          label: '正常',
          value: 'normal',
        }, {
          label: '加粗',
          value: 'bold',
        }]}
      />
      <ProFormDigit label="文字字号" name="fontSize" colProps={{ span: 12 }} />
      <ProFormColorPicker
        label="文字颜色"
        name="color"
        colProps={{ span: 12 }}
      />
    </ProForm>
  );
}

export default FontSetting;
export type { MyStyle };
