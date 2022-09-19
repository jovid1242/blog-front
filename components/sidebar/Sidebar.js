import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../redux/slices/category";
import AdsBannerSidebar from "../adsBanner/AdsBannerSidebar";
import Theme from "../theme/Theme";

const Sidebar = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  return (
    <div className="col-lg-4">
      <div className="sidebar">
        <Theme category={category.category} />
        <AdsBannerSidebar />
        {/* <div className="widget rounded">
          <div className="widget-header text-center">
            <h3 className="widget-title">Tag Clouds</h3>
            <img src="images/wave.svg" clasName="wave" alt="wave" />
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
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
