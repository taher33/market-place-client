import React, { ReactElement } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

import styles from "../styles/signup.module.scss";
import { axios_instance } from "../utils/axios";
import { useAppContext } from "../utils/context";
import { Response } from "../utils/types";

interface Props {}
interface Form {
  email: string;
  password: string;
}

function Signup({}: Props): ReactElement {
  const { setUser, socket } = useAppContext();
  const { handleSubmit, register, formState } = useForm<Form>();
  const router = useHistory();
  const { mutate, isLoading, error, isError } = useMutation(
    (User: Form) => {
      return axios_instance(true)({
        method: "POST",
        data: User,
        url: "users/login",
      });
    },
    {
      onError: (err: any) => {
        return err.response.data;
      },
      onSuccess: (data) => {
        setUser(data.data.user);
        let payload = {
          user: data.data.user,
        };
        socket.emit(
          "connect to server",
          payload,
          (res: { status: string; error: any }) => {
            if (res.status === "error") return console.log(res.error);
            router.push("/");
          }
        );
      },
    }
  );

  function submitForm(data: Form) {
    mutate(data);
  }

  return (
    <div className={styles.container}>
      <div>
        <h2>Get </h2>
        <p>
          and get access to millions of clients -or-{"   "}
          <Link to="/signup">Sign up</Link>
        </p>
        <span>{isError && error.response.data.message}</span>
        <form onSubmit={handleSubmit(submitForm)}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            {...register("email", {
              required: "please specify the name field",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "please put a valid email",
              },
            })}
          />
          <p>{formState.errors.email && formState.errors.email.message}</p>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "please specify the name field",
              minLength: {
                value: 8,
                message: "must be longer then 8 charachters",
              },
            })}
          />
          <p>
            {formState.errors.password && formState.errors.password.message}
          </p>
          <button type="submit">{isLoading ? "submiting" : "login"}</button>
        </form>
      </div>
      <img src="Delivery.png" alt="delivery" />
    </div>
  );
}

export default Signup;
