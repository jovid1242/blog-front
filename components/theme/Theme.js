import Image from "next/image";
import Link from "next/link";

// api
import { API_URL } from "../api";

const Theme = ({ category }) => {
  return (
    <div className="widget rounded">
      <div className="widget-header text-center">
        <h3 className="widget-title">Исследуйте темы</h3> 
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
