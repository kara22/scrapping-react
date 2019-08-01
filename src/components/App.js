import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import LeadCreate from "./leads/LeadCreate";
import LeadsList from "./leads/LeadList";
import LeadShow from "./leads/LeadShow";
import LeadDelete from "./leads/LeadDelete";
import LeadEdit from "./leads/LeadEdit";
import LeadScrap from "./leads/LeadScrap";
import Header from "./Header";
import history from "../history";

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={LeadsList} />
                        <Route path="/leads/new" exact component={LeadCreate} />
                        <Route path="/leads/:id" exact component={LeadShow} />
                        <Route
                            path="/leads/edit/:id"
                            exact
                            component={LeadEdit}
                        />
                        <Route
                            path="/leads/delete/:id"
                            exact
                            component={LeadDelete}
                        />
                        <Route path="/scrapping" exact component={LeadScrap} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;
