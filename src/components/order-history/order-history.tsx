import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getIngredients } from "../../services/actions/ingredientsAPI";
import { WebsocketStatus } from "../../services/reducers/wsReducer";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { TIngredient, TOrder } from "../../utils/types";
import styles from "./order-history.module.css";
import {
  connect as connectOrder,
  disconnect as disconnectOrder,
} from "../../services/actions/wsActions";
import { stringify } from "querystring";

export const SERVER_URL = "wss://norma.nomoreparties.space/orders/all";

export const OrderHistory = () => {
  const dispatch = useAppDispatch();
  const { orders, status } = useAppSelector((state) => state.wsOrders);
  const isDisconnected = status === WebsocketStatus.OFFLINE;
  const connect = () => dispatch(connectOrder(SERVER_URL));
  const disconnect = () => dispatch(disconnectOrder());

  useEffect(() => {
    dispatch(getIngredients());
    console.log("connecting");
    if (isDisconnected) connect();
    return () => {
      disconnect();
    };
  }, []);

  const { id } = useParams<{ id?: string }>();
  const order = orders?.orders?.filter(
    (o: TOrder) => {
      console.log(o.number,id);
      return o.number.toString() === id
    
    }
  )[0];
  console.log(orders?.orders);
  let orderIngredients = order?.ingredients ? order.ingredients : [];
  const counts: Record<string, number> = {};
  orderIngredients.forEach((i) => {counts[i] = (counts[i] || 0) + 1;})
  let newOrderIngredients = [...new Set(orderIngredients)]
  const ingredientInfo: Array<TIngredient> = useAppSelector(
    (state) => state.ingredients.items
  );
  const myIngredientInfo: Array<TIngredient> = newOrderIngredients.map(
    (ingId: string) => ingredientInfo.filter((i) => i._id === ingId)[0]
  );
  const images = myIngredientInfo.map((i) => i.image);
  const cost = myIngredientInfo
    .map((i) => i.price)
    .reduce((sum, i) => sum + i, 0);

  return (
    <div>
      {order && (
        <div className={`${styles.mainContainer}`} >
          <p
            className={`text text_type_main-medium mb-10 ${styles.centeredText}`}
          >
            #{id}
          </p>
          <p className="text text_type_main-medium mb-3">{order.name}</p>
          <p
            className={`text text_type_main-default mb-15 ${styles.greenText}`}
          >
            {order.status === "done" ? "Выполнен" : "Выполняется"}
          </p>
          <Ingredients info={myIngredientInfo} counts={counts}/>
          <div className={styles.lowerContainer}>
            <p className="text text_type_main-default text_color_inactive">
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <div className={`${styles.costContainer} pt-4`}>
              <p className={"text text_type_digits-default " + styles.text}>
                {cost}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const Ingredients = ({ info, counts }: { info: Array<TIngredient>, counts: Record<string,number> }) => {
  console.log(counts);
  console.log(info)
  return (
    <>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={`${styles.ingredientsContainer} mb-6`}>
        {info
          .map((ingredient, i) => (
            ingredient && 
            <Ingredient info={ingredient} key={i} count={counts[ingredient._id]} />
          ))}
      </div>
    </>
  );
};

type IngredientProps = {
  info: TIngredient;
  count: number
};

export const Ingredient = ({ info, count }: IngredientProps) => {
  return (
    <div className={`${styles.ingrContainer} mb-4`}>
      <IngredientPic src={info.image} />
      <p className="text text_type_main-default ml-4 mr-4">{info.name}</p>
      <div className={`${styles.costContainer} pt-4`}>
        <p className={"text text_type_digits-default " + styles.text}>
          {info.price}
        </p>
        <CurrencyIcon type="primary" />
        <p className={"text text_type_digits-default " + styles.text}>
           x {count}
        </p>
      </div>
    </div>
  );
};

type IngredientPicProps = {
  src: string;
};

const IngredientPic = ({ src }: IngredientPicProps) => {
  return (
    <div className={styles.picContainer}>
      <img className={styles.pic} src={src} />
    </div>
  );
};
