import { ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

interface IListItemLinkProps {
    to: string;
    inset?: boolean;
    text: string;
    selected: boolean;

    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}
export const ListItemLink = (props: IListItemLinkProps) => {
    const renderLink = (itemProps: any) => <Link to={props.to} {...itemProps} />;
    const { text, inset }: IListItemLinkProps = props;
    return (
        <li>
            <ListItem button component={renderLink} selected={props.selected} onClick={props.onClick}>
                <ListItemText primary={text} inset={inset} />
            </ListItem>
        </li>
    );
};
