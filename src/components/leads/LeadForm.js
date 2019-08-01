import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class LeadForm extends Component {
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
                {console.log(meta)}
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    };

    render() {
        console.log(this.props);
        return (
            <form
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                className="ui form error"
            >
                <Field
                    name="first_name"
                    component={this.renderInput}
                    label="Enter first name"
                />
                <Field
                    name="last_name"
                    component={this.renderInput}
                    label="Enter last name"
                />
                <Field
                    name="title"
                    component={this.renderInput}
                    label="Enter a job title"
                />
                <Field
                    name="email"
                    component={this.renderInput}
                    label="Enter an email"
                />
                <Field
                    name="company"
                    component={this.renderInput}
                    label="Enter a company"
                />
                <Field
                    name="location"
                    component={this.renderInput}
                    label="Enter a location"
                />
                <Field
                    name="level"
                    component={this.renderInput}
                    label="Enter a level (only a number like 1, 2 or 3)"
                />
                <Field
                    name="linkedin_url"
                    component={this.renderInput}
                    label="Paste the linkedin url"
                />

                <Field
                    name="profile_image_url"
                    component={this.renderInput}
                    label="Paste the profile picture url link"
                />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = formValues => {
    const errors = {};
    if (!formValues.first_name) {
        errors.first_name = "you must enter a first name";
    }

    if (!formValues.last_name) {
        errors.last_name = "you must enter a last name";
    }

    if (!formValues.title) {
        errors.title = "you must enter a title";
    }
    if (!formValues.company) {
        errors.company = "you must enter a company";
    }

    if (!formValues.level) {
        errors.level = "You must enter a level";
    }

    if (!formValues.linkedin_url) {
        errors.linkedin_url = "You must paste the linkedin url";
    }
    if (!formValues.email) {
        errors.email = "You must enter an email";
    }

    return errors;
};

export default reduxForm({
    form: "leadForm",
    validate,
    enableReinitialize: true
})(LeadForm);
