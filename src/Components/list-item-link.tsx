import { ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
export const ListItemLink = (props: any) => {
    const renderLink = (itemProps: any) => <Link to={props.to} {...itemProps} />;
    const { primary, inset }: any = props;
    return (<li>
        <ListItem button component={renderLink}>
            <ListItemText primary={primary} inset={inset} />
        </ListItem>
    </li>);
};
