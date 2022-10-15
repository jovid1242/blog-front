import { Table, Card } from "antd";
import { useState } from "react";

const TablePosts = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "Age",
      dataIndex: "age",
      width: 150,
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];
  const data = [];

  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }

  const [activeTabKey1, setActiveTabKey1] = useState("tab1");

  const tabList = [
    {
      key: "posts",
      tab: "Все публикации",
    },
    {
      key: "Comments",
      tab: "Комментарии",
    },
  ];
  const contentList = {
    posts: (
      <>
        <div>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              pageSize: 50,
            }}
            scroll={{
              y: 240,
            }}
          />
        </div>
      </>
    ),
    Comments: <p>В разработке</p>,
  };

  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };

  return (
    // <Card
    //   style={{
    //     width: "100%",
    //   }}
    //   title="Все публикации"
    //   tabList={tabList}
    //   activeTabKey={activeTabKey1}
    //   onTabChange={(key) => {
    //     onTab1Change(key);
    //   }}
    // >
    //   {contentList[activeTabKey1]}
    // </Card>
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 50,
        }}
        scroll={{
          y: 240,
        }}
      />
    </div>
  );
};

export default TablePosts;
