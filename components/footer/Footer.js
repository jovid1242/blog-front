import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container-xl">
        <div className="footer-inner">
          <div className="row d-flex align-items-center gy-4">
            <div className="col-md-4">
              <span className="copyright">
                © {new Date().getFullYear()} Repost
              </span>
            </div>

            <div className="col-md-4 text-center">
              <ul className="social-icons list-unstyled list-inline mb-0">
                {/* <li className="list-inline-item">
                  <a href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li> */}
                {/* <li className="list-inline-item">
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li> */}
                <li className="list-inline-item">
                  <a href="https://instagram.com/jovid92002" target="_blanck">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                {/* <li className="list-inline-item">
                  <a href="#">
                    <i className="fab fa-pinterest"></i>
                  </a>
                </li> */}
                {/* <li className="list-inline-item">
                  <a href="#">
                    <i className="fab fa-medium"></i>
                  </a>
                </li> */}
                <li className="list-inline-item">
                  <a
                    href="https://www.youtube.com/channel/UCic_oyZ_5DvUjw0C1it7znQ"
                    target="_blanck"
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <a href="#" id="return-to-top" className="float-md-end">
                <i className="icon-arrow-up"></i>Наверх
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
