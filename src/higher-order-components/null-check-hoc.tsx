import * as React from "react";

export const withNullCheck = <P extends object>(conditionalRenderingFn: (props: P) => boolean) => {
    return (Component: React.ComponentType<P>) => {
        return (props: P) => {
            return conditionalRenderingFn(props) ? <div>No row</div> : <Component {...props} />;
        };
    };
};
