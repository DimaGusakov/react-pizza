import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/Pizza-block';
import Skeleton from '../components/Pizza-block/Skeleton';
import Pagination from '../components/Pagination';

export default function Home({ searchValue }) {
  const { categoryId, sort } = useSelector((state) => state.filter);
  console.log(categoryId);

  const sortType = sort.sortProperty;
  const dispatch = useDispatch();
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [currentPage, setCurrentPage] = React.useState(1);

  const order = sortType.includes('-') ? 'desc' : 'asc';
  const sortBy = sortType.replace('-', '');
  const category = categoryId > 0 ? `category=${categoryId}&` : '';

  const filteredPizzas = pizzas
    .filter((pizza) => pizza.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  React.useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://692b30107615a15ff24ef8e6.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((pizzas) => {
        setPizzas(pizzas);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {filteredPizzas.length === 0 && !isLoading && (
        <div className="content__error-info">
          <h2>Ничего не найдено 😕</h2>
          <p>К сожалению, по вашему запросу пицц не найдено.</p>
        </div>
      )}

      <div className="content__items">{isLoading ? skeleton : filteredPizzas}</div>
      <Pagination onPageChange={(num) => setCurrentPage(num)} />
    </div>
  );
}
