import leads from "../apis/leads";
import history from "../history";
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_LEAD,
    FETCH_LEAD,
    FETCH_LEADS,
    DELETE_LEAD,
    EDIT_LEAD,
    SCRAPE_LEADS
} from "./types";

export const signIn = userId => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const createLead = formValues => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await leads.post("/api/leads", { ...formValues });
    dispatch({ type: CREATE_LEAD, payload: response.data });
    // Do some programmatic navigation to
    // get the user back to the root route
    history.push("/");
};

export const fetchLeads = () => async dispatch => {
    const response = await leads.get("/api/leads");
    dispatch({ type: FETCH_LEADS, payload: response.data });
};

export const fetchLead = id => async dispatch => {
    const response = await leads.get(`/api/leads/${id}`);
    dispatch({ type: FETCH_LEAD, payload: response.data });
};

export const editLead = (id, formValues) => async dispatch => {
    const response = await leads.put(`/api/leads/${id}`, formValues);
    dispatch({ type: EDIT_LEAD, payload: response.data });
    history.push("/");
};

export const deleteLead = id => async dispatch => {
    const response = await leads.delete(`/api/leads/${id}`);
    dispatch({ type: DELETE_LEAD, payload: id });
    history.push("/");
};

export const scrapeLeads = formValues => async dispatch => {
    const request = require("request");
    const json = {
        output: "first-result-object",
        argument: {
            sessionCookie: formValues.linkedin_session_cookie,
            searches: formValues.sales_navigator_search_url,
            numberOfProfiles: 1000,
            extractDefaultUrl: false,
            removeDuplicateProfiles: true
        }
    };
    const options = {
        url: "https://phantombuster.com/api/v1/agent/67199/launch",
        headers: {
            "X-Phantombuster-Key-1": "PU0PezTj0gc1Ei3erMiLc3cnLolEkA7R"
        },
        json
    };
    const response = await request.post(options, (err, httpResponse, body) =>
        body.data.resultObject.forEach(lead => {
            let values = {
                linkedin_url: lead.profileUrl,
                first_name: lead.firstName,
                last_name: lead.lastName,
                title: lead.title,
                location: lead.location,
                company: lead.companyName,
                profile_image_url: lead.profileImageUrl,
                level: setLevel(lead.title)
            };
            leads.post("/api/leads", { ...values });
            console.log(`${values.linkedin_url} ${values.first_name}`);
        })
    );

    dispatch({ type: SCRAPE_LEADS, payload: response.data });
};

export const setLevel = currentJob => {
    var position = currentJob;
    var level1 = /CDO|CIO|CTO|(?=.*\bchief\b)(?=.*\bdata\b)|(?=.*\bdata)(?=.*\bofficer\b)|(?=.*\bchief\b)(?=.*\bdigital\b)|(?=.*\bchief\b)(?=.*\binformation\b)|(?=.*\bchief\b)(?=.*\btechnical\b)|(?=.*\bchief\b)(?=.*\binnovation\b)|(?=.*\bchief\b)(?=.*\btechnology\b)|(?=.*\bchief\b)(?=.*\btransformation\b)|(?=.*\bdata\b)(?=.*\bdirector\b)|(?=.*\bdirect)(?=.*\binnovation\b)|(?=.*\bdirecteur\b)(?=.*\bsi\b)|(?=.*\bdirecteur\b)(?=.*\binformation\b)|(?=.*\bdirecteur\b)(?=.*\binformations\b)|(?=.*\bdsi\b)(?=.*\badjoint\b)|(?=.*\blab\b)(?=.*\bofficer\b)|(?=.*\bvp\b)(?=.*\binnovation\b)|(?=.*\bvp\b)(?=.*\bbi\b)|(?=.*\bvp\b)(?=.*\bbusiness intelligence\b)|(?=.*\bvp\b)(?=.*\bdata\b)|(?=.*\bvp\b)(?=.*\bit\b)|(?=.*\bvice president\b)(?=.*\bdata\b)|(?=.*\bvice president\b)(?=.*\bit\b)|(?=.*\bvice president\b)(?=.*\binnovation\b)|(?=.*\bvice president\b)(?=.*\bengineering\b)|(?=.*\bvp\b)(?=.*\bengineering\b)|(?=.*\bvice-president)(?=.*\bit\b)|(?=.*\bvice president\b)(?=.*\binformation\b)|(?=.*\bvp)(?=.*\binformation\b)|(?=.*\bvp)(?=.*\bdigital\b)/i;
    var level2 = /CPO|(?=.*\bchief\b)(?=.*\bproduct\b)|(?=.*\bcloud\b)(?=.*\bleader\b)|(?=.*\bdata\b)(?=.*\b program director\b)|(?=.*\bdirecteur\b)(?=.*\bdata\b)|(?=.*\bdigital\b)(?=.*\bdirector\b)|(?=.*\bbusiness intelligence\b)(?=.*\bdirector\b)|(?=.*\bbusiness intelligence\b)(?=.*\bdirecteur\b)|(?=.*\bdata\b)(?=.*\bdirector\b)|(?=.*\bdigital\b)(?=.*\bdirecteur\b)|(?=.*\bengineering\b)(?=.*\bdirector\b)|(?=.*\bengineering\b)(?=.*\bdirecteur\b)|(?=.*\binformatique\b)(?=.*\bdirecteur\b)|(?=.*\bdirecteur\b)(?=.*\butilisateurs\b)|(?=.*\bdirecteur\b)(?=.*\btransformation\b)|(?=.*\bdirectrice\b)(?=.*\btransformation\b)|(?=.*\bhead\b)(?=.*\bbi\b)|(?=.*\bhead\b)(?=.*\bdata\b)|(?=.*\bhead\b)(?=.*\bbusiness intelligence\b)|(?=.*\bhead\b)(?=.*\bdigital\b)|(?=.*\bhead\b)(?=.*\bengineering\b)|(?=.*\bhead\b)(?=.*\binnovation\b)|(?=.*\bhead\b)(?=.*\bit\b)|(?=.*\binnovation\b)(?=.*\bleader\b)|(?=.*\bit\b)(?=.*\bdirector\b)|(?=.*\blab\b)(?=.*\bmanager\b)|(?=.*\bresponsable\b)(?=.*\bdigit)|(?=.*\bresponsable\b)(?=.*\bmobile\b)|(?=.*\bresponsable\b)(?=.*\bnumérique\b)|(?=.*\bresponsable\b)(?=.*\bdigitale\b)|(?=.*\bresponsable\b)(?=.*\binnovation\b)|(?=.*\btechnical\b)(?=.*\bdirector\b)|(?=.*\bresponsable\b)(?=.*\bdata)|(?=.*\bhead\b)(?=.*\binfrastructure\b)|(?=.*\bresponsable\b)(?=.*\bit\b)|(?=.*\bresponsable\b)(?=.*\bdsi\b)|(?=.*\bresponsable\b)(?=.*\barchi)|(?=.*\bhead\b)(?=.*\binformation)|(?=.*\bresponsable\b)(?=.*\bsi\b)|(?=.*\binformation\b)(?=.*\bmanager\b)/i;
    var level3 = /intrapreneur|dsi|(?=.*\bresponsable\b)(?=.*\bseo\b)|(?=.*\bseo\b)(?=.*\bmanager\b)|(?=.*\bbi\b)(?=.*\barchitect\b)|(?=.*\bbi\b)(?=.*\bmanager\b)|(?=.*\bbig data\b)(?=.*\bmanager\b)|(?=.*\bchef\b)(?=.*\bpôle\b)|(?=.*\bprojet)(?=.*\bdata)|(?=.*\bprojet)(?=.*\binnovation)|(?=.*\bprojet)(?=.*\biot\b)|(?=.*\bprojet)(?=.*\bit\b)|(?=.*\bprojet)(?=.*\bnumérique)|(?=.*\bprojet)(?=.*\bobjets connect)|(?=.*\bprojet)(?=.*\bsi\b)|(?=.*\bprojet)(?=.*\bdigit)|(?=.*\bprojet)(?=.*\bweb\b)|(?=.*\bcloud\b)(?=.*\barchitect)|(?=.*\bcloud\b)(?=.*\bmanager\b)|(?=.*\bdata)(?=.*\bexpert)|(?=.*\bdata)(?=.*\bmanager\b)|(?=.*\bdigit)(?=.*\bmanager\b)|(?=.*\bdigit)(?=.*\bofficer\b)|(?=.*\bdigit)(?=.*\bpartner\b)|(?=.*\bengineering\b)(?=.*\bmanager\b)|(?=.*\binnovation\b)(?=.*\bmanager\b)|(?=.*\bfeature\b)(?=.*\bleader\b)|(?=.*\bit\b)(?=.*\bmanager\b)|(?=.*\bit\b)(?=.*\bleader\b)|(?=.*\bproduct\b)(?=.*\bmanager\b)|(?=.*\bproduct\b)(?=.*\bowner\b)|(?=.*\bresponsable\b)(?=.*\bbi\b)|(?=.*\bresponsable\b)(?=.*\binfo)|(?=.*\bresponsable\b)(?=.*\binfra)|(?=.*\bresponsable\b)(?=.*\bweb\b)|(?=.*\bscrum\b)(?=.*\bmaster\b)|(?=.*\bsolution)(?=.*\barchitec)|(?=.*\bcoach)(?=.*\bagile\b)|(?=.*\btechnical\b)(?=.*\bmanager\b)|(?=.*\btechnical\b)(?=.*\bleader\b)|(?=.*\bdigit)(?=.*\binnovation\b)|(?=.*\bit)(?=.*\bproject\b)|(?=.*\bdigit)(?=.*\btransfor)|(?=.*\binnovation)(?=.*\bspecialist)|(?=.*\blead)(?=.*\bdigit)|(?=.*\bcoord)(?=.*\bdata)|(?=.*\barchi)(?=.*\bdata)|(?=.*\barchi)(?=.*\binfra)|(?=.*\biot\b)(?=.*\bproje)|(?=.*\lead\b)(?=.*\bdata)|(?=.*\lead)(?=.*\btech)|(?=.*\digital\b)(?=.*\bworkplace)|(?=.*\lead)(?=.*\bdev)/i;

    var outOfScopeWords = /(cockpit|achats|manufacturing|industrial|mechanic|mecanique|mechanics|investisseur|investor|partner|acquisition|customer|entrepreneur|supply chain|consulting|designer|community|talent|commercial|purchasing|adv|juriste|community manager|ingénieur|formateur|formatrice|sociale|social|contrôle de gestion|controle de gestion|rh|drh|income|credit|ceo|recruiter|assistant|intern |stage|stagiaire|apprenticeship|finance|freelance|financial|consultant|secretary|sales|healthcare|communication|Alternante|alternant|apprentie|Junior|alternance)/i;
    var case1 = position.match(level1);
    var case2 = position.match(level2);
    var case3 = position.match(level3);
    var returnLevel1 = 1;
    var returnLevel2 = 2;
    var returnLevel3 = 3;
    var outOfScope = 4;
    var caseOutOfScope = position.match(outOfScopeWords);

    if (case1) {
        if (caseOutOfScope) {
            return outOfScope;
        } else {
            return returnLevel1;
        }
    } else if (case2) {
        if (caseOutOfScope) {
            return outOfScope;
        } else {
            return returnLevel2;
        }
    } else if (case3) {
        if (caseOutOfScope) {
            return outOfScope;
        } else {
            return returnLevel3;
        }
    } else {
        return outOfScope;
    }
};
