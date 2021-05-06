import './App.css';
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { HomepageProvider } from './providers/HomepageProvider';
import ApplicationViews from "./components/ApplicationViews";
import Header from "./components/Header";
import { MonthlyLayoutProvider } from './providers/MonthlyLayoutProvider';


function App() {
  return (
    <Router>
      <UserProfileProvider>
        <HomepageProvider>
          <MonthlyLayoutProvider>
            <Header />
            <ApplicationViews />
          </MonthlyLayoutProvider>
        </HomepageProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
