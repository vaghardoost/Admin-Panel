import { Component, ReactNode } from "react";
import LoginCard from './components/login-card';

export default class Login extends Component {
	public render(): ReactNode {
		return <>
			<div style={{ width: '350px', margin: '20vh auto 0 auto' }}>
				<LoginCard />
			</div>
		</>
	}
}