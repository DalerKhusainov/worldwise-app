// Uses the same styles as Product
import styles from "./Pricing.module.css";
import Navbar from "../../components/navbar/Navbar";
import img2 from "../../assets/img-2.jpg";

export default function Pricing() {
  return (
    <main className={styles.pricing}>
      <Navbar />
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
            labore mollitia iusto. Recusandae quos provident, laboriosam fugit
            voluptatem iste.
          </p>
        </div>
        <img src={img2} alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
