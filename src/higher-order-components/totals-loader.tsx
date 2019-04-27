import React, { useEffect, useState } from "react";

import { ipcRenderer } from "electron";

import { IMonthlyTotalsProps } from "../types/props";
import { Totals } from "../types/totals";
import { getDisplayName } from "../utils";

const withTotalsLoader = <P extends object>() => {
    return (WrappedComponent: React.FC<P & IMonthlyTotalsProps>) => {
        const TotalsLoader = (props: P) => {
            const [totals, setTotals] = useState<Totals[]>([]);
            const [isLoading, setIsLoading] = useState(false);

            useEffect(() => {
                setIsLoading(true);
                ipcRenderer.send("get-monthly-totals");
                return () => {
                    ipcRenderer.removeAllListeners("monthly-totals");
                };
            }, []);

            ipcRenderer.on("monthly-totals", (event: any, data: Totals[]) => {
                setTotals(data);
                setIsLoading(false);
            });
            // And it renders the component it was given
            return <WrappedComponent {...props} totals={totals} isLoading={isLoading} />;
        };

        TotalsLoader.displayName = `TotalsLoader(${getDisplayName(WrappedComponent)})`;

        // Remember: it takes a component and returns a new component
        // Gotta return it here.
        return TotalsLoader;
    };
};

export default withTotalsLoader;
