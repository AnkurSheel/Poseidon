import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { Totals } from '../../types/totals';

export interface ITotalsLoader {
    sendMessage: string;
    recieveMessage: string;
}

const useTotalsLoader = (props: ITotalsLoader) => {
    const [totals, setTotals] = useState<Totals[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { sendMessage, recieveMessage } = props;

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

    return {
        totals,
        isLoading,
    };
};

export default useTotalsLoader;
