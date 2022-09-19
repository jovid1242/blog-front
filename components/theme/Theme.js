import Image from "next/image";
import Link from "next/link";

const Theme = ({ category }) => {
  return (
    <div className="widget rounded">
      <div className="widget-header text-center">
        <h3 className="widget-title">Исследуйте темы</h3>
        <div className="w-auto-40">
          <Image
            src="http://backend.1026361-ca72388.tmweb.ru/api/image/wave.svg"
            width={"100%"}
            height={"100%"}
            layout="fill"
            className="wave"
            alt="wave"
          />
        </div>
      </div>
      <div className="widget-content">
        <ul className="list">
          {category.items?.map((item) => {
            return (
              <li key={item.id}>
                <Link href={`/category/${item.id}`}>
                  <a>{item.title}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Theme;
