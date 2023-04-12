import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root, Calendar, Home, Profile, Standings } from "src/pages";
import { PAGE_ROUTES } from "helpers/consts";
import { Provider } from "react-redux";
import { store } from "store/store";

export const App: FC = () => {
  const router = createBrowserRouter([
    {
      path: PAGE_ROUTES.ROOT,
      element: <Root />,
      children: [
        { index: true, element: <Home /> },
        { path: PAGE_ROUTES.CALENDAR, element: <Calendar /> },
        { path: PAGE_ROUTES.STANDINGS, element: <Standings /> },
        { path: PAGE_ROUTES.PROFILE, element: <Profile /> },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};
