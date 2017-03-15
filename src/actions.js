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
    { name: "Bordeaux (33)" },
    { name: "Bourges (18)" },
    { name: "Caen (14)" },
    { name: "Clermont Ferrand (63)" },
    { name: "Lille (59)" },
    { name: "Lyon (69)" },
    { name: "Marseille (13)" },
    { name: "Montpellier (34)" },
    { name: "Nancy (54)" },
    { name: "Nantes (44)" },
    { name: "Orléans (45)" },
    { name: "Poitiers (86)" },
    { name: "Quetigny (21)" },
    { name: "Saint-Quentin (02)" },
    { name: "BeeoTop - Ile-de-France (Clichy)" }
  ]));
}

export function createOrder( order ) {
  return dispatch => {
    console.log(JSON.stringify(order));
    fetch("/api/order", { 
      method: "POST", 
      body: JSON.stringify( { order }),
      headers: { 'Content-Type': 'application/json' } 
    })
      .then(res => res.json())
      .then(data => dispatch({
        type: CREATE_ORDER,
        response: data
      })
    )
  }
}