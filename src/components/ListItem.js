import React from "react";
import { ListItem, Body, Text } from "native-base";

const ListItemComponent = props => {
    return (
        <ListItem onLongPress={props.longPressHandle} style={props.listItemStyle}>
            <Body>
                <Text>{props.title}</Text>
                <Text note>{props.description}</Text>
            </Body>
        </ListItem>
    );
};


export default ListItemComponent;
