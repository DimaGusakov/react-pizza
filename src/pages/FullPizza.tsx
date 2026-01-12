import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Pizza } from '../redux/slices/pizzasSlice';
import { addItem } from '../redux/slices/cartSlice';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<Pizza>();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === id),
  );
  const addedCount = cartItem ? cartItem.count : 0;

  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const typeNames = ['тонкое', 'традиционное'];

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get<Pizza>(
          'https://692b30107615a15ff24ef8e6.mockapi.io/pizzas/' + id,
        );
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы!');
        navigate('/');
      }
    }

    fetchPizza();
  }, [id, navigate]);

  const onClickAdd = () => {
    if (pizza) {
      const item = {
        id: pizza.id,
        title: pizza.title,
        price: pizza.price,
        imageUrl: pizza.imageUrl,
        type: typeNames[activeType],
        size: pizza.sizes[activeSize],
        count: 0,
      };
      dispatch(addItem(item));
    }
  };

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <div className="full-pizza">
        <div className="full-pizza__left">
          <img src={pizza.imageUrl} alt={pizza.title} />
        </div>
        <div className="full-pizza__right">
          <h2>{pizza.title}</h2>
          <p className="full-pizza__text">
            Вкусная пицца с сочной начинкой, приготовленная по традиционному рецепту. Попробуйте и
            оцените неповторимый вкус!
          </p>
          <div className="full-pizza__selector">
            <ul>
              {pizza.types.map((typeId, i) => (
                <li
                  key={typeId}
                  onClick={() => setActiveType(i)}
                  className={activeType === i ? 'active' : ''}>
                  {typeNames[typeId]}
                </li>
              ))}
            </ul>
            <ul>
              {pizza.sizes.map((size, i) => (
                <li
                  key={size}
                  onClick={() => setActiveSize(i)}
                  className={activeSize === i ? 'active' : ''}>
                  {size} см.
                </li>
              ))}
            </ul>
          </div>
          <div className="full-pizza__bottom">
            <h4 className="full-pizza__price">от {pizza.price} ₽</h4>
            <div className="full-pizza__buttons">
              <button onClick={onClickAdd} className="button button--outline button--add">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                    fill="white"
                  />
                </svg>
                <span>Добавить</span>
                {addedCount > 0 && <i>{addedCount}</i>}
              </button>
              <Link to="/" className="button button--black">
                <span>Назад</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
