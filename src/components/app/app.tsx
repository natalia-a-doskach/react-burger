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
} from "../../pages";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { CHANGE_CURRENT_INGREDIENT } from "../../services/actions/ingredients";
import AppHeader from "../app-header/AppHeader";
import { ProtectedRoute } from "../../utils/ProtectedRoute";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import OrderDetails from "../order-details/OrderDetails";
import { getIngredients } from "../../services/actions/ingredientsAPI";
import Modal from "../modal/Modal";
import { useAppDispatch } from "../../utils/hooks";
import { OrderHistoryPage } from "../../pages/order-history/order-history";
import { OrdersPage } from "../../pages/orders-feed/orders-feed";
import { OrderDetailsPage } from "../../pages/order-details/order-details-page";
// import { ProtectedRoute } from './components/protected-route';
// import { ProvideAuth } from './services/auth';

export default function App() {
  const location = useLocation<{ background: any, modal: any }>();
  const history = useHistory();
  const background = location.state && location.state.background;
  const modal = location.state && location.state.modal;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  // useEffect(() => {
  //   console.log(location);
  // }, [modal]);

  const closeModal = () => {
    history.go(-1);
  };

  const closeIngredientModal = () => {
    dispatch({ type: CHANGE_CURRENT_INGREDIENT, ingredientData: null });
    history.push("/");
  };

  return (
    <>
      <AppHeader />
      <Switch>
        <ProtectedRoute fromUnauthorized={false} path="/login" exact={true}>
          <LoginPage />
        </ProtectedRoute>
        <ProtectedRoute fromUnauthorized={false} path="/register" exact={true}>
          <RegisterPage />
        </ProtectedRoute>
        <ProtectedRoute
          fromUnauthorized={false}
          path="/forgot-password"
          exact={true}
        >
          <ForgotPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute
          fromUnauthorized={false}
          path="/reset-password"
          exact={true}
        >
          <ResetPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute fromUnauthorized path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute fromUnauthorized path="/profile/orders" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute
          fromUnauthorized
          path="/profile/orders/:id"
          exact={true}
        >
          {modal ? (
            <>
              <OrderDetailsPage />
              <Modal close={closeModal} title={"Детали заказа"}>
                <OrderDetailsPage />
              </Modal>
            </>
          ) : (
            <OrderDetailsPage />
          )}
        </ProtectedRoute>
        <ProtectedRoute fromUnauthorized path="/feed" exact={true}>
          <OrdersPage />
        </ProtectedRoute>
        <ProtectedRoute fromUnauthorized path="/feed/:id" exact={true}>
        {modal ? (
            <>
              <OrdersPage />
              <Modal close={closeModal} title={"Детали заказа"}>
                <OrderDetailsPage />
              </Modal>
            </>
          ) : (
            <OrderDetailsPage />
          )}
        </ProtectedRoute>
        <ProtectedRoute
          fromUnauthorized={false}
          path="/reset-password"
          exact={true}
        >
          <ResetPasswordPage />
        </ProtectedRoute>
        <Route path="/ingredient/:id" exact={true}>
        {modal ? (
            <>
            <HomePage />
            <Modal close={closeModal} title={"Детали ингредиента"}>
              <IngredientDetails />
            </Modal>
            </>
          ) : (
            <IngredientPage>
            <IngredientDetails />
          </IngredientPage>
          )}

        </Route>
        <ProtectedRoute fromUnauthorized path="/order" exact={true}>
          <HomePage />
          <Modal close={closeModal}>
            <OrderDetails />
          </Modal>
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route>
          <NotFound404Page />
        </Route>
      </Switch>
    </>
  );
}
