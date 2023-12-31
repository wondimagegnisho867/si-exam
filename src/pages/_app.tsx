import Image from "next/image";
import "./globals.css";
import styles from "@pages/page.module.css";
import {
  addProductAsync,
  recalculateShippingAsync,
  recalculateTaxesAsync,
} from "@store/app/thunks";
import { Inter } from "@next/font/google";
import Link from "next/link";
import {useRouter} from "next/router";

const inter = Inter({ subsets: ["latin"] });
import MyHead from "@components/head";
import { store } from "@store/store";
import { Provider } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { StoreState } from "@store";
import { Action } from "redux";
import { useEffect, useState } from "react";

import {
  selectCart,
  selectIsCartLoading,
} from "@store/app/selectors";
import { persistCart } from "@utils/storage";
import { Product } from "@models/product";

const App = ({ Component }: { Component: React.ComponentType }) => {
  // QUESTION: What does the `as` keyword do here? Why are we using it?
  // ANSWER: It casts the type of the variable.
  const thunkDispatch = store.dispatch as ThunkDispatch<
    StoreState,
    any,
    Action<any>
  >;

  const [cartIsLoading, setCartIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  // QUESTION: why do we have to access the store directly here instead of using hooks?
  // ANSWER: Because the hook will not be able to access the store since App component is not under the provider
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const cartLoading = selectIsCartLoading(state as any);
      const cart = selectCart(state as any);
      setCartIsLoading(cartLoading);
      persistCart(cart);
    });

    const fetchProducts = async () => {
      const fetchedProducts = await fetch("/api/getProducts", {
        method: "GET",
      }).then((resp) => resp.json());

      setProducts(fetchedProducts.products);
    };

    fetchProducts();

    // QUESTION: when will this method returned by the effect be called?
    // ANSWER: When unmount
    return () => {
      unsubscribe();
    };
  }, []);

  /* event handler */
  const addProduct = async (product:Product|null) => {
    try {
      await thunkDispatch(addProductAsync(product)).unwrap();
      await thunkDispatch(recalculateShippingAsync()).unwrap();
      await thunkDispatch(recalculateTaxesAsync()).unwrap();
      router.push("/cart");
    } catch (err) {
      console.log(err);
    }
  };

  if (cartIsLoading) {
    return (
      <div className={styles.loader}>
        <Image src="/Spinner-1s-200px.svg" alt="Spinner" width={0} height={0} />
      </div>
    );
  }

  return (
    <>
      <MyHead />
      <Provider store={store}>
        <main className={styles.main}>
          <div className={styles.description}>
            <p>
              Get started by editing&nbsp;
              <code className={styles.code}>src/pages/_app.tsx</code>
            </p>
            <div>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Sharper Image Code Exam
              </a>
            </div>
          </div>

          <div className={styles.center}>
            <Image
              className={styles.logo}
              src="/logo.svg"
              alt="Sharper Image Logo"
              width={360}
              height={74}
              priority
            />
          </div>

          <Component />

          <div>
            <h3>Available Products </h3>

            <table border={1}>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product: Product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td><button onClick={()=>addProduct(product)}>Add product</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.grid}>
            <button className={styles.card} onClick={()=>addProduct(null)}>
              <h2 className={inter.className}>
                Add product <span>+</span>
              </h2>
              <p className={inter.className}>Add product to cart</p>
            </button>

            <Link
              href="/cart"
              className={styles.card}
              target="_self"
              rel="noopener noreferrer"
            >
              <h2 className={inter.className}>
                View cart <span>-&gt;</span>
              </h2>
              <p className={inter.className}>
                See the items that have been added to your cart.
              </p>
            </Link>
          </div>
        </main>
      </Provider>
    </>
  );
};

export default App;
