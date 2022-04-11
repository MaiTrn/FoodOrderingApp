import React from "react";
import styles from "../styles/PizzaCard.module.css";
import Image from "next/image";
import Link from "next/link";

const PizzaCard = ({ pizza }) => {
  return (
    <Link href={`/products/${pizza._id}`} passHref>
      <div className={styles.container}>
        <Image src={pizza.img} height="500" width="500" alt="" />

        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${pizza.prices[0]}</span>
        <p className={styles.desc}>{pizza.desc}</p>
      </div>
    </Link>
  );
};

export default PizzaCard;
