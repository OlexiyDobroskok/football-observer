import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  FixtureDetail,
  Fixtures,
  Home,
  Profile,
  Root,
  Standings,
  Team,
  Teams,
} from "./pages";
import { PAGE_ROUTES } from "helpers/consts";
import { Provider } from "react-redux";
import { store } from "store/store";

export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PAGE_ROUTES.ROOT,
      element: <Root />,
      children: [
        { index: true, element: <Home /> },
        { path: PAGE_ROUTES.FIXTURES, element: <Fixtures /> },
        { path: PAGE_ROUTES.FIXTURE_DETAIL, element: <FixtureDetail /> },
        { path: PAGE_ROUTES.STANDINGS, element: <Standings /> },
        { path: PAGE_ROUTES.TEAMS, element: <Teams /> },
        { path: PAGE_ROUTES.TEAM_INFO, element: <Team /> },
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
