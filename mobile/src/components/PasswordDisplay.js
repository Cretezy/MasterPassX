import React from "react";
import { View } from "react-native";
import { Platform } from "react-native";
import { CenterText } from "./CenterText";

export function PasswordDisplay({ password }) {
	return (
		<CenterText
			style={{
				fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
				fontSize: 24
			}}
		>
			{password || "Enter site to start..."}
		</CenterText>
	);
}
