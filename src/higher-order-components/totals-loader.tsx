import React, { useEffect, useState } from "react";

import { ipcRenderer } from "electron";

import { ITotalsProps } from "../types/props";
import { Totals } from "../types/totals";
import { getDisplayName } from "../utils";

export interface ITotalsLoader {
    sendMessage: string;
    recieveMessage: string;
}

const withTotalsLoader = <P extends object>(loaderProps: ITotalsLoader) => {
    return (WrappedComponent: React.FC<P & ITotalsProps>) => {
        const TotalsLoader = (props: P) => {
            const [totals, setTotals] = useState<Totals[]>([]);
            const [isLoading, setIsLoading] = useState(false);

            const { sendMessage, recieveMessage } = loaderProps;

            useEffect(() => {
                setIsLoading(true);
                ipcRenderer.send(sendMessage);
                return () => {
                    ipcRenderer.removeAllListeners(recieveMessage);
                };
            }, []);

            ipcRenderer.on(recieveMessage, (event: any, data: Totals[]) => {
                setTotals(data);
                setIsLoading(false);
            });
            // And it renders the component it was given
            return <WrappedComponent {...props as P} totals={totals} isLoading={isLoading} />;
        };

        TotalsLoader.displayName = `TotalsLoader(${getDisplayName(WrappedComponent)})`;

        // Remember: it takes a component and returns a new component
        // Gotta return it here.
        return TotalsLoader;
    };
};

export default withTotalsLoader;
