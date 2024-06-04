/* eslint-disable perfectionist/sort-imports */
import { useDisclosure } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { useAppDispatch } from './redux/hooks';
import { useEffect } from 'react';
import { fetchUser } from './redux/slices/AuthSlice';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  /*const dispatch = useAppDispatch();

  useEffect(() => {
    const fetch = async () => {
      const resultAction = await dispatch(fetchUser());
      if (fetchUser.fulfilled.match(resultAction)) {
        //successToast();
        console.log(resultAction);
      }
    };
    fetch();
  }, [dispatch]);*/

  return (
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <Router />
      </I18nextProvider>
    </ThemeProvider>
  );
}
