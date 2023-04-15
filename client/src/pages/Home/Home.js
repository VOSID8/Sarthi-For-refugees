import { Link } from "react-router-dom";

import styles from "./Styles/home.module.css";

import img1 from "./Images/img1.png";
import ourMission from "./Images/ourMission.png";
import locations from "./Images/locations.png";
import ellipse from "./Images/ellipse.png";
import gif1 from "./Images/gif1.gif";
import gif2 from "./Images/gif2.gif";

import carousel1 from "./Images/carousel1.png";
import carousel2 from "./Images/carousel2.png";
import carousel3 from "./Images/carousel3.png";
import carousel4 from "./Images/carousel4.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

import LocationMap from "./components/map";
import globe from "./Images/globe.gif";

function Home() {
  return (
    <div className={styles.home}>
      <div className="spacer"></div>
      <div className={styles.hero}>
        <img src={img1} alt="" className={styles.heroImg} />
        <img src={gif1} alt="" className={styles.heroImg} />
      </div>

      <Swiper
        modules={[Pagination]}
        pagination
        spaceBetween={20}
        slidesPerView={2.5}
        className={styles.carousel}
      >
        <SwiperSlide>
          <div className={styles.tile}>
            <img src={carousel1} alt="" style={{ height: "70%" }} />
            <div>
              NEED MEDICAL ATTENTION?
              <br /> REGISTER HERE TO GET FREE CONSULTATION
            </div>
            <Link to="/refugee-signup" className={styles.button}>
              SEEK HELP
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.tile}>
            <img src={carousel2} alt="" style={{ height: "70%" }} />
            <div>
              1 FREE CONSULTATION A DAY CAN SAVE THE LIVES OF MILLIONS OF
              REFUGEES
            </div>
            <Link to="/doctor-signup" className={styles.button}>
              REGISTER AS A DOCTOR
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.tile}>
            <img src={carousel3} alt="" style={{ height: "70%" }} />
            <div>
              HERE'S YOUR CHANCE TO DO YOUR BIT, AND CONTRIBUTE TO A POSITIVE
              CAUSE
            </div>
            <Link to="/donate" className={styles.button}>
              DONATE NOW!
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.tile}>
            <img src={carousel4} alt="" style={{ height: "70%" }} />
            <div>
              DO YOU WANT TO WORK FOR THE PLIGHT OF REFUGEES, AND HELP THEM
              SUSTAIN THEIR LIVES?
            </div>
            <Link to="" className={styles.button}>
              VOLUNTEER TO HELP!
            </Link>
          </div>
        </SwiperSlide>
        ...
      </Swiper>

      <div>
        <img
          src={ourMission}
          alt=""
          className={styles.ourMissionHeading}
          id="aboutUs"
        />
        <div className={styles.ourMission}>
          <div className={styles.ourMissionContent}>
            CONNECTING REFUGEES AND DOCTORS <br /> TO PROVIDE FREE HEALTHCARE
            FOR REFUGEES
          </div>

          <div className={styles.columns}>
            <div className={`${styles.aboutUs} ${styles.column}`}>
              <div className={styles.aboutUsHeading}>ABOUT US</div>
              <div className={styles.aboutUsContent}>
                REHMAT: Refugee Health Management System is a non-profit
                organisation that aims to aid refugees, and provide them health
                consultation free of cost. <br />
                Refugees often don't get the best facilities, and have to suffer
                in queues to get treated. <br />
                Keeping in mind the SDGs we have established a network of
                doctors, specialised across various domains. <br />
                Our doctors and volunteers will provide online consultation free
                of cost. These doctors will serve as the first point of contact
                for refugees, and will treat mild cases directly, allowing the
                on field doctors to focus on more severe cases. <br /> <br />
                We aim to tie up with local governments, get donations from
                people, and also send volunteers and our team with resources to
                offline camps,
              </div>
            </div>

            <div className={styles.column}>
              <img
                src={gif2}
                alt=""
                style={{ display: "block", margin: "0 auto" }}
              />
            </div>

            <div className={styles.column}>
              <div className={styles.ourProgress}>
                <div className={styles.ourProgressHeading}>
                  {/* <img src={ellipse} alt=""/> */}
                  <span>OUR PROGRESS</span>
                  <TrendingFlatIcon />
                </div>
                <div>5000+ PATIENTS HEALED</div>
                <div>AIDED 500+ REFUGEE CAMPS</div>
                <div>1000+ DOCTORS</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={locations} alt="" style={{ display: "block" }} />
          <img className={styles.globe} src={globe} alt="rotating globe"></img>
        </div>

        <LocationMap />
      </div>
    </div>
  );
}

export default Home;
