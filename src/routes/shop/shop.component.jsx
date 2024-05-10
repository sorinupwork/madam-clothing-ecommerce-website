import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategories } from "../../store/categories/category.reducer";
import Spinner from "../../components/spinner/spinner.component";

const Shop = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments("categories");
      setIsLoading(false);
      dispatch(setCategories(categoriesArray));
    };

    getCategoriesMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route index element={isLoading ? <Spinner /> : <CategoriesPreview />} />
      <Route
        path=":category"
        element={isLoading ? <Spinner /> : <Category />}
      />
    </Routes>
  );
};

export default Shop;
