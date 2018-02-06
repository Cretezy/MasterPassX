import React from "react";
import { Button as BaseButton } from "react-native-elements";
import { radius } from "../color";

export function Button(props) {
	return (
		<BaseButton
			{...props}
			borderRadius={radius}
			containerViewStyle={[
				{ borderRadius: radius },
				props.containerViewStyle
			]}
			{...props.icon && {
				icon: { ...props.icon, type: "material-community" }
			}}
		/>
	);
}
