import React from "react";
import { View } from "react-native";

export function Row(props) {
	return <View style={{ flexDirection: 'row' }} {...props} />
}

export function Item({ size = 1, ...props }) {
	return <View style={{ flex: size }} {...props} />
}