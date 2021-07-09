import React from 'react';
import { LoginContext } from './auth';
import { If } from 'react-if';

class Acl extends React.Component {
    static contextType = LoginContext;

    render() {
        let okToRender = false;
        try {

            okToRender = this.context.loggedIn 
                && this.props.capability
                ? this.context.user.capabilities.includes(this.props.capability)
                : false;
        } catch (error) {
            console.log('Not Authorized', error.message);
        }
        return (
            <If condition={okToRender}>
                {this.props.children}
            </If>
        );
    }
}

export default Acl;