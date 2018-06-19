
import history from '../history';
import isEmpty from 'lodash/isEmpty';

/**
 * Get the url query params
 * @returns {*}
 */
export function getQueryParams(){
    try{
        return queryParamStringToObject(window.location.search.substr(1));
    }
    catch(e){
        return undefined;
    }
}
/**
 * Turn a string query param to an object
 * @param string {String}   The query param string
 */
export function queryParamStringToObject(string){
    if(isEmpty(string)){
        return {};
    }
    let queryParams = string.split('&');
    return queryParams.reduce((obj, queryParam)=>{
        let params = queryParam.split('=');
        obj[params[0]] = params[1];
        return obj
    },{})
}
/**
 * Get the current url name
 * @returns {*}
 */
export function getPathName(){
    try{
        return window.location.pathname.replace('/', '');
    }
    catch(e){
        return undefined;
    }
}


/**
 * Build the query params to be set on the url
 * @param params    {Object}  The payload object
 * @returns {string}    the formatted query params
 */
export function buildQueryParams(params={}){
    let esc = encodeURIComponent;
    return Object.keys(params).map(k => esc(k) + '=' + esc(params[k])).join('&');
}

/**
 * Navigate to new container
 * @param location {String} The location to nav to
 * @param params {Object} The query params to pass as object
 * @param preserveQueryParams
 */
export function go(location, params={}, preserveQueryParams = false) {
    if (preserveQueryParams) {
        params = Object.assign({}, params, getQueryParams());
    }
    if(!isEmpty(location)) {
        history.push({pathname:  (location.startsWith('/'))? location : `/${location}`  , search: buildQueryParams(params)});
    }
}
