import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import {
  ForgotPasswordPage,
  HomePage,
  IngredientPage,
  LoginPage,
  NotFound404Page,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from "./pages";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";

import AppHeader from "./components/app-header/AppHeader";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import IngredientDetails from "./components/ingredient-details/IngredientDetails";
import { getIngredients } from "./services/actions/ingredientsAPI";
import Modal from "./components/modal/Modal";
// import { ProtectedRoute } from './components/protected-route';
// import { ProvideAuth } from './services/auth';

export default function App() {
  const location = useLocation();
  const history = useHistory();
  let background = location.state && location.state.background;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const closeModal = () => {
    history.push("/");
  };

  return (
    <>
      <AppHeader />
      <Switch>
        <ProtectedRoute fromAuthorized path="/login" exact={true}>
          <LoginPage />
        </ProtectedRoute>
        <ProtectedRoute fromAuthorized path="/register" exact={true}>
          <RegisterPage />
        </ProtectedRoute>
        <ProtectedRoute fromAuthorized path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute fromAuthorized path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute fromUnauthorized path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/ingredient/:id" exact={true}>
          <IngredientPage>
            <IngredientDetails />
          </IngredientPage>
        </Route>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route>
          <NotFound404Page />
        </Route>
      </Switch>
      {(background || PerformanceNavigationTiming.type === "reload") && (
        <Route path="/ingredient/:id" exact={true}>
          <Modal close={closeModal}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </>
  );
}
