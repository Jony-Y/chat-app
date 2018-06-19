
import 'whatwg-fetch';
import isEmpty from 'lodash/isEmpty';
import userUtility from './userUtility';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
    return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    return response.json().then(err => {throw err;});
}
/**
 * Build the query params to be set on the url
 * @param params         query params object
 * @returns {string}    the formatted query params
 */
function setQueryParams(params={}){
    if(!isEmpty(params.method)){
        return '';
    }
    let esc = encodeURIComponent;
    return (!isEmpty(params))?'/?'+Object.keys(params).map(k => esc(k) + '=' + esc(params[k])).join('&'):'';
}

/**
 * Process the request options and return the options to send to the server
 * @param options {Object} Request options from the api call
 * @returns {*}
 */
function processRequestOptions(options = {}){
    let baseOptions = {
        credentials: 'same-origin',
        mode:'cors',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${userUtility.token}`
        }
    };
    if(!isEmpty(options)) {
        if (isEmpty(options.method)) {
            return baseOptions;
        } else {
            options.method = options.method.toUpperCase();
        }
        if (!isEmpty(options.body)) {
            options.body = JSON.stringify(options.body);
        }
    }
    return Object.assign(baseOptions, options);

}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [payload] The payload we want to pass to "fetch"
 * @return {object}           The response data
 */
function request(url,payload = {}) {
    let requestUrl = `${process.env.REACT_APP_BASE_URL}/${url}${setQueryParams(payload)}`;
    return fetch(requestUrl, processRequestOptions(payload))
        .then(checkStatus)
        .then(parseJSON);
}

export default request;