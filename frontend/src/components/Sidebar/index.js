import React from 'react'
import {SidebarContainer, 
        Icon, 
        CloseIcon,
        SidebarWrapper,
        SidebarMenu,
        SidebarLink,
        SideBtnWrap,
        SidebarRoute
    } from './SidebarElements'

const Sidebar = ({isOpen, toggle}) => {
    
    const handleClick = () => {
        window.location.href = '/HTML/login.html'
      }
  
    return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
            <CloseIcon/>
        </Icon>
        <SidebarWrapper>
            <SidebarMenu>
                <SidebarLink to="about" onClick={toggle}>About</SidebarLink>
                <SidebarLink to="discover" onClick={toggle}>Discover</SidebarLink>
                <SidebarLink to="services" onClick={toggle}>Services</SidebarLink>
                <SidebarLink to="signup" onClick={toggle}>Sign Up</SidebarLink>
            </SidebarMenu>
            <SideBtnWrap>
                <SidebarRoute onClick={handleClick}>Sign In</SidebarRoute>
            </SideBtnWrap>
        </SidebarWrapper>
    </SidebarContainer>
  )
}

export default Sidebar