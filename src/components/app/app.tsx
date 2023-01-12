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
import { OrderHistoryDetailsPage } from "../../pages/order-history/order-history-details";
import { OrdersPage } from "../../pages/orders-feed/orders-feed";
import { OrderDetailsPage } from "../../pages/orders-feed/order-details";
// import { ProtectedRoute } from './components/protected-route';
// import { ProvideAuth } from './services/auth';

export default function App() {
  const location = useLocation<{ background: any }>();
  const history = useHistory();
  const background = location.state && location.state.background;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const closeModal = () => {
    history.push("/");
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
        <ProtectedRoute fromUnauthorized={false} path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute fromUnauthorized={false} path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute fromUnauthorized path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute fromUnauthorized path="/profile/orders" exact={true}>
          <OrderHistoryPage />
        </ProtectedRoute>
        <ProtectedRoute fromUnauthorized path="/profile/orders/:id" exact={true}>
          <OrderHistoryDetailsPage />
        </ProtectedRoute>
        <ProtectedRoute fromUnauthorized={false} path="/feed" exact={true}>
          <OrdersPage />
        </ProtectedRoute>
        <ProtectedRoute fromUnauthorized={false} path="/feed" exact={true}>
          <OrderDetailsPage />
        </ProtectedRoute>
        <ProtectedRoute fromUnauthorized={false} path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </ProtectedRoute>
        <Route path="/ingredient/:id" exact={true}>
          <IngredientPage>
            <IngredientDetails />
          </IngredientPage>
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
      {(background || (window.performance.getEntries()[0] as PerformanceNavigationTiming).type  === 'reload') && (
          <Route path="/ingredient/:id" exact={true}>
            <HomePage />
            <Modal close={closeModal} title={"Детали ингредиента"}>
              <IngredientDetails />
            </Modal>
          </Route>
      )}
        </Switch>
    </>
  );
}
