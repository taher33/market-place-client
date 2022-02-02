import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import { useSpring, animated } from "react-spring";
import { useMutation, useQueryClient } from "react-query";

import styles from "../styles/editProfile.module.scss";
import { axios_instance } from "../utils/axios";
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
  const { handleSubmit, register, control } = useForm<Form>();
  const queryClient = useQueryClient();

  const profilePic = useWatch({
    name: "profileImg",
    control,
    defaultValue: null,
  });

  const editInfo = useMutation(
    (data: any) => {
      const fd = new FormData();

      for (let key in data) {
        if (key === "profileImg") {
          for (let file of data[key]) {
            fd.append(key, file);
          }
        } else {
          fd.append(key, data[key]);
        }
      }
      return axios_instance(true)({
        url: "/users/updateMe",
        method: "PATCH",
        data: fd,
      });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("profile");
      },
    }
  );

  const submitChanges = (data: Form) => {
    editInfo.mutate(data);
    console.log("form submitted");
  };

  //animations
  const springAnmimations = useSpring({
    from: { opacity: 0, xyz: [0, 200, 0] },
    to: { opacity: 1, xyz: [0, 0, 0] },
  });

  return (
    <animated.div style={springAnmimations} className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <div className={styles.imageWrapper}>
          {profilePic ? (
            <img src={URL.createObjectURL(profilePic["0"])} alt="user" />
          ) : (
            <img src={user?.profileImg} alt="user" />
          )}
          <label htmlFor="profileImg">change picture</label>
        </div>

        <form id="myForm" onSubmit={handleSubmit(submitChanges)}>
          <div>
            <label htmlFor="name">name</label>
            <input
              defaultValue={user?.name}
              type="text"
              {...register("name")}
            />
          </div>
          <div>
            <label htmlFor="email">email</label>
            <input
              defaultValue={user?.email}
              type="email"
              {...register("email")}
            />
          </div>
          <div>
            <label htmlFor="description">description</label>
            <textarea
              cols={30}
              rows={3}
              {...register("description")}
            ></textarea>
          </div>
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
        <button className={styles.action} onClick={() => props.setShow(false)}>
          cancel
        </button>
        <button
          type="submit"
          form="myForm"
          className={styles.action + " " + styles.primary}
        >
          save changes
        </button>
      </div>
    </animated.div>
  );
}

export default EditProfile;
