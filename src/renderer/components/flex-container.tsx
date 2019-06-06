import { createStyles, WithStyles } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { createStyled } from './createStyled';

const styles = (theme: any) =>
    createStyles({
        root: {
            display: 'flex',
        },
    });

const Styled = createStyled(styles);

interface IFlexContainerProps {
    children: ReactNode;
}

const FlexContainer = (props: IFlexContainerProps) => {
    return (
        <Styled>
            {({ classes }: WithStyles<typeof styles>) => <main className={classes.root}>{props.children}</main>}
        </Styled>
    );
};

export default FlexContainer;
