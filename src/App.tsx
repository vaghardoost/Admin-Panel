import { Component, Fragment, ReactNode } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AddCategory from "./components/caregory-add";
import Category from "./components/category";
import Dashboard from "./components/dashboard";
import SideMenu from "./components/dashboard/sidenav";
import Login from "./components/login";
import AddNote from "./components/note-add";

export default class App extends Component {
  
  public render(): ReactNode {
    // const session = localStorage.getItem("token");
    const session = true;
    return (session)
    ?(<BrowserRouter>
        <Fragment>
          <div style={{ width: 240,float:"right",height:"100%"}}>
            <SideMenu/>
          </div>
          <Container fluid style={{paddingTop:'15px',paddingBottom:'15px'}}>
            <Routes>
              <Route path="dashboard" element={<Dashboard/>}/>
              <Route path="category" element={<Category/>}/>
              <Route path="category/add" element={<AddCategory/>}/>
              <Route path="category/:id"/>
              <Route path="account"/>
              <Route path="note"/>
              <Route path="note/add" element={<AddNote/>}/>
              <Route path="login/:id"/>
            </Routes>
          </Container>
        </Fragment>
      </BrowserRouter>)
    :(<Login/>)
  }
}