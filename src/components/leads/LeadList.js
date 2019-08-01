import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchLeads } from "../../actions";

class LeadList extends Component {
    componentDidMount() {
        this.props.fetchLeads();
    }

    renderAdmin(lead) {
        return (
            <div className="extra content">
                <div className="ui two buttons">
                    <Link className="ui basic green button">View Profile</Link>
                    <Link
                        className="ui secondary basic button"
                        to={`/leads/delete/${lead.id}`}
                    >
                        Delete
                    </Link>
                    Archive
                </div>
            </div>
        );
    }

    renderLogs(logs) {
        if (logs) {
            const newLogs = logs.slice(-3).reverse();
            return newLogs.map(log => <li>{log}</li>);
        }
    }
    renderList() {
        return this.props.leads.map(lead => {
            return (
                <div className="card" key={lead.id}>
                    <div className="content">
                        <img
                            src={lead.profile_image_url}
                            alt=""
                            className="right floated mini ui image"
                        />
                        <div className="header">
                            {`${lead.first_name} ${lead.last_name}`}
                        </div>
                        <div className="meta">{lead.title}</div>
                        <div className="description">{lead.company}</div>
                    </div>
                    <div className="extra content">
                        <p>3 last Logs :</p>
                        <ul>{this.renderLogs(lead.logs)}</ul>
                    </div>
                    <div className="extra content">
                        <div className="ui two buttons">
                            <Link
                                className="ui basic green button"
                                to={`/leads/${lead.id}`}
                            >
                                View Profile
                            </Link>
                            <Link
                                className="ui basic red button"
                                to={`/leads/delete/${lead.id}`}
                            >
                                Delete
                            </Link>
                            Archive
                        </div>
                    </div>
                </div>
            );
        });
    }

    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: "right", marginYop: "10px" }}>
                    <Link to="/leads/new" className="ui button primary">
                        Create Lead
                    </Link>
                </div>
            );
        }
    }
    render() {
        console.log(this.props.leads);
        return (
            <div>
                <h2>leads</h2>
                <div className="ui cards">
                    {this.renderList()}
                    {this.renderCreate()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        leads: Object.values(state.leads),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(
    mapStateToProps,
    { fetchLeads }
)(LeadList);
