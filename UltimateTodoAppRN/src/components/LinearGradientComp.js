import React from "react";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo";



const LinearGradientComponent = (props) => {
    return (
        <LinearGradient
            colors={["rgb(16, 193, 193)", "rgb(72, 68, 100)"]}
            style={props.slideStyle}
        >
            {props.children}
        </LinearGradient>
    );
};



export default LinearGradientComponent;
