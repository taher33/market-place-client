import React, { ReactElement, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import SidebarFeed from "../components/SidebarFeed";
import { BiAddToQueue } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";

import styles from "../styles/upload.module.scss";
import "react-toastify/dist/ReactToastify.css";

import { useMutation } from "react-query";
import { axios_instance } from "../utils/axios";

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
  const { handleSubmit, register, control, reset } = useForm<Form>();
  const pics = useWatch({
    name: "picture",
    control,
    defaultValue: {},
  });

  const { mutate } = useMutation(
    (data: any) => {
      const fd = new FormData();

      for (let key in data) {
        if (key === "picture") {
          for (let file of data[key]) {
            fd.append(key, file);
          }
        } else {
          fd.append(key, data[key]);
        }
      }
      return axios_instance(true)({
        url: "/products",
        method: "post",
        data: fd,
      });
    },
    {
      onSuccess: () => {
        toast("🦄 created new product!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        reset();
      },
    }
  );
  const createProduct = (data: any) => {
    mutate(data);
  };

  return (
    <>
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
                <option value="electronics">electronics</option>
                <option value="beauty">beauty</option>
                <option value="cloths">cloths</option>
                <option value="books">books</option>
                <option value="sports">sports</option>
              </select>
              <label htmlFor="condition">condition</label>
              <select {...register("condition")}>
                <option value="new">new</option>
                <option value="good as new">good as new</option>
                <option value="used">used</option>
                <option value="bad">bad</option>
              </select>
              <label htmlFor="price">price</label>
              <input type="number" {...register("price")} />
              <label htmlFor="stock">stock</label>
              <input type="number" {...register("stock")} />
            </div>
            <div className={styles.imageWrapper}>
              <div className={styles.imgPrv}>
                {pics &&
                  !!pics[0] &&
                  Object.values(pics).map((el: any, id: any) => (
                    <div key={id} className={styles.container}>
                      {/* <TiDeleteOutline onClick={() => deletePic(id)} /> */}
                      <img src={URL.createObjectURL(el)} alt={el.name} />
                    </div>
                  ))}
              </div>
              <input
                multiple
                type="file"
                id="picture"
                hidden
                {...register("picture")}
              />
            </div>
            <div className={styles.cta}>

            <label className={styles.uplaodBtn} htmlFor="picture">
              upload a picture <BiAddToQueue />
            </label>
            <button type="submit">create product</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
