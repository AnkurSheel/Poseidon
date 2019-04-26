import { createStyles, Divider, Drawer, List, WithStyles, withStyles } from "@material-ui/core";
import React from "react";
import { ListItemLink } from "./list-item-link";

const styles = () =>
    createStyles({
        drawer: {
            width: "15em",
            flexShrink: 0,
        },
        drawerPaper: {
            width: "15em",
        },
    });

const Navigation = ({ classes }: WithStyles<typeof styles>) => (
    <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
            paper: classes.drawerPaper,
        }}
        anchor="left">
        <List component="nav">
            <Divider />
            <ListItemLink to="/" primary="Charts" />
            <List disablePadding>
                <ListItemLink to="/charts/yearly" primary="Yearly Chart" inset />
                <ListItemLink to="/charts/monthly" primary="Monthly Chart" inset />
            </List>
            <Divider />
            <ListItemLink to="/tables" primary="Tables" />
            <List disablePadding>
                <ListItemLink to="/tables/yearly" primary="Yearly Details" inset />
                <ListItemLink to="/tables/monthly" primary="Monthly Details" inset />
                <ListItemLink to="/tables/details" primary="Individual Details" inset />
            </List>
            <Divider />
            <ListItemLink to="/new-entry" primary="Add New Record" />
        </List>
    </Drawer>
);

export default withStyles(styles)(Navigation);
