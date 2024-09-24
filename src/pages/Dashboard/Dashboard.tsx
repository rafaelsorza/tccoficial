import './Dashboard.css';
import React from 'react';
import { UserButton } from '../Auth/Login/authContext';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>impozitions</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>Dashboard</li>
            <li>Recruitment</li>
            <li>Onboarding</li>
            <li>Recruitment tasks</li>
            <li>Calendar</li>
            <li>Settings</li>
          </ul>
        </nav>
        <div className="sidebar-support">
          <button className="support-btn">Support 24/7</button>
        </div>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h2>Dashboard</h2>
          <div className="user-profile">
            <UserButton />
          </div>
        </header>

        <section className="welcome-section">
          <div className="welcome-card">
            <h3>Hello Katie!</h3>
            <p>You have 16 new applications. It is a lot of work for today! So let's start.</p>
            <a href="#">review it!</a>
          </div>
          <div className="calendar-card">
            <h3>March 2020</h3>
            {/* Aqui você pode implementar um calendário mais tarde */}
          </div>
        </section>

        <section className="content-section">
          <div className="cards">
            <div className="card">You need to hire</div>
            <div className="card">Recruitment progress</div>
            <div className="card">New Applicants</div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;