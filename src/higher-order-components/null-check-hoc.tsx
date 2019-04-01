import { props } from "bluebird";
import * as React from "react";

const withNullCheck = <P extends object>(conditionalRenderingFn: (Component: React.ComponentType<P>) => boolean) => (
    Component: React.ComponentType<P>,
) => (props: P) => (conditionalRenderingFn(props) ? null : <Component {...props} />);

// export const withNullCheck = <P extends object>(conditionalRenderingFn: (props: P) => boolean) => (
//     Component: React.ComponentType<P>,
// ) => (props: P) => {
//     conditionalRenderingFn(props) ? null : <Component {...props as P} />;
// };
