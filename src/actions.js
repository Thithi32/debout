export const SET_COMPANIES = "SET_COMPANIES";
export const SET_HUBS = "SET_HUBS";
export const CREATE_ORDER = "CREATE_ORDER";

export function setCompanies(companies) {
  return {
    type: SET_COMPANIES,
    companies
  }
}

export function setHubs(hubs) {
  return {
    type: SET_HUBS,
    hubs
  }
}

export function fetchCompanies() {
  return dispatch => {
    fetch("/api/companies")
      .then(res => res.json())
      .then(data => dispatch(setCompanies(data.companies)));
  }
}

export function fetchHubs() {
  return dispatch => dispatch(setHubs([
    { name: "Hub1" },
    { name: "Hub2" },
    { name: "Hub3" },
    { name: "Hub4" },
    { name: "Hub5" }
  ]));
}

export function createOrder() {
  return dispatch => dispatch( {
    type: CREATE_ORDER
     });
}