import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TopNav = () => {
    const history = useHistory()
    const user = useSelector(state => state.currentUser)
    const handleLogout = () => {
        localStorage.removeItem('TOKEN');
        window.location.reload();
        history.push('/');
    }
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
        <Navbar color="light" light expand="md" >
            <NavbarBrand href="/teacher">
                <Logo> CSE </Logo>
                
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
            {/* <Nav className="mr-auto" navbar>
            <NavItem style={{marginLeft: 1 + 'em'}}>
                <NavLink href="/">Danh sách được phân công</NavLink>
                </NavItem>
                <NavItem style={{marginLeft: 1 + 'em'}}>
                <NavLink href="/course-registered">Khóa học đã đăng ký</NavLink>
                </NavItem>
                <NavItem style={{marginLeft: 1 + 'em'}}>
                <NavLink href="/news">Tin tức</NavLink>
                </NavItem>
                <NavItem style={{marginLeft: 1 + 'em'}}>
                <NavLink href="/promotion">Ưu đãi</NavLink>
                </NavItem>
                
            </Nav> */}
            <Mobile>
            {
                 Object.keys(user).length != 0?(
                    <div className="clearfix">
                    Welcome {user.fullname}
                    <Button outline color="primary" onClick={handleLogout}
                    style={{marginLeft: 1 + 'em'}}>Logout</Button>
                    </div>
                ):(
                    <div className="clearfix" >
                        <Button outline color="primary"  style={{marginRight: 1 + 'em'}}
                        onClick={()=>{history.push('/teacher/login')}}>Login</Button>
                        <Button color="primary"
                        onClick={()=>{history.push('/teacher/login')}}>Sign Up</Button>
                    </div>
                )
                    
            }
            </Mobile>
            </Collapse>
            <Wide>
            {
                 Object.keys(user).length != 0?(
                    <Right className="clearfix">
                    Welcome {user.fullname}
                    <Button outline color="primary" onClick={handleLogout}
                    style={{marginLeft: 1 + 'em'}}>Logout</Button>
                    </Right>
                ):(
                    <Right className="clearfix">
                        <Button outline color="primary"  className="float-right"
                        onClick={()=>{history.push('/teacher/login')}}>Login</Button>
                       
                    </Right>
                )
            }
            </Wide>
        </Navbar>
        </div>
    );
}
const Logo =styled.div`
    padding-left:20px;
`;
const Right = styled.div`
    position: relative;
    float: right;
    display: inline-block;
    &>button{
        margin-left:5px;
    }
`
const Mobile = styled.div`
    @media (min-width: 768px) {
        display:none;
    }
`;
const Wide = styled.div`
    margin-right:10px;
    @media (max-width: 768px) {
        display:none;
    }
`
export default TopNav;
