import Image from 'next/image'
import './globals.css'
import styles from '@pages/page.module.css'
import { addProductAsync } from '@store/app/thunks'
import { Inter } from '@next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })
import { store } from '@store/store';
import { Provider } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { StoreState } from '@store';
import { Action } from 'redux';
import { useEffect, useState } from 'react'

import { selectIsCartLoading } from '@store/app/selectors';

const App = ({ Component }: { Component: React.ComponentType }) => {
  // QUESTION: What does the `as` keyword do here? Why are we using it?
  const thunkDispatch = store.dispatch as ThunkDispatch<StoreState, any, Action<any>>;

  const [cartIsLoading, setCartIsLoading] = useState(false);

  // QUESTION: why do we have to access the store directly here instead of using hooks?

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const cartLoading = selectIsCartLoading(state);
      setCartIsLoading(cartLoading);
    });

    // QUESTION: when will this method returned by the effect be called?
    return () => {
      unsubscribe();
    };
  }, [])

  if(cartIsLoading){
    return <div className={styles.loader}>
      <Image src='/Spinner-1s-200px.svg' alt='Spinner'/>
    </div>
  }
  
  return (
    <Provider store={store}>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>src/pages/_app.tsx</code>
          </p>
          <div>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
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

        <div className={styles.grid}>
          <button
            className={styles.card}
            onClick={async () => await thunkDispatch(addProductAsync()).unwrap()}
          >
            <h2 className={inter.className}>
              Add product <span>+</span>
            </h2>
            <p className={inter.className}>
              Add product to cart
            </p>
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
            <p className={inter.className}>See the items that have been added to your cart.</p>
          </Link>
        </div>
      </main>
    </Provider>
  )
}

export default App;