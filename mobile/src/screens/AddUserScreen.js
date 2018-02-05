import React from "react";
import { AddUserForm } from "../components/AddUserForm";

export function AddUserScreen() {
	return <AddUserForm autoFocus />;
}

AddUserScreen.navigationOptions = { title: "Add User" };
