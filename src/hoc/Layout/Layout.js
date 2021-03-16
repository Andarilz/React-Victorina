import React, {Component} from 'react'
import classes from './Layout.css'
import MenuToggle from "../../Components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../Components/Navigation/Drower/Drower";
import {connect} from 'react-redux'


export class Layout extends Component{

    state = {
        menu: false
    }

    toggleMenuHandler = props => {
        this.setState({
            menu: !this.state.menu
        })
    }

    menuCloseHandler = () => {
        this.setState({
            menu: false
        })
    }

    //проверяем открыто или закрыто меню всплывающее

    render() {
        return (
            <div className={classes.Layout}>

                <Drawer
                    isOpen={this.state.menu}
                    onClose={this.menuCloseHandler}
                    isAuthenticated={this.props.isAuthenticated}
                />

                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                    />

                <main>
                    {this.props.children} //выводим контент
                </main>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout)