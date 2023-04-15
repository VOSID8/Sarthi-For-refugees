import donation1 from "./Images/donation1.png";
import donationGIF from "./Images/donationGIF.gif";

import styles from "./Styles/donation.module.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import wave from "./Images/wave.png";
function Donation() {
  return (
    <>
      {" "}
      <div>
        <img className={styles.bgimg} src={wave} alt="wave png image"></img>
      </div>
      <div className={styles.container}>
        <div className="spacer"></div>
        <img
          src={donation1}
          alt=""
          style={{ width: "80%", display: "block", margin: "0 auto" }}
        />

        <div className={styles.columns}>
          <div className={styles.column1}>
            <div className={styles.donationContent}>
              EVERY LITTLE COUNTS, SO LETS WORK TOGETHER AND HELP THE REFUGEES{" "}
            </div>
            <div>
              <img src={donationGIF} alt="" />
            </div>
          </div>

          <div className={styles.column2}>
            <div className={styles.priceGrid}>
              <div>₹500</div>
              <div>₹1000</div>
              <div>₹2000</div>
              <div>₹5000</div>
            </div>

            <TextField
              label="Enter Amount"
              variant="standard"
              style={{ width: "100%", marginBottom: "70px" }}
            />

            <Button variant="contained" className={styles.submitButton}>
              <div>Continue</div>
              <TrendingFlatIcon />
            </Button>
          </div>
        </div>
        <div className="spacer"></div>
      </div>
    </>
  );
}

export default Donation;
