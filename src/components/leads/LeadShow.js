import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchLead } from "../../actions";

class LeadShow extends Component {
    componentDidMount() {
        this.props.fetchLead(this.props.match.params.id);
    }

    renderLogs = logs => {
        if (logs) {
            const newLogs = logs.reverse();
            return newLogs.map(log => <li>{log}</li>);
        }
    };

    render() {
        if (!this.props.lead) {
            return <div>Loading...</div>;
        }
        const {
            id,
            title,
            company,
            first_name,
            last_name,
            profile_image_url,
            level,
            logs,
            location,
            email,
            linkedin_url
        } = this.props.lead;
        return (
            <div className="ui segment">
                <div className="ui two column very relaxed grid">
                    <div className="column">
                        <div className="ui center aligned container">
                            <img
                                className="ui small circular image centered"
                                src={profile_image_url}
                            />
                            <h2>
                                {first_name} {last_name}
                            </h2>

                            <a
                                href={linkedin_url}
                                target="_blank"
                                className="ui center aligned"
                            >
                                <i class="ui centered big linkedin icon" />
                            </a>
                        </div>

                        <h4 class="ui horizontal divider header">
                            <i className="tag icon" />
                            Last actions
                        </h4>
                        <ul>{this.renderLogs(logs) || "No actions to show"}</ul>
                        <h4 class="ui horizontal divider header">
                            <i class="bar chart icon" />
                            Specifications
                        </h4>
                        <table class="ui definition table">
                            <tbody>
                                <tr>
                                    <td class="two wide column">Company</td>
                                    <td>{company}</td>
                                </tr>
                                <tr>
                                    <td>Position</td>
                                    <td>{title}</td>
                                </tr>
                                <tr>
                                    <td>Location</td>
                                    <td>{location}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{email}</td>
                                </tr>
                                <tr>
                                    <td>Level</td>
                                    <td>{level}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="column">
                        <h4 className="ui horizontal divider header">
                            <i className="tag icon" />
                            Description
                        </h4>
                        <p>You can choose an action below for {first_name}</p>
                        <h4 className="ui horizontal divider header">
                            <i class="play icon" />
                            Actions
                        </h4>
                        <table className="ui definition table">
                            <tbody>
                                <tr>
                                    <td className="two wide column">
                                        Linkedin
                                    </td>
                                    <td>
                                        <button class="ui linkedin button">
                                            <i class="linkedin icon" />
                                            Add {first_name} {last_name} on
                                            Linkedin
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Hubspot</td>
                                    <td>
                                        <button class="ui orange button">
                                            Add {first_name} {last_name} on
                                            Hubspot sequence
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Edit</td>
                                    <td>
                                        <Link
                                            className="ui grey button"
                                            to={`/leads/edit/${id}`}
                                        >
                                            Edit {first_name} {last_name}'s
                                            profile
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Delete</td>
                                    <td>
                                        <Link
                                            className="ui red button"
                                            to={`/leads/delete/${id}`}
                                        >
                                            Delete {first_name} {last_name}'s
                                            profile
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="ui vertical divider">and</div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { lead: state.leads[ownProps.match.params.id] };
};

export default connect(
    mapStateToProps,
    { fetchLead }
)(LeadShow);
