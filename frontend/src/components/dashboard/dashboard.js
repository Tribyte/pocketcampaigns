import React from 'react';
import RainBackground from './themes/rain/background';
import BasicSidebar from './navigation/sidenav/default/sidebar';
import Grid from './components/grid'

class Dashboard extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            values: []
        }

        this.getDrop = this.getDrop.bind(this);
    }

    getDrop(id, type, x, y, size = 0){
        console.log(id, type, x, y, size);
        this.setState({grid: {empty: false, id: id, type: type, x: x, y: y, size: size}})
        this.getUserCampaign(id).then(data => {
            var joined = this.state.values.concat(data);
            this.setState({values: joined});
        });
    }

    async getUserCampaign(id) {
        const response = await fetch("/api/campaigns/" + id + "/", {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ' Token ' + localStorage.getItem("token")
            }
        });

        return response.json();
    }

    render(){
        return (
            <div className="footer-fix">
                <RainBackground />
                <BasicSidebar drop={this.getDrop} />
                <Grid values={this.state.values} />
            </div>
        )
    }
}

export default Dashboard;
