import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class LeadScrapForm extends Component {
    renderError = ({ error, touched }) => {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    };
    renderInput = ({ input, label, meta }) => {
        const classname = `field ${meta.error && meta.touched ? "error" : ""}`;
        return (
            <div className={classname}>
                <label>{label}</label>
                <input
                    {...input}
                    //autoComplete="off"
                    type={input.name === "level" ? "number" : "text"}
                />
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    };

    render() {
        return (
            <div>
                <form
                    className="ui form error"
                    onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                    <Field
                        name="sales_navigator_search_url"
                        label="Paste your sales navigator search results url"
                        component={this.renderInput}
                    />
                    <Field
                        name="linkedin_session_cookie"
                        label="Paste your linkedin session cookie"
                        component={this.renderInput}
                    />
                    <button className="ui button primary">Submit</button>
                </form>
            </div>
        );
    }
}

const validate = formValues => {
    const errors = {};
    if (!formValues.sales_navigator_search_url) {
        errors.sales_navigator_search_url =
            "You must paste your search navigator url";
    }
    if (!formValues.linkedin_session_cookie) {
        errors.linkedin_session_cookie =
            "You must paste your linkedin session cookie";
    }

    return errors;
};

export default reduxForm({
    form: "leadScrapForm",
    validate
})(LeadScrapForm);
