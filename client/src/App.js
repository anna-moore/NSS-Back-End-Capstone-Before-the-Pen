import './App.css';
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { HomepageProvider } from './providers/HomepageProvider';
import ApplicationViews from "./components/ApplicationViews";
import Header from "./components/Header";
import { MonthlyLayoutProvider } from './providers/MonthlyLayoutProvider';
import { MonthlyProvider } from './providers/MonthlyProvider';
import { TypeOfMediaProvider } from './providers/TypeOfMediaProvider';
import { InspoResourceProvider } from './providers/InspirationalResourceProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <HomepageProvider>
          <InspoResourceProvider>
            <MonthlyProvider>
              <MonthlyLayoutProvider>
                <TypeOfMediaProvider>
                  <Header />
                  <ApplicationViews />
                </TypeOfMediaProvider>
              </MonthlyLayoutProvider>
            </MonthlyProvider>
          </InspoResourceProvider>
        </HomepageProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
