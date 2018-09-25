import React from 'react';
import { Header, Left, Body, Right, Title, Button, Icon } from 'native-base'

const HeaderComponent = (props) => {
    return (
        <Header transparent style={styles.headerStyle}>
            <Left>
                <Button
                    transparent
                    onPress={props.backButtonPress}
                >
                    <Icon name="arrow-back" style={styles.iconsStyle} />
                </Button>
            </Left>
            <Body>
                <Title style={styles.titleHeader}>ULTIMATE TODO APP</Title>
            </Body>
            <Right>
                <Button
                    transparent
                    onPress={props.addButtonPress}
                >
                    <Icon
                        name="plus"
                        type="MaterialCommunityIcons"
                        style={styles.iconsStyle}
                    />
                </Button>
            </Right>
        </Header>
    )
}

const styles = {
    headerStyle: {
        marginTop: 20, width: "auto"
    },
    titleHeader: {
        width: 250,
        marginLeft: -15,
        textAlign: "center",
        height: "auto",
        fontFamily: "TamilSangamMN",
        fontSize: 20,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#ffffff"
    },
    iconsStyle: {
        color: "white"
    }
}


export default HeaderComponent;