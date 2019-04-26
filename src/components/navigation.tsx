import { Drawer, List } from "@material-ui/core";
import React from "react";
import { ListItemLink } from "./ListItemLink";

export const Navigation = () => (
    <Drawer variant="permanent">
        <List component="nav">
            <ListItemLink to="/" primary="Charts" />
            <List disablePadding>
                <ListItemLink to="/charts/yearly" primary="Yearly Chart" inset />
                <ListItemLink to="/charts/monthly" primary="Monthly Chart" inset />
            </List>
            <ListItemLink to="/tables" primary="Tables" />
            <List disablePadding>
                <ListItemLink to="/tables/yearly" primary="Yearly Details" inset />
                <ListItemLink to="/tables/monthly" primary="Monthly Details" inset />
                <ListItemLink to="/tables/details" primary="Individual Details" inset />
            </List>
            <ListItemLink to="/new-entry" primary="Add New Record" />
        </List>
    </Drawer>
);
