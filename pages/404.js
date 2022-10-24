import { Button, Result } from "antd";
import { useRouter } from "next/router";

const Index = () => {
  const route = useRouter();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Извините, страница, которую вы посетили, не существует."
      extra={
        <Button
          type="primary"
          onClick={() => {
            route.push("/");
          }}
        >
          Домой
        </Button>
      }
    />
  );
};
export default Index;
