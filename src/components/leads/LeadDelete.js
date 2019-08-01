import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "../Modal";
import history from "../../history";
import { fetchLead, deleteLead } from "../../actions";

class LeadDelete extends Component {
    renderActions() {
        const id = this.props.match.params.id;
        return (
            <React.Fragment>
                <button
                    className="ui button negative"
                    onClick={() => this.props.deleteLead(id)}
                >
                    Delete
                </button>
                <Link to={"/"} className="ui button">
                    Cancel
                </Link>
            </React.Fragment>
        );
    }

    renderContent() {
        const { lead } = this.props;
        if (!lead) {
            return "Are you sure to want to delete this lead ?";
        }
        return `Are you sure ? This lead will be deleted : ${lead.first_name} ${
            lead.last_name
        } - ${lead.title} - ${lead.company}`;
    }

    componentDidMount() {
        this.props.fetchLead(this.props.match.params.id);
    }

    render() {
        return (
            <Modal
                title="Delete a lead"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push("/")}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        lead: state.leads[ownProps.match.params.id]
    };
};

export default connect(
    mapStateToProps,
    { fetchLead, deleteLead }
)(LeadDelete);
