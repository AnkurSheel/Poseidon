import { ipcRenderer } from 'electron';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Detail } from '../../types/details';
import { DetailsWithConditionalRenderings } from '../01-elements/details';
import Layout from '../04-layout';

export const IndividualDetails = (props: RouteComponentProps) => {
    const { location } = props;
    const [details, setDetails] = useState<Detail[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        ipcRenderer.send('get-individual-details');
        return () => {
            ipcRenderer.removeAllListeners('individual-details');
        };
    }, []);

    ipcRenderer.on('individual-details', (event: any, data: Detail[]) => {
        setDetails(data);
        setIsLoading(false);
    });

    const data = details.map(d => {
        return {
            date: d.date,
            name: d.name,
            amount: d.amount,
            type: d.type,
        };
    });

    const columns = [
        {
            name: 'Date',
        },
        {
            name: 'Name',
        },
        {
            name: 'Amount',
        },
        {
            name: 'Type',
        },
    ];

    return (
        <Layout currentPath={location.pathname}>
            <DetailsWithConditionalRenderings data={data} columns={columns} loading={isLoading} />
        </Layout>
    );
};
