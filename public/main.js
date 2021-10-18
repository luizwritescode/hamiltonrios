import { JSDOM } from "jsdom";
const { window } = JSDOM("");
import $ from "jquery";
import { getBCBQuotes } from './web-scrapper';


localStorage.getItem("dolar_quote")