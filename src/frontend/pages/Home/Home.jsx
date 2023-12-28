import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";

//internal imports
import "./Home.css";
import "../../components/Header/Header.css";
import { Footer } from "../../components/Footer/Footer";
import {
  // godregBrand,
  // hometownBrand,
  // nilKamal,
  // woodenStreetBrand,
  sliderImages,
} from "../../assets";
import { filterContext } from "../../hooks/context/filterContext";

export const Home = () => {
  const [_, setImageNum] = useState(1);
  const { categoriesData, setfilterDispatch } = useContext(filterContext);

  useEffect(() => {
    setfilterDispatch({ type: "RESET_ALL_FILTER" });
  }, [setfilterDispatch]);

  return (
    <>
      <div className="hero-img-case">
        <SimpleImageSlider
          width={"100%"}
          height={390}
          images={sliderImages}
          showBullets={true}
          showNavs={true}
          autoPlay={true}
          onStartSlide={(index, length) => {
            setImageNum(index);
          }}
          autoPlayDelay={2}
        />
      </div>
      <center>
        <Link to="/product-listing">
          <button className="button">
            <span>Shop Now!! </span>
          </button>
        </Link>
      </center>

      {/*  */}
      <h1 className="category-desc">Top Categories of the year</h1>
      <div className="home-categories">
        {categoriesData.map(({ categoryImage, categoryName }, index) => {
          return (
            <figure key={index}>
              <img
                className="uniq-img"
                src={categoryImage}
                alt={categoryName}
              />
              <h2>{categoryName}</h2>
            </figure>
          );
        })}
      </div>
      {/*  */}

      <h1 className="category-desc brand-desc">Top Brands</h1>
      <div className="brands-case">
        <img
          src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0004/8504/brand.gif?itok=j8YhOFgu"
          alt="brand image"
          className="unique-brands"
          />
        <img
          alt="brand image"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAePGP9j7PoYpxs1L37PgQiJaQBh-RdvXpGeOvKNk8laPxsTJ1SolvBulTBsBhc69RMOA&usqp=CAU"
          className="unique-brands"
          />
        <img
          src="https://c8.alamy.com/comp/2J696ED/waistcoat-icon-monochrome-simple-clothes-icon-for-templates-web-design-and-infographics-2J696ED.jpg"
          alt="brand image"
          className="unique-brands"
        />
        <img
          alt="brand image"
          src="https://i.pinimg.com/originals/e8/f8/e4/e8f8e409ac1230b063726b4d9abfb32e.jpg"
          className="unique-brands"
        />
      </div>
      <Footer />
    </>
  );
};

export { Home as default };
