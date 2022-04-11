import axios from "axios";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../styles/Add.module.css";

const cloudURL = "https://api.cloudinary.com/v1_1/maitrn/image/upload";

const Add = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);

  const router = useRouter();

  const changePrice = (value, sizeIndex) => {
    const newPrices = prices;
    newPrices[sizeIndex] = value;
    setPrices(newPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = () => {
    if (!extra || !extra.text || !extra.price) {
      console.log("empty option");
      return;
    }

    let extras = [...extraOptions, extra];
    extras = _.uniqWith(extras, _.isEqual);

    setExtraOptions([...extras]);
    setExtra(null);
  };

  const handleCreate = async () => {
    if (file === null) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      //upload image to cloudinary
      const uploadRes = await axios.post(cloudURL, data);

      await axios.post("http://localhost:3000/api/products", {
        title,
        desc,
        prices,
        extraOptions,
        img: uploadRes.data.url,
      });
      setClose(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h1>Add a new pizza</h1>
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Name</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Description</label>
          <textarea
            className={styles.textArea}
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e.target.value, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e.target.value, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e.target.value, 2)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extraContainer}>
            <input
              className={styles.input}
              placeholder="Item"
              name="text"
              type="text"
              value={extra?.text || ""}
              onChange={handleExtraInput}
            />
            <input
              className={styles.input}
              placeholder="Price"
              name="price"
              type="number"
              value={extra?.price || ""}
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((o, i) => (
              <span key={i} className={styles.extraItem}>
                {o.text}
              </span>
            ))}
          </div>
        </div>
        <button onClick={handleCreate} className={styles.addButton}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Add;
