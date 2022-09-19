import { Component, Fragment, ReactNode } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Container, Content, Sidebar } from "rsuite";
import { dispatch } from "./class/redux";

import NotFound from "./components/404";
import Category from "./components/category";
import Dashboard from "./components/dashboard";
import SideMenu from "./components/dashboard/sidenav";
import Login from "./components/login";
import { changeStatus } from "./components/login/reducer";
import Notes from "./components/note";
import AddNote from "./components/note-editor";

interface Props {
  login:boolean
}

class App extends Component<Props>{

  public render(): ReactNode {
    const { login } = this.props;
    return (
        <BrowserRouter>
            <Container>
                <Routes>
                  <Route path="*" element={(login) ? <Sidebar> <SideMenu/> </Sidebar> : <></>}/>
                </Routes>
              <Content>
                <Routes>
                  
                  <Route path="login" element={ (login) ? <Navigate to='/dashboard' /> : <Login/> }/>

                  <Route path="dashboard" element={ (login) ? <Dashboard/> : <Navigate to='/login'/> }/>
                  <Route path="note/add" element={ (login) ? <AddNote/> : <Navigate to='/login'/> }/>
                  <Route path="note" element={ (login) ? <Notes/> : <Navigate to='/login'/> } />
                  <Route path="category" element={ (login) ? <Category/> : <Navigate to='/login'/> } />
                  <Route path="note/edit/:id" element={ (login) ? <AddNote id="anything"/> : <Navigate to='/login'/> }/>

                  <Route path="404" element={ (login) ? <NotFound/> : <Navigate to='/login'/> }/>

                  <Route path="*" element={<Navigate to='404'/>}/>

                </Routes>
              </Content>
            </Container>
        </BrowserRouter>
    )
  }
}

const mapStateToProps = ():Props=>{
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  const result = (token !== null && id !== null);
  if(result){
    dispatch(changeStatus(result));
  }
  return {
    login:result
  }
}

export default connect(mapStateToProps)(App)
