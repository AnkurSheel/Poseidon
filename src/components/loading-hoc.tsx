import * as React from "react";
import { Loading } from "./loading";

interface IWithLoadingProps {
    loading: boolean;
}

export const withLoading = <P extends object>(Component: React.ComponentType<P>): React.FC<P & IWithLoadingProps> => ({
    loading,
    ...props
}: IWithLoadingProps) => (loading ? <Loading /> : <Component {...props as P} />);
