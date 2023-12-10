import {
    Routes,
    Route,
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import MainPage from "./routes/main-page/main-page.component";
import Auth from "./routes/auth/auth.component";
import UserPage from "./routes/user-page/user-page.component";
import MusicPage from './routes/music-page/music-page.component'
import Categories from "./routes/categories/categories.component";
import Billing from "./routes/billing/billing.component";
import Navigation from "./routes/navigation/navigation.component";
import ProtectedRoute from "./routes/protected-route/protected";
import SignUpForm from "./components/signUp-form/signUp-form.component";
import ErrorPage from './components/error-page/error-page'
import ProtectedRouteAdmin from "./routes/protected-route-admin/protected-route-admin";
import AdminPanel from "./routes/admin-panel/admin-panel";
import UserDetails from "./components/admin/user-details/user-details";

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainPage />,
            errorElement: <ErrorPage />
        },
        {
            path: "/auth",
            element: <Auth />,
            children: [
                {
                path: 'sign-up',
                element: <SignUpForm />
            },
            ]
        },
        {
            element: (
                <ProtectedRoute>
                    <Navigation />
                </ProtectedRoute>
            ),
            children: [
                {
                    path: "/user",
                    element: (
                        <ProtectedRoute>
                            <UserPage />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/music",
                    element: (
                        <ProtectedRoute>
                            <MusicPage />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/categories",
                    element: (
                        <ProtectedRoute>
                            <Categories />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/billing",
                    element: (
                        <ProtectedRoute>
                            <Billing />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/apanel",
                    element: (
                        <ProtectedRouteAdmin>
                            <AdminPanel />
                        </ProtectedRouteAdmin>
                    ),
                },
                {
                    path: "/apanel/:email",
                    element: (
                        <ProtectedRouteAdmin>
                            <UserDetails />
                        </ProtectedRouteAdmin>
                    ),
                }
            ],
        },
    ]);

    return <RouterProvider router={router}></RouterProvider>;
};

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Auth />} />
//       <Route element={<Navigation />}>
//         <Route path="/user" element={<UserPage />} />
//         <Route path="/categories" element={<Categories />} />
//         <Route path="/billing" element={<Billing />} />
//       </Route>
//     </Routes>
//   );
// }

export default App;
