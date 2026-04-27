import { Navigate } from "react-router-dom";

import { paths } from "../routes/utils";

/** A catch-all route that redirects to the Not Found page for undefined routes. */
export const catchAllRoot = {
  path: "*",
  element: (
    <Navigate
      to={paths.notFound}
      replace
    />
  )
};
