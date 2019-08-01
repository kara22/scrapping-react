import React, { Component } from "react";
import { connect } from "react-redux";
import { createLead } from "../../actions";
import LeadForm from "./LeadForm";

class LeadCreate extends Component {
    onSubmit = formValues => {
        this.props.createLead(formValues);
    };

    render() {
        return (
            <div>
                <h3>Create a lead</h3>
                <LeadForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}

export default connect(
    null,
    { createLead }
)(LeadCreate);
