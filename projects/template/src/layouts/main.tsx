import { useOutlet } from '@umijs/max';
export default () => {
  const outlet = useOutlet();
  console.log(outlet);
  return <div>{outlet}</div>;
};
