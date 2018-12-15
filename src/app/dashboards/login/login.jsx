import React, {Component} from 'react'
import Input from '../../../lib/react/components/input/input';
import './login.css';
import * as userActions from '../../store/actions/user';
import { connect } from 'react-redux';
import {Redirect} from "react-router-dom";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controls: {
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Почта'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true,
                    },
                    valid: false,
                    touched: false,
                },
                password: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Пароль'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6,
                    },
                    valid: false,
                    touched: false,
                },
            }
        };
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        return isValid;
    };

    inputChangedHandler(event, key) {
        const updatedControls = {
            ...this.state.controls,
            [key]: {
                ...this.state.controls[key],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[key].validation),
                touched: true,
            }
        };
        this.setState({controls: updatedControls});
    };

    render() {
        const formElements = {...this.state.controls};
        const inputs = Object.keys(formElements).map(key => {
            const inputElement = formElements[key];
            return <Input
                key={key}
                elementType={inputElement.elementType}
                elementConfig={inputElement.elementConfig}
                value={inputElement.value}
                invalid={!inputElement.valid}
                touched={inputElement.touched}
                changed={(event) => this.inputChangedHandler(event, key)}
            />
        });

        let authRedirect = null;

        if (this.props.isAuthorized) {
            authRedirect = <Redirect to="/chats"/>
        }

        return (
            <div className='login'>
                <form className='login-form' onSubmit={this.onSubmitHandler.bind(this)}>
                    {inputs}
                    <button className='login-button' type="submit">
                        Войти
                    </button>
                </form>
                {authRedirect}
            </div>
        );
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value
        );
    }

    componentDidMount() {
        this.props.onTryAutoLogin();
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(userActions.userAuthorize(
                {email, password}
            )
        ),
        onTryAutoLogin: () => dispatch(userActions.userAutoLogin())
    }
};

const mapStateToProps = state => {
    return {
        isAuthorized: state.user.token !== null && state.user.token !== undefined
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);