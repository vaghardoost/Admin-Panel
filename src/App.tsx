import { Component, ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Login from "./components/login";

export default class App extends Component {
  public render(): ReactNode {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login/>}/>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="category"/>
          <Route path="category/add"/>
          <Route path="category/:id"/>
          <Route path="account"/>
          <Route path="note"/>
          <Route path="note/add"/>
          <Route path="login/:id"/>
        </Routes>
      </BrowserRouter>
    )
  }
}