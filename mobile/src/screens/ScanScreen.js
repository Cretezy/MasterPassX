import React from "react";
import { Text } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import autobind from "autobind-decorator";
import { addUser } from "../store/users.actions";
import { connect } from "react-redux";

@connect(null, dispatch => ({
	addUser(name, key) {
		dispatch(addUser(name, key));
	}
}))
export class ScanScreen extends React.Component {
	static navigationOptions = { title: "Scan" };

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

		if (hasCameraPermission === null) {
			return <Text>Requesting for camera permission</Text>;
		} else if (!hasCameraPermission) {
			return <Text>No access to camera</Text>;
		} else {
			return (
				<View style={{ flex: 1 }}>
					<BarCodeScanner
						onBarCodeRead={this.onScan}
						style={StyleSheet.absoluteFill}
					/>
				</View>
			);
		}
	}
}
