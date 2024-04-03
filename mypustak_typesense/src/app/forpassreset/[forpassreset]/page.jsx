"use client"
import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import axios from 'axios';
import config from 'react-global-configuration';
import { RequestResetPassword } from '../../../redux/actions/accountAction'
import Head from 'next/head';
import { connect } from 'react-redux'
import { TextField } from '@mui/material';
import styles from "../../../styles/ResetPassword.module.css"
class Page extends Component {
	static getInitialProps({ query }) {
		return { query };
	}

	state = {
		ResetPassword: '',
		ConfirmPassword: '',
		PasswordErr: '',
		SuccessReset: false
	};
	componentDidMount() {
		window.scrollTo(0, 0);
	}
	render() {
		const onChange = (e) => {
			e.preventDefault();
			this.setState({ [e.target.name]: e.target.value });
		};
		const onSubmit = (e) => {
			e.preventDefault();
			if (this.state.ResetPassword !== this.state.ConfirmPassword) {
				this.setState({ PasswordErr: 'Password Do Not Match' });
			} else if (this.state.ResetPassword === this.state.ConfirmPassword && this.state.ResetPassword.length < 6) {
				this.setState({ PasswordErr: 'Minimum Password Length must be 6 ' });
			} else {
				this.setState({ PasswordErr: '' });
				DoSubmit();
			}
		};
		const DoSubmit = () => {

			let body = {
				password: this.state.ResetPassword
			}
			let token = this.props?.query?.forpassreset
			console.log({ body, token, }, "5224111");

			this.props.RequestResetPassword(body, token).then(res => {
				// console.log({ res });

				SuccessReset();
				setTimeout(() => {
					window.location.href = '/';
				}, 3000);

			})
				.catch(err => {
					console.log({ err });

				})

			return
			// console.log(this.props, 'aaaak');
			var GetTokken = this.props.query.forpassreset;
			var TokenReplace = GetTokken.replace('=', ' ');
			var TokenCapitalized = TokenReplace.charAt(0).toUpperCase() + TokenReplace.slice(1);
			axios
				.post(
					`${config.get('apiDomain')}/core/reset_password/`,
					{ password: this.state.ResetPassword },
					{
						headers: {
							Authorization: TokenCapitalized,
							'content-type': 'application/json'
							// 'cache-control':'no-cache',
						}
					}
				)
				.then((res) => {
					SuccessReset();
					setTimeout(() => {
						window.location.href = '/';
					}, 3000);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		const SuccessReset = () => {
			this.setState({ SuccessReset: true });
		};
		return (
			<div>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
					<title> Books Online India, Buy Online Book In India –mypustak.com</title>
					<meta
						name="og:title"
						property="og:title"
						content="Books Online India, Buy Online Book In India –mypustak.com"
					/>
					<meta
						name="og:description"
						property="og:description"
						content="  Books are the hub of knowledge. Get the books online in India with us. We aimed to aid (help) the needy one with education and knowledge."
					/>
					<meta
						name="og:image"
						property="og:image"
						content="https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png"
					/>
				</Head>
				<>
					<div className={`${styles.ResetPasswordBody}`}>
						<div className={`${styles.ResetPassPart}`}>
							<div className={`${styles.ResetPasswordLayerOne}`}>
								<p id="">Reset Your Password</p>
							</div>

							<form onSubmit={onSubmit}>
								<div className={`${styles.ResetPassForm}`}>
									<div className={`${styles.PasswordDiv}`}>
										<TextField
											type="password"
											size='small'
											label="New Password"
											style={{ width: '100%' }}
											error={this.state.PasswordErr}
											name="ResetPassword"
											className={`${styles.RPassword}`}
											maxLength="40"
											variant="standard"
											onChange={onChange}
										/>
									</div>
									<div className={`${styles.PasswordDiv}`}>
										<TextField
											size='small'
											style={{ width: '100%' }}
											type="password"
											label="Confirm Password"
											helperText={this.state.PasswordErr}
											error={this.state.PasswordErr}
											name="ConfirmPassword"
											className={`${styles.ConfirmRPassword}`}
											maxLength="40"
											variant="standard"
											onChange={onChange}
										/>
									</div>
									<input type="submit" value="submit" className={`${styles.ResetSubmitBtn}`} />
								</div>
							</form>
							{/* <div */}
							<Popup
								open={this.state.SuccessReset}
								closeOnDocumentClick={false}
								onClose={() => this.setState({ addressopen: false })}
								contentStyle={{
									width: '40%',
									height: '47%',
									borderRadius: '5px',
									// marginLeft:'67%',
									marginTop: '7%',
									background: '#fff'
									// pa
								}}
								overlayStyle={{
									// background:'transparent',
								}}
							>
								<p className={`${styles.PRSuccesMsg}`}>Password Reset Successfully You are redirected to Home Page.</p>
							</Popup>
						</div>
					</div>
					<div style={{ marginTop: '80vh' }}>
						{/* <MainFooter /> */}
					</div>
				</>
				<style jsx>
					{`
				
				`}
				</style>
			</div>
		);
	}
}
export default connect(null, { RequestResetPassword })(Page);
