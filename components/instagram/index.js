import Image from "next/image";

const Insta = () => {
  return (
    <>
      <div className="instagram">
        <div className="container-xl">
          <a
            href="https://instagram.com/jovid92002"
            className="btn btn-default btn-instagram"
          >
            @ofolio on Instagram
          </a>
          <div className="instagram-feed d-flex flex-wrap">
            <div className="insta-item col-sm-2 col-6 col-md-2">
              <a href="https://instagram.com/jovid92002">
                <Image
                  src="/static/insta-1.jpg"
                  alt="insta-title"
                  width={1000}
                  height={1000}
                  priority
                />
              </a>
            </div>
            <div className="insta-item col-sm-2 col-6 col-md-2">
              <a href="https://instagram.com/jovid92002">
                <Image
                  src="/static/insta-2.jpg"
                  alt="insta-title"
                  width={1000}
                  height={1000}
                  priority
                />
              </a>
            </div>
            <div className="insta-item col-sm-2 col-6 col-md-2">
              <a href="https://instagram.com/jovid92002">
                <Image
                  src="/static/insta-3.jpg"
                  alt="insta-title"
                  width={1000}
                  height={1000}
                  priority
                />
              </a>
            </div>
            <div className="insta-item col-sm-2 col-6 col-md-2">
              <a href="https://instagram.com/jovid92002">
                <Image
                  src="/static/insta-4.jpg"
                  alt="insta-title"
                  width={1000}
                  height={1000}
                  priority
                />
              </a>
            </div>
            <div className="insta-item col-sm-2 col-6 col-md-2">
              <a href="https://instagram.com/jovid92002">
                <Image
                  src="/static/insta-5.jpg"
                  alt="insta-title"
                  width={1000}
                  height={1000}
                  priority
                />
              </a>
            </div>
            <div className="insta-item col-sm-2 col-6 col-md-2">
              <a href="https://instagram.com/jovid92002">
                <Image
                  src="/static/insta-6.jpg"
                  alt="insta-title"
                  width={1000}
                  height={1000}
                  priority
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Insta;
