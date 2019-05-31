import { ipcRenderer } from 'electron';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Content from '../../Components/content';
import { DetailsWithConditionalRenderings } from '../../components/details';
import FlexContainer from '../../Components/flex-container';
import Navigation from '../../components/navigation';
import { Detail } from '../../types/details';

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
        <FlexContainer>
            <Navigation currentPath={location.pathname} />
            <Content>
                <DetailsWithConditionalRenderings data={data} columns={columns} loading={isLoading} />;
            </Content>
        </FlexContainer>
    );
};
