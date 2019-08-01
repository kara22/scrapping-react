import _ from "lodash";
import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchLead, editLead } from "../../actions";
import LeadForm from "./LeadForm";

class LeadEdit extends Component {
    componentDidMount() {
        this.props.fetchLead(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editLead(this.props.match.params.id, formValues);
    };
    render() {
        return (
            <div>
                <h3>Edit Lead</h3>
                <LeadForm
                    initialValues={_.pick(
                        this.props.lead,
                        "title",
                        "company",
                        "first_name",
                        "last_name",
                        "email",
                        "location",
                        "level",
                        "linkedin_url",
                        "profile_image_url"
                    )}
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { lead: state.leads[ownProps.match.params.id] };
};

export default connect(
    mapStateToProps,
    { fetchLead, editLead }
)(LeadEdit);
