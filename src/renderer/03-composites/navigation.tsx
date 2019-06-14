import { createStyles, Divider, Drawer, List, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { ListItemLink } from '../02-components/list-item-link';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: '15em',
            flexShrink: 0,
        },
        drawerPaper: {
            width: '15em',
        },
    })
);

interface INavigationProps {
    currentPath: string;
}

const Navigation = (props: INavigationProps) => {
    const { currentPath } = props;
    const classes = useStyles(props);

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left">
            <List component="nav">
                <Divider />
                <ListItemLink to="/" text="Charts" selected={false} />
                <List disablePadding>
                    <ListItemLink
                        to="/charts/yearly"
                        text="Yearly Chart"
                        inset
                        selected={currentPath === '/charts/yearly'}
                    />
                    <ListItemLink
                        to="/charts/monthly"
                        text="Monthly Chart"
                        inset
                        selected={currentPath === '/charts/monthly'}
                    />
                </List>
                <Divider />
                <ListItemLink to="/tables" text="Tables" selected={false} />
                <List disablePadding>
                    <ListItemLink
                        to="/tables/yearly"
                        text="Yearly Details"
                        inset
                        selected={currentPath === '/tables/yearly'}
                    />
                    <ListItemLink
                        to="/tables/monthly"
                        text="Monthly Details"
                        inset
                        selected={currentPath === '/tables/monthly'}
                    />
                    <ListItemLink
                        to="/tables/details"
                        text="Individual Details"
                        inset
                        selected={currentPath === '/tables/details'}
                    />
                </List>
                <Divider />
                <ListItemLink to="/new-entry" text="Add New Record" selected={currentPath === '/new-entry'} />
            </List>
        </Drawer>
    );
};

export default Navigation;
