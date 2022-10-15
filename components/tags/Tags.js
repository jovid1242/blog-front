import Image from "next/image";

const Tags = () => {
  return (
    <>
      <div className="widget rounded">
        <div className="widget-header text-center">
          <h3 className="widget-title">Теги</h3>
          <Image
            src="/static/wave.svg"
            className="wave"
            alt="wave"
            width={60}
            height={20}
            priority
          />
        </div>
        <div className="widget-content">
          <a href="#" className="tag">
            #Trending
          </a>
          <a href="#" className="tag">
            #Video
          </a>
          <a href="#" className="tag">
            #Featured
          </a>
          <a href="#" className="tag">
            #Gallery
          </a>
          <a href="#" className="tag">
            #Celebrities
          </a>
        </div>
      </div>
    </>
  );
};

export default Tags;
