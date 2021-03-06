import React from "react";
import {
	Button,
	Form,
	FormGroup,
	Label,
	Col,
	Input,
	Row,
	FormText,
	UncontrolledTooltip
} from "reactstrap";
import { createKey } from "masterpassx-core";
import { addUser } from "../store/users.actions";
import { connect } from "react-redux";
import { withRouter } from "react-router";

export const AddUserForm = withRouter(
	connect(
		null,
		dispatch => ({
			addUser(name, key, save) {
				dispatch(addUser(name, key, save));
			}
		}),
		null,
		{ withRef: true }
	)(
		class AddUserForm extends React.Component {
			static defaultProps = {
				hide: false,
				onSetLoading() {},
				done() {},
				onSetSave() {}
			};

			state = {
				name: "",
				master: "",
				loading: false,
				save: true,
				nameError: null,
				passwordStrength: "",
				passwordStrengthColor: null,
				passwordStrengthScore: null
			};

			async componentDidMount() {
				// Lazy load large library
				this.zxcvbn = await import("zxcvbn");

				if (this.state.master.length > 0) {
					this.updateMaster();
				}
			}

			zxcvbn;
			nameErrorTimer;

			onSubmit = () => {
				const {
					name,
					master,
					passwordStrengthScore,
					save
				} = this.state;
				if (
					name.length > 0 &&
					master.length > 0 &&
					passwordStrengthScore >= 2
				) {
					this.setState({ loading: true });
					this.props.onSetLoading();
					// Let UI update before creating key (CPU intensive, blocks for ~0.5s)
					setTimeout(async () => {
						const key = await createKey(name, master);
						this.props.addUser(name, key, save);
						this.props.history.push("/");
						this.props.done();
					}, 25);
				}
			};

			onChangeName(event) {
				const name = event.target.value;
				this.setState({
					name
				});
				if (this.nameErrorTimer) {
					clearTimeout(this.nameErrorTimer);
				}

				const errors = [];
				if (name !== name.trim()) {
					errors.push(
						"Careful! Name starts or finishes with whitespace."
					);
				}

				if (errors.length > 0) {
					this.nameErrorTimer = setTimeout(() => {
						this.setState({ nameError: errors.join(" ") });
					}, 1000);
				} else {
					this.setState({ nameError: null });
				}
			}

			onChangeMaster(event) {
				const master = event.target.value;
				this.updateMaster(master);
			}

			updateMaster(master = this.state.master) {
				const strengthState = {};
				if (this.zxcvbn) {
					const strength = this.zxcvbn(master, [
						...this.state.name.split(" "),
						this.state.name,
						"master",
						"masterpassx"
					]);

					strengthState.passwordStrength = `Could take ~${
						strength.crack_times_display
							.offline_slow_hashing_1e4_per_second
					} to crack.`;

					if (strength.feedback) {
						if (strength.feedback.warning) {
							strengthState.passwordStrength +=
								" " + strength.feedback.warning + ".";
						}
						if (strength.feedback.suggestions.length > 0) {
							strengthState.passwordStrength +=
								" " + strength.feedback.suggestions.join(" ");
						}
					}
					switch (strength.score) {
						case 0:
							strengthState.passwordStrengthColor = "danger";
							break;
						case 1:
							strengthState.passwordStrengthColor = "danger";
							break;
						case 2:
							strengthState.passwordStrengthColor = "warning";
							break;
						case 3:
							strengthState.passwordStrengthColor = "primary";
							break;
						case 4:
							strengthState.passwordStrengthColor = "success";
							break;
						default:
							strengthState.passwordStrengthColor = null;
							break;
					}

					strengthState.passwordStrengthScore = strength.score;
				}

				this.setState({
					master,
					...strengthState
				});
			}

			onChangeSave() {
				const save = !this.state.save;
				this.setState({
					save
				});
				this.props.onSetSave(save);
			}

			render() {
				return (
					<Form
						onSubmit={event => {
							event.preventDefault();
							this.onSubmit(this);
						}}
						autoComplete="new-password"
						className="text-left"
					>
						<FormGroup row>
							<Label
								for="name"
								sm={4}
								className="text-sm-right text-center"
							>
								Full Name
							</Label>
							<Col sm={8}>
								<Input
									name="name"
									autoCorrect="off"
									spellCheck="false"
									autoComplete="new-password"
									value={this.state.name}
									onChange={this.onChangeName.bind(this)}
								/>
								<FormText>
									{this.state.nameError ||
										"This will need to match exactly on other devices."}
								</FormText>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label
								for="master"
								sm={4}
								className="text-sm-right text-center"
							>
								Master Password
							</Label>
							<Col sm={8}>
								<Input
									name="master"
									id="master"
									type="password"
									autoComplete="new-password"
									valid={
										this.state.passwordStrengthScore !==
										null
											? this.state
													.passwordStrengthScore >= 2
											: null
									}
									value={this.state.master}
									onChange={this.onChangeMaster.bind(this)}
								/>
								<FormText
									color={
										this.state.passwordStrengthColor ||
										undefined
									}
								>
									{this.state.passwordStrength ||
										"Use a long and hard to guess password (or passphrase)."}
								</FormText>
							</Col>
						</FormGroup>

						{!this.props.hide ? (
							<Row noGutters>
								<Col className="p-1 text-center" xs={12} sm={6}>
									<SaveToggle
										save={this.state.save}
										onSaveChange={this.onChangeSave.bind(
											this
										)}
									/>
								</Col>
								<Col className="p-1" xs={12} sm={6}>
									<Button
										type="submit"
										block
										color="success"
										disabled={this.state.loading}
									>
										Create User
									</Button>
								</Col>
							</Row>
						) : (
							<input type="submit" style={{ display: "none" }} />
						)}
					</Form>
				);
			}
		}
	)
);

export function SaveToggle({ onSaveChange, save }) {
	return (
		<FormGroup check>
			<Label check for="save" className="pt-2">
				<Input
					type="checkbox"
					name="save"
					id="save"
					checked={save}
					onChange={onSaveChange}
				/>
				<a id="saveLabel" className="tooltip-label">
					Save User
				</a>
				<UncontrolledTooltip placement="top" target="saveLabel">
					Enabling saving allows you to keep the user saved (no need
					to retype name & master password on every load), and only
					stores the generated key from name & master password (it
					does not store the master password). Disable this if you are
					using a shared computer and don't want others to generate
					passwords for you.
				</UncontrolledTooltip>
			</Label>
		</FormGroup>
	);
}
