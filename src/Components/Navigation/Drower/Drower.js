import React, {Component} from 'react'
import classes from './Drower.css'
import BackDrop from "../../UI/BackDrop/BackDrop";
import {NavLink} from "react-router-dom";


class Drawer extends Component {

    handleClick = () => {
        this.props.onClose()
    }

    renderList = (links) => {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                    to={link.to}
                    exact={link.exact}
                    onClick={this.handleClick}
                    activeClassName={classes.active}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render(){
        const cls = [classes.Drawer]

        if(!this.props.isOpen){
            cls.push(classes.close)
        }

        const links = [
            {to: '/', label: 'Список', exact: true}
        ]

        if(this.props.isAuthenticated){
            links.push({to: '/quiz-creator', label: 'Создать тест', exact: false})
            links.push({to: '/logout', label: 'Выйти', exact: false})
        } else {
            links.push({to: '/auth', label: 'Авторизация', exact: false})
        }

        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        { this.renderList(links) }
                    </ul>
                </nav>
                {this.props.isOpen ? <BackDrop onClick={this.props.onClose}/> : null}
            </React.Fragment>
        )
    }

}

export default Drawer



















// const links = [
//     {to: '/', label: 'Список', exact: true},
//     {to: '/auth', label: 'Авторизация', exact: false},
//     {to: '/quiz-creator', label: 'Создать тест', exact: false}
// ]


// renderLinks(){
//     return links.map((link, index) => {
//         return (
//             <li key={index}>
//                 <NavLink
//                     to={link.to}
//                     exact={link.exact}
//                     activeClassName={classes.active}
//                     onClick={this.handleClick}
//                 >
//                     {link.label}
//                 </NavLink>
//             </li>
//         )
//     })
// }