import React, { Component } from "react";
import { connect } from "react-redux";
import LeadScrapForm from "./LeadScrapForm";
import { scrapeLeads } from "../../actions";

class LeadScrap extends Component {
    onSubmit = formValues => {
        this.props.scrapeLeads(formValues);
    };
    render() {
        return (
            <div>
                <LeadScrapForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}

export default connect(
    null,
    { scrapeLeads }
)(LeadScrap);
