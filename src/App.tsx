import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Container, Content, Sidebar } from "rsuite";
import { dispatch } from "./redux";

import NotFound from "./pages/404";
import Category from "./pages/category";
import Dashboard from "./pages/dashboard";
import SideMenu from "./pages/dashboard/sidenav";
import Login from "./pages/login";
import { changeStatus } from "./pages/login/reducer";
import Notes from "./pages/note";
import AddNote from "./pages/note-editor";
import Photo from "./pages/photo";

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
                  <Route path="file/photo" element={ (login) ? <Photo/> : <Navigate to='/login'/> }/>

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
  const result = (token !== null);
  if(result){
    dispatch(changeStatus(result));
  }
  return {
    login:result
  }
}

export default connect(mapStateToProps)(App)
