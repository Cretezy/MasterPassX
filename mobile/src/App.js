import React from "react";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Provider } from "react-redux";
import { setupStore } from "./store";
import { AppLoading, Asset, Font } from "expo";
import { StatusBar, View, StyleSheet } from "react-native";
import { RootNavigator } from "./Navigator";
import { primary } from "./color";

export default class App extends React.Component {
	static defaultProps = {
		skipLoadingScreen: false
	};

	state = {
		loadedAssets: false,
		loadedStore: false,
	};

	store;

	componentWillMount() {
		this.store = setupStore(() => {
			this.setState({ loadedStore: true });
		});
	}

	render() {
		if ((!this.state.loadedAssets || !this.state.loadedStore) && !this.props.skipLoadingScreen) {
			return (
				<AppLoading
					startAsync={this._loadResourcesAsync}
					onError={this._handleLoadingError}
					onFinish={this._handleFinishLoading}
				/>
			);
		} else if (!this.state.loadedStore) {
			return null;
		} else {
			return (
				<Provider store={this.store}>
					<View style={styles.container}>
						<StatusBar translucent barStyle="light-content" backgroundColor={primary[700]} />
						<RootNavigator />
					</View>
				</Provider>
			);
		}

	}

	_loadResourcesAsync = async () => {
		return Promise.all([
			Asset.loadAsync([]),
			Font.loadAsync({
				...MaterialIcons.font,
				...MaterialCommunityIcons.font
			})
		]);
	};

	_handleLoadingError = error => {
		console.warn(error);
	};

	_handleFinishLoading = () => {
		this.setState({ loadedAssets: true });
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
});
