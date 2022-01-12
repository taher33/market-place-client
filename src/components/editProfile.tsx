import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import styles from "../styles/editProfile.module.scss";
import { useAppContext } from "../utils/context";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Form {
  description: string;
  name: string;
  email: string;
  profileImg: any;
}

function EditProfile(props: Props): JSX.Element {
  const { user } = useAppContext();
  const { handleSubmit, register, watch } = useForm<Form>();
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <button onClick={() => props.setShow(false)}>close</button>
        <h2>user</h2>
      </div>
      <div className={styles.lineBreak}></div>
      <div className={styles.form}>
        <div className={styles.imageWrapper}>
          <label htmlFor="profileImg">
            <img src={user.profileImg} alt="user" />
          </label>
        </div>

        <form>
          <label htmlFor="name">name</label>
          <input type="text" {...register("name")} />
          <label htmlFor="email">email</label>
          <input type="email" {...register("email")} />
          <label htmlFor="description">description</label>
          <textarea cols={30} rows={10} {...register("description")}></textarea>
          <input
            type="file"
            id="profileImg"
            hidden
            {...register("profileImg")}
          />
        </form>
      </div>
      <div className={styles.lineBreak}></div>
      <div className={styles.actionsWrapper}>
        <div className={styles.action} onClick={() => props.setShow(false)}>
          cancel
        </div>
        <div onClick={() => props.setShow(false)} className={styles.action}>
          save changes
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
