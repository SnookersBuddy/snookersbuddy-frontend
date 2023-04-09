import {
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactElement,
} from "react";
import { Route, RouteProps, Routes } from "react-router-dom";
import DefaultErrorPage from "../default-error-page";

type ErrorAwareRoutesProps = PropsWithChildren;

/**
 * Determines if the element is a Route from react-router-dom.
 * @param element - the element in question.
 */
function isElementRoute(element: unknown): element is ReactElement<RouteProps> {
  return isValidElement(element) && element.type === Route;
}

/**
 * There is this stupid bug from react-router where error won't bubble up through
 * Routes components: https://github.com/remix-run/react-router/issues/10021
 *
 * This is why we simply clone each element and attach a default handler if nothing
 * has been attached, yet.
 */
function ErrorAwareRoutes({ children }: ErrorAwareRoutesProps) {
  return (
    <Routes>
      {Children.map(children, (child) => {
        if (isElementRoute(child) && !child?.props?.errorElement) {
          return cloneElement(child as ReactElement<RouteProps>, {
            errorElement: <DefaultErrorPage />,
          });
        }
        return child;
      })}
    </Routes>
  );
}

export default ErrorAwareRoutes;
