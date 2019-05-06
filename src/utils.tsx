export const isEmptyString = (text: string): boolean => {
    return text === "" ? true : false;
};

export const getDisplayName = <P extends object>(WrappedComponent: React.FC<P>) => {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

export const isDevelopment = process.env.ENVIRONMENT === "development";

export const isProduction = process.env.ENVIRONMENT === "production";
