import React, { FC } from "react";

import styles from "./Form.module.scss";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

type FormProps = {
  title: string;
  getDataForm: (email: string, password: string) => void;
  firebaseError: string;
};

const Form: FC<FormProps> = ({ title, getDataForm, firebaseError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const userEmail = {
    required: "필수 입력사항입니다.",
  };

  const userPassword = {
    required: "필수 입력사항입니다.",
    minLength: {
      value: 6,
      message: "최소 4글자 이상 입력해주세요.",
    },
  };

  const onSubmit: SubmitHandler<FieldValues> = ({ email, password }) => {
    getDataForm(email, password);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div>
        <input
          type='email'
          placeholder='email'
          {...register("email", userEmail)}
        />
        {errors?.email && (
          <div>
            <span className={styles.form_error}>{errors.email.message}</span>
          </div>
        )}
      </div>
      <div>
        <input
          type='password'
          placeholder='password'
          {...register("password", userPassword)}
        />
        {errors?.password && (
          <div>
            <span className={styles.form_error}>{errors.password.message}</span>
          </div>
        )}
      </div>
      <button type='submit'>{title}</button>
      {firebaseError && (
        <span className={styles.form_error}>{firebaseError}</span>
      )}
    </form>
  );
};

export default Form;
