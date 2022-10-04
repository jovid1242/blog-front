import Image from "next/image";
import Link from "next/link";

const AdsBanner = () => {
  return (
    <div className="ads-horizontal text-md-center">
      <span className="ads-title">- Sponsored Ad -</span>
      <Link href="/">
        <a>
          {/* <Image
            src="http://backend.1026361-ca72388.tmweb.ru/api/image/1.jpg"
            width={100}
            height={100}
            layout="fill"
            alt="Advertisement"
          /> */}
        </a>
      </Link>
    </div>
  );
};

export default AdsBanner;
