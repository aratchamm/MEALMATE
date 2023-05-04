import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';


export class NavMenu extends Component {
  static displayName = NavMenu.name;

  state = {
    showPopup: false
  };



  togglePopup = () => {
    this.setState({ showPopup: !this.state.showPopup });
  };

  Logout = () => {
    this.setState({ showPopup: !this.state.showPopup });
    localStorage.clear();

  };


  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {

    return (

      <header>
       <Navbar className="navbar-expand-sm fixed-top navbar-toggleable-sm bg-white border-bottom box-shadow mb-3" container-fuild light>
  <NavbarBrand>
    <img src="https://sv1.picz.in.th/images/2023/04/08/mlIkAa.png" alt="logo.png" border="0" width="100px" />
  </NavbarBrand>

  <Navbar  className="ml-auto">

    <NavItem>
    <NavbarBrand>
    <button onClick={this.togglePopup} style={{border:'none', backgroundColor:'transparent'}}>
        <i className="fas fa-sign-out-alt"></i> Logout
      </button>
  </NavbarBrand>
      
    </NavItem>
  </Navbar>
</Navbar>


{this.state.showPopup && (

<div id="popup3" className="overlay">
                    <div className="popup3 text-center">
                        <a className="close my-1 mx-2" onClick={this.togglePopup}><img border="0" alt="" src="https://sv1.picz.in.th/images/2023/04/28/ygp9r1.png"></img></a>
                        <div className="h3 py-4"><b>ต้องการออกจากระบบ?</b></div>
                        <div className="content">
                            <div className="row">
                                <div className="col-6 mt-3">
                                    <Link tag={Link} to="/login"><input style={{backgroundColor: '#ff000d'}} onClick={this.Logout} className="button1 h4 p-3" type="submit" value="ใช่"></input></Link>
                                </div>

                                <div className="col-6 mt-3">
                                    <input style={{backgroundColor: '#8E8E8E'}} onClick={this.togglePopup} className=" button1 h4 p-3" type="submit" value="ไม่"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
)}



      </header>
    );
  }
}
