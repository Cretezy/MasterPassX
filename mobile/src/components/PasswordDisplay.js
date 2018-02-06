import React from "react";
import { View } from "react-native";
import { Platform } from "react-native";
import { CenterText } from "./CenterText";
import { textColors } from "../color";

export function PasswordDisplay({ password }) {
	return (
		<CenterText
			style={{
				fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
				fontSize: 24,
				paddingBottom: 5,
				color: password ? textColors.dark : textColors.muted
			}}
		>
			{password || "Enter site to start..."}
		</CenterText>
	);
}
