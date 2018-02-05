import React from "react";
import { Button as BaseButton } from "react-native-elements";

export function Button(props) {
	const radius = 3;
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
