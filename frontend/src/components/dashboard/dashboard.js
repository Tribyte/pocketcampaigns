import React from 'react';
import RainBackground from './themes/rain/background';
import BasicSidebar from './navigation/sidenav/default/sidebar';

class Dashboard extends React.Component {
    render(){
        return (
            <div className="footer-fix">
                <RainBackground />
                <BasicSidebar />
            </div>
        )
    }
}

export default Dashboard;
