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
  name: string;
  email: string;
  password: string;
}

function Signup({}: Props): ReactElement {
  const { setUser, socket } = useAppContext();

  const { handleSubmit, register, formState } = useForm<Form>();
  const router = useHistory();
  const { mutate, isLoading, error, isError } = useMutation(
    (newUser: Form) => {
      return axios_instance(true)({
        method: "POST",
        data: newUser,
        url: "users",
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
        socket?.emit("connect to server", payload, (res: Response) => {
          if (res.status === "error") return console.log(res.data);
          router.push("/");
        });
        router.push("/");
      },
    }
  );

  function submitForm(data: Form) {
    mutate(data);
  }

  return (
    <div className={styles.container}>
      <div>
        <h2>Get Started</h2>
        <p>
          and get access to millions of clients -or-{"   "}
          <Link to="/login">Login</Link>
        </p>
        <form onSubmit={handleSubmit(submitForm)}>
          <label htmlFor="name">
            Name
            <input
              type="text"
              {...register("name", {
                required: "please specify the name field",
                minLength: {
                  value: 3,
                  message: "must be longer then 3 charachters",
                },
              })}
            />
          </label>
          {formState.errors.name && (
            <span className={styles.formError}>
              {formState.errors.name.message}
            </span>
          )}
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
          <p>
            {formState.errors.email && (
              <span className={styles.formError}>
                {formState.errors.email.message}
              </span>
            )}
          </p>
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

          {formState.errors.password && (
            <span className={styles.formError}>
              {formState.errors.password.message}
            </span>
          )}

          <button type="submit">{isLoading ? "loading" : "sign up"}</button>
        </form>
        <span>{isError && error.response.data.message}</span>
      </div>
      <img src="Delivery.png" alt="delivery" />
    </div>
  );
}

export default Signup;
