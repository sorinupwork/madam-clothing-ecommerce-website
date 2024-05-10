import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Spinner from './components/spinner/spinner.component';
import { setCurrentUser } from './store/user/user.reducer';
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from './utils/firebase/firebase.utils';

const Navigation = lazy(() =>
  import('./routes/navigation/navigation.component')
);
const Home = lazy(() => import('./routes/home/home.component'));
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Authentication = lazy(() =>
  import('./routes/authentication/authentication.component')
);

const Checkout = lazy(() => import('./routes/checkout/checkout.component'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      const pickedUser =
        user &&
        (({ accessToken, email }) => ({
          accessToken,
          email,
        }))(user);
      dispatch(setCurrentUser(pickedUser));
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
