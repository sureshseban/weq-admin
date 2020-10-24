import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import ReactDOM from 'react-dom';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';
import user from "@testing-library/user-event";
// import '@testing-library/jest-dom/extend-expect'

window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<BrowserRouter><Login /></BrowserRouter>, div)
})

it('should accept values for username and submit', () => {
    const onSubmit = jest.fn()
    const { debug, getByLabelText, getByText } = render(<BrowserRouter><Login /></BrowserRouter>)
    const UserName = getByLabelText(/user name/i)
    user.type(UserName, '1234567890')
    expect(UserName).toHaveValue('1234567890')

    // fireEvent.click(screen.getByText('Login'))

    // const LoginBtn = getByText('Login1')
    // user.click(LoginBtn)
    // expect(onSubmit).toHaveBeenCalled()
    // expect(onSubmit).toHaveBeenCalledTimes(1)
    debug()
})