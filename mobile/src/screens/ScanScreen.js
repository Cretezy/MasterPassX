import React from "react";
import { Text } from "react-native-elements";
import { View, StyleSheet, StatusBar } from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import autobind from "autobind-decorator";
import { addUser } from "../store/users.actions";
import { connect } from "react-redux";
import { secondary } from "../color";
import { CenterText } from "../components/CenterText";

@connect(null, dispatch => ({
	addUser(name, key) {
		dispatch(addUser(name, key));
	}
}))
export class ScanScreen extends React.Component {
	static navigationOptions = {
		title: "Scan",
		headerStyle: {
			backgroundColor: secondary[500]
		}
	};

	state = {
		hasCameraPermission: null
	};

	async componentWillMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === "granted" });
	}

	@autobind
	onScan({ data }) {
		try {
			const scanned = JSON.parse(data);
			const { name, key } = scanned;
			this.props.addUser(name, key);
			this.props.navigation.goBack();
		} catch (error) {
			console.error(error);
		}
	}

	render() {
		const { hasCameraPermission } = this.state;

		let content;
		if (hasCameraPermission === null) {
			content = cameraText("Requesting for camera permission");
		} else if (!hasCameraPermission) {
			content = cameraText("No access to camera");
		} else {
			content = (
				<View style={{ flex: 1 }}>
					<BarCodeScanner
						onBarCodeRead={this.onScan}
						style={StyleSheet.absoluteFill}
					/>
				</View>
			);
		}

		return (
			<View style={{ flex: 1 }}>
				<StatusBar
					translucent
					barStyle="light-content"
					backgroundColor={secondary[700]}
				/>
				{content}
			</View>
		);
	}
}

function cameraText(text) {
	return (
		<CenterText style={{ paddingTop: 20, fontSize: 16 }} children={text} />
	);
}
