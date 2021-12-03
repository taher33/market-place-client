import React, { ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SidebarFeed from "../components/SidebarFeed";
import { BiAddToQueue } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";

import styles from "../styles/upload.module.scss";

interface Props {}
interface Form {
  description: string;
  title: string;
  categorie: string;
  price: Number;
  stock: Number;
  picture: any;
  condition: string;
}

export default function Upload({}: Props): ReactElement {
  const { handleSubmit, register, watch } = useForm<Form>();

  const pictures = watch("picture", {});
  let files = Object.values(pictures) as any;

  const createProduct = (data: any) => {
    console.log(data);
  };
  const deletePic = (data: any) => {
    console.log(data);
  };
  return (
    <div className={styles.container}>
      <aside>
        <SidebarFeed />
      </aside>
      <div className={styles.formWrapper}>
        <h2>
          Create a new <br /> Listing
        </h2>
        <form onSubmit={handleSubmit(createProduct)}>
          <div className={styles.wrapper}>
            <label htmlFor="title">title</label>
            <input type="text" {...register("title")} />
            <label htmlFor="description">description</label>
            <input type="text" {...register("description")} />
            <label htmlFor="categorie">categorie</label>
            <select {...register("categorie")}>
              <option value="Chocolate">choco</option>
              <option value="Chocolate">choco</option>
              <option value="Chocolate">choco</option>
            </select>
            <label htmlFor="condition">condition</label>
            <select {...register("condition")}>
              <option value="Chocolate">choco</option>
              <option value="Chocolate">choco</option>
            </select>
            <label htmlFor="price">price</label>
            <input type="number" {...register("price")} />
            <label htmlFor="stock">stock</label>
            <input type="number" {...register("stock")} />
          </div>
          <div className={styles.imageWrapper}>
            <div className={styles.imgPrv}>
              {!!files &&
                files.map((el: any) => (
                  <div className={styles.container}>
                    <div className={styles.overlay}></div>
                    <TiDeleteOutline onClick={() => deletePic(el)} />
                    <img src={URL.createObjectURL(el)} alt={el.name} />
                  </div>
                ))}
            </div>
            <label htmlFor="picture">
              upload a picture <BiAddToQueue />
            </label>
            <input
              multiple
              type="file"
              id="picture"
              hidden
              {...register("picture")}
            />
          </div>
          <button type="submit">create product</button>
        </form>
      </div>
    </div>
  );
}
