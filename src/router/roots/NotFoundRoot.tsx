import { NotFoundPage } from "../../pages/notFoundPage";
import { paths } from "../routes/utils";

/** The route for the Not Found page, displayed when a user navigates to an undefined route. */
export const notFoundRoot = {
  path: paths.notFound,
  element: <NotFoundPage />
};
