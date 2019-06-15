import React, { ReactNode } from 'react';
import Content from '../01-elements/content';
import FlexContainer from '../01-elements/flex-container';
import Navigation from '../03-composites/navigation';

interface ILayoutProps {
    currentPath: string;
    children: ReactNode;
}

const Layout = (props: ILayoutProps) => {
    const { children, currentPath } = props;
    return (
        <FlexContainer>
            <Navigation currentPath={currentPath} />
            <Content>{children}</Content>
        </FlexContainer>
    );
};

export default Layout;
