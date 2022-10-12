
// :CAMPUS_CODE must be replaced with your particular campus code as seen in the GitHub team you are a part of. For example,
// if you are part of "hrnyc30", your campus code is "hrnyc"; or if you are in "hr-rfp34", your code is "hr-rfp".
// Capitalization and hyphenation must match exactly.

window.CAMPUS = 'Your CAMPUS';


// The API can currently be found at https://app-hrsei-api.herokuapp.com/api/fec2/:CAMPUS_CODE/.

// You can bulid globle variable to use or to define a new variable in the local scope to use

window.apiServer = `https://app-hrsei-api.herokuapp.com/api/fec2/${window.CAMPUS}`;

// You can bulid globle variable to use token or to define a new variable in the local scope to use
window.token = 'Your github_token';



// Example use in your sever file:

// const options = {
//   method: 'GET',
//   url: window.apiServer,
//   headers: { Authorization: window.token },
// };

// axios(options).then(result=>console.log(result));
