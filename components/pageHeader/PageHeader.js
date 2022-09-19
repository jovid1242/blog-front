import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

const PageHeader = () => {
  const router = useRouter();
  const { category } = useSelector((state) => state.category);

  const filterCategory = category?.items.filter(
    (elm) => elm.id == router.query.id
  );
  return (
    <section className="page-header">
      <div className="container-xl">
        <div className="text-center">
          <h1 className="mt-0 mb-2">{filterCategory[0]?.title}</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link href="/">
                  <a>Главная</a>
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {filterCategory[0]?.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
