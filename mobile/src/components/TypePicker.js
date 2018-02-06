import React from "react";
import Modal from "react-native-modal";
import { templates } from "masterpassx-core";
import { View } from "react-native";
import { Button } from "./Button";
import { List, ListItem } from "react-native-elements";
import { primary } from "../color";
import autobind from "autobind-decorator";

export class TypePicker extends React.PureComponent {
	state = {
		show: false
	};

	@autobind
	hide() {
		this.setState({ show: false });
	}
	@autobind
	show() {
		this.setState({ show: true });
	}

	render() {
		return (
			<View>
				<Button
					title={templates[this.props.value]}
					onPress={this.show}
					backgroundColor={primary.a700}
				/>
				<Modal
					isVisible={this.state.show}
					onBackdropPress={this.hide}
					onBackButtonPress={this.hide}
					animationIn="fadeInUp"
					animationOut="fadeOutDown"
				>
					<List containerStyle={{ marginBottom: 10 }}>
						{Object.keys(templates).map(template => (
							<ListItem
								onPress={() => {
									this.props.onChange(template);
									this.setState({ show: false });
								}}
								key={"template-" + template}
								title={templates[template]}
								disabled={template === this.props.value}
							/>
						))}
					</List>
				</Modal>
			</View>
		);
	}
}
