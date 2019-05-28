import React, { ReactNode } from 'react';
import { createStyled } from './createStyled';

interface IMainContentProps {
    children: ReactNode;
}

const Styled = createStyled({
    root: {
        flexGrow: 1,
    },
});

const Content = (props: IMainContentProps) => {
    return <Styled>{() => <main>{props.children}</main>}</Styled>;
};

export default Content;
