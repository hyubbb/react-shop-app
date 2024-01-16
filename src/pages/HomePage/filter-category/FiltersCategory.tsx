import React from "react";
import styles from "./FiltersCategory.module.scss";
import CategoryTab from "./category-tab/CategoryTab";
import { CategoriesName } from "../../../store/categories/categories.type";

const FiltersCategory = () => {
  return (
    <div className={styles.filter_category}>
      <CategoryTab text={"All"} categoryName={CategoriesName.All} />
      <CategoryTab text={"Mens"} categoryName={CategoriesName.MensClothing} />
      <CategoryTab
        text={"Womens"}
        categoryName={CategoriesName.WomensClothing}
      />
      <CategoryTab text={"Jewelry"} categoryName={CategoriesName.Jewelry} />
      <CategoryTab
        text={"Electronics"}
        categoryName={CategoriesName.Electronics}
      />
    </div>
  );
};

export default FiltersCategory;
