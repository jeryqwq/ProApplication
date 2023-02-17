export default () => {
  const TabsContent = (
    <div>
      <Segmented
        options={[
          '提及@',
          {
            label: (
              <Badge count={5} size="small">
                通知
              </Badge>
            ),
            value: '通知',
          },
          '私信',
          '订单',
        ]}
      />
      <Empty
        className="m-t-50px"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="辛苦了，与你相关很干净"
      />
    </div>
  );
  return (
    <Tooltip
      placement="bottom"
      title={TabsContent}
      trigger="click"
      color={'white'}
    >
      <div className="cursor-pointer hover:bg-colorBgTextHover items-center justify-center text-center flex h-32px w-30px   border-rd-5px transition-all-500">
        <Badge count={5} size="small">
          <NotificationOutlined />
        </Badge>
      </div>
    </Tooltip>
  );
};
