import ReactDOM from "react-dom";
import React from "react";
import {Provider} from "react-redux";
import configure from "./store";
import Routes from "./routes";

// Root store
var store = configure();

// route components

// Main router
ReactDOM.render(
	<Provider store={store}>
		<Routes/>
	</Provider>,
	document.getElementById('root')
);
