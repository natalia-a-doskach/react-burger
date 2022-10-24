import React from "react";
import styles from "./burger-constructor.module.css";
import {
  Tab,
  CurrencyIcon,
  LockIcon,
  DeleteIcon,
  DragIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types.js";

function BurgerConstructor({ ingredients, showOrderInfo }) {
  const bread = ingredients[0];
  return (
    <div className={"mt-10 " + styles.mainContainer}>
      <div className={"ml-6 "}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={bread.name + "\n(верх)"}
        price={bread.price}
        thumbnail={bread.image}
      />
      </div>
      <div className={styles.ingContainer}>
        {ingredients.filter(el => el.type != "bun").map((el, ind) => (
          <div key={el._id}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={el.name}
            price={el.price}
            thumbnail={el.image}
            
          />
          </div>
        ))}
      </div>
      <div className={"ml-6 "}>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={bread.name + "\n(низ)"}
        price={bread.price}
        thumbnail={bread.image}
      />
      </div>
      <div className={"mt-10 mr-4 " + styles.totalContainer}>
        <p className={"text text_type_digits-default pl-10 pr-10"}>
          {500}
          <CurrencyIcon type="primary" />
        </p>
        <Button
          type="primary"
          size="medium"
          onClick={showOrderInfo}
          htmlType="button"
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
  showOrderInfo: PropTypes.func.isRequired,
};

export default BurgerConstructor;
