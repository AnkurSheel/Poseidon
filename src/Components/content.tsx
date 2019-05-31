import { createStyles, WithStyles } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { createStyled } from './createStyled';

const styles = (theme: any) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    });

const Styled = createStyled(styles);

interface IMainContentProps {
    children: ReactNode;
}

const Content = (props: any) => {
    return (
        <Styled>
            {({ classes }: WithStyles<typeof styles>) => <main className={classes.root}>{props.children}</main>}
        </Styled>
    );
};

export default Content;
