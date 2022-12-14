import React, { useState, useEffect, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./styles.module.css";
import {
  Input,
  ShowIcon,
  HideIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { changePassword } from "../../services/actions/auth/resetPassword";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector, useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

export const ResetPasswordPage = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [password, setPassword] = React.useState<string>("");
  const [code, setCode] = React.useState<string>("");
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const loading = useAppSelector(
    (store) => store.resetPassword.change_password_loading
  );
  const error = useAppSelector(
    (store) => store.resetPassword.change_password_error
  );
  const success = useAppSelector(
    (store) => store.resetPassword.change_password_success
  );
  const reset = (e : FormEvent) => {
    e.preventDefault();
    dispatch(changePassword(code, password));
  };

  useEffect(() => {
    if (!success) return;
    console.log("reseting was successful");
    //go to changing password page
    history.push("/login");
  }, [success]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className={styles.centered}>
      <h1 className={`text text_type_main-medium ${styles.centeredText}`}>
        Восстановление пароля
      </h1>
      <form onSubmit={reset}>
      <Input
        type={passwordVisible ? "text" : "password"}
        placeholder={"Введите новый пароль"}
        onChange={(e) => setPassword(e.target.value)}
        icon={passwordVisible ? "ShowIcon" : "HideIcon"}
        value={password}
        name={"password"}
        error={false}
        onIconClick={togglePasswordVisibility}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="m-6"
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={(e) => setCode(e.target.value)}
        value={code}
        name={"code"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="m-6"
      />
      {error && (
        <p className={`text text_type_main-default ${styles.centeredText} m-4`}>
          Ошибка
        </p>
      )}
      <div className={`${styles.centeredElement} mb-20`}>
        <Button type="primary" size="medium" htmlType="submit" value="Submit">
          Сохранить
          <ClipLoader
            loading={loading}
            size={"1.5em"}
            color={"white"}
            aria-label="Loading Spinner"
          />
        </Button>
      </div>
      </form>
      <p className={`text text_type_main-default ${styles.centeredText}`}>
        Вспомнили пароль? <Link to="/login">Войти</Link>
      </p>
    </div>
  );
};
