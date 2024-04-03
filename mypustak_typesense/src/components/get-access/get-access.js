"use client"
import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Button, CircularProgress, IconButton, Input, InputAdornment, Paper, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { getUserAccess, fetch_user_access_new } from '../../redux/actions/accountAction';
import { encryptor } from '../../helper/crypto';
import InboxIcon from "@mui/icons-material/Inbox";

class GetAcess extends Component {

    state = {
        user_email: '',
        password: '',
        showpwd: false,
        disableBtn: false,
        InitialLoader: true,
        serverError: false,
        accessData: []
    }
    RedirectLoginPage = () => {
        let BackUrl = "get-access";
        // localStorage.setItem('BackUrl', BackUrl);
        window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
    };
    componentDidMount() {
        if (this.props.userComponentStatus == 1 || this.props.userComponentStatus == 0) {
            this.RedirectLoginPage()
            // const getCookieArr = document.cookie.split("; ");
            // let Cookie_details = getCookieArr.filter(e => e.startsWith("I="));
            // if (Cookie_details.length == 0) {
            //     this.RedirectLoginPage()
            // } else {
            //     this.getUserRoll()
            // }
        } else {
            this.getUserRoll()
        }
    }
    getUserRoll = () => {
        let userinfo = JSON.parse(localStorage.getItem("user_info"))
        this.props.fetch_user_access_new(userinfo.email).then((res) => {
            this.setState({ InitialLoader: false, serverError: false, accessData: res })
            if (this.getReadWriteAccess() == 0) {
                // setTimeout(() => {
                //     window.location.href = "/"
                // }, 6000)
                window.location.href = "/"

            }
        }).catch((err) => {
            this.setState({ InitialLoader: false, serverError: true, accessData: [] })
        })
    }
    getReadWriteAccess = () => {
        console.log(this.state.accessData, "accessData...............")
        let getAccess = this.state.accessData.filter((dashboard) => { return dashboard.dashboard_id == 60 })
        if (getAccess.length) {
            return getAccess[0].permission
        } else {
            return 0
        }
    }
    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleClickShowPassword = () => {
        this.setState({ showpwd: !this.state.showpwd });
    };

    hnadleSubmit = (e) => {
        e.preventDefault()
        this.setState({ disableBtn: true })
        let userinfo = JSON.parse(localStorage.getItem("user_info"));

        let passdata = {
            'access_email': this.state.user_email,
            'password': this.state.password,
            'email': userinfo.email,
        }
        // alert(passdata)

        const body = { body: encryptor(passdata) };


        this.props.getUserAccess(body)
            .then(res => {

                this.setState({ disableBtn: false })

                window.location.href = "/"

            })
            .catch(err => {
                this.setState({ disableBtn: false })
            })
    }
    render() {
        // console.log('op');
        const { user_email, password, showpwd, disableBtn, InitialLoader, serverError } = this.state
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10vh" }}>
                {InitialLoader ?
                    <center>
                        <CircularProgress
                            style={{ marginTop: "10%" }}
                            thickness={4}
                            size={70}
                        />
                    </center> :
                    serverError ?
                        <div style={{ textAlign: "center", padding: "2rem 0rem" }}>
                            <InboxIcon style={{ fontSize: "5rem" }} />

                            <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                                {" "}
                                Something Went Wrong!
                            </div>
                            <div style={{ fontSize: "0.9rem" }}>
                                {" "}
                                Seems to be network issue, Try Again
                            </div>
                            <div>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    style={{ width: "9rem", margin: "1rem 0rem" }}
                                    onClick={() => {
                                        window.location.reload();
                                    }}>
                                    {" "}
                                    Reload
                                </Button>
                            </div>
                        </div>
                        :
                        <div style={{ width: '30vw' }}>
                            <Paper style={{ width: '100%' }}>
                                {this.getReadWriteAccess() == 2 || this.getReadWriteAccess() == 1 ?
                                    <form style={{
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                        display: "flex"
                                    }}
                                        onSubmit={this.hnadleSubmit}
                                    >
                                        <TextField
                                            margin="dense"
                                            type="email"
                                            name="user_email"
                                            value={user_email}
                                            onChange={this.onChangeHandler}
                                            placeholder="User Email"
                                            style={{ margin: '20px' }}
                                            required
                                            variant='standard'
                                            disabled={!(this.getReadWriteAccess() == 2)}
                                        />
                                        <Input
                                            margin="dense"
                                            type={showpwd ? `text` : `password`}
                                            name="password"
                                            value={password}
                                            onChange={this.onChangeHandler}
                                            placeholder="Password"
                                            style={{ margin: '20px' }}
                                            required
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={this.handleClickShowPassword}
                                                    // onMouseDown={this.handleMouseDownPassword}
                                                    >
                                                        {showpwd ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            disabled={!(this.getReadWriteAccess() == 2)}
                                        />
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                            disabled={disableBtn || !(this.getReadWriteAccess() == 2)}
                                        >
                                            SUBMIT
                                        </Button>
                                    </form> :
                                    <center>
                                        <CircularProgress
                                            style={{ marginTop: "10%" }}
                                            thickness={4}
                                            size={70}
                                        />
                                    </center>}
                            </Paper>
                        </div>
                }
            </div>
        )
    }
};

const mapStateToProps = ({ orderBR, accountR }) => ({
    useraccess: orderBR.useraccess,
    userComponentStatus: accountR.userComponentStatus,
})
export default connect(mapStateToProps, { getUserAccess, fetch_user_access_new })(GetAcess);