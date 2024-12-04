import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingPage from './components/loadingPage';
import ErrorBoundary from './components/errorBoundary';
import { MantineProvider } from '@mantine/core';
import Header from './components/header';
const Login = lazy(() => import('./components/login'));
const HomePage = lazy(() => import('./components/homePage'));
const RegisterPage = lazy(() => import('./components/register'));
const TodoDetailsPage=lazy(()=>import ('./components/todoDetails'))
import { Provider } from 'react-redux';
import store from './store';
export default function App() {
  return (
    <Provider store={store}>
      <MantineProvider>
        <ErrorBoundary>
          <BrowserRouter>
            <div className='min-w-full min-h-screen bg-slate-900 flex flex-col justify-start gap-6'>
              <Header />
              <Suspense fallback={<LoadingPage />}>
                <Routes>
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<RegisterPage />} />
                  <Route path='/:id' element={<TodoDetailsPage/>}/>
                  <Route path='/' element={<HomePage />} />
                </Routes>
              </Suspense>
            </div>
          </BrowserRouter>
        </ErrorBoundary>
      </MantineProvider>
    </Provider>
  );
}
