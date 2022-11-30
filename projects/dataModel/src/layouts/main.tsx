import { useModel, useOutlet } from '@umijs/max';
export default () => {
  const outlet = useOutlet()
  const masterProps = useModel('@@qiankunStateFromMaster');
  return <div style={{height: masterProps ? 'calc( 100vh - 92px )' : '100vh'}}>
    { outlet }
  </div>
}
