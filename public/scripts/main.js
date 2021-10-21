import { BASE_URL } from './constants.js';
import { logout, checkCredentials } from './authfunctions.js'

module.exports = { BASE_URL: BASE_URL, checkCredentials: checkCredentials, logout: logout }
