import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthGuard from '@components/auth/AuthGuard';
import useLoadKakao from '@hooks/useLoadKakao';
import Navbar from '@shared/Navbar';
import {lazy, Suspense} from 'react';
import {HelmetProvider} from 'react-helmet-async';

const PrivateRoute = lazy(() => import('./components/auth/PrivateRoute'));
const HotelListPage = lazy(() => import('@pages/HotelList'));
const HotelPage = lazy(() => import('@pages/Hotel'));
const Mypage = lazy(() => import('@pages/My'));
const SigninPage = lazy(() => import('./pages/Signin'));
const SettingPage = lazy(() => import('@pages/settings'));
const LikePage = lazy(() => import('@pages/settings/like'));
const TestPage = lazy(() => import('@pages/Test'));
const SchedulePage = lazy(() => import('@pages/Schedule'));
const ReservationPage = lazy(() => import('@pages/Reservation'));
const ReservationDonePage = lazy(() => import('@pages/ReservationDone'));
const ReservationListPage = lazy(() => import('@pages/ReservationList'));

function App() {
  useLoadKakao();

  return (
    <Suspense fallback={<></>}>
      <HelmetProvider>
        <BrowserRouter>
          <AuthGuard>
            <Navbar />
            <Routes>
              <Route path="/" element={<HotelListPage />} />
              <Route path="/hotel/:id" element={<HotelPage />} />
              <Route
                path="/my"
                element={
                  <PrivateRoute>
                    <Mypage />
                  </PrivateRoute>
                }
              />
              <Route path="/signin" element={<SigninPage />} />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <SettingPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings/like"
                element={
                  <PrivateRoute>
                    <LikePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/schedule"
                element={
                  <PrivateRoute>
                    <SchedulePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/reservation"
                element={
                  <PrivateRoute>
                    <ReservationPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/reservation/done"
                element={
                  <PrivateRoute>
                    <ReservationDonePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/reservation/list"
                element={
                  <PrivateRoute>
                    <ReservationListPage />
                  </PrivateRoute>
                }
              />
              <Route path="/test" element={<TestPage />} />
            </Routes>
          </AuthGuard>
        </BrowserRouter>
      </HelmetProvider>
    </Suspense>
  );
}

export default App;
