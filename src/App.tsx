import React, { Component, useEffect, useRef, useState } from "react";

import logo from "./logo.svg";
import "./App.scss";
import NotesRepo from "./NotesRepo";

import { TextInput, ButtonOutline } from "@primer/components";

declare global {
  interface Window {
    gapi: any;
  }
}

function App() {
  const [eventsLoaded, setEventsLoaded] = useState(false);
  const [events, setEvents] = useState(false);

  useEffect(() => {
    handleClientLoad();
  }, []);

  var gapi = window.gapi;
  var CLIENT_ID =
    "869895177524-k98tv2jn17rvjmko16q6p4fgn4m0hf2v.apps.googleusercontent.com";
  // var API_KEY = "AIzaSyDO_bW-651RAiBv9V1MfrfbOfTy4tJ-chQ";

  var API_KEY = "AIzaSyDO_bW-651RAiBv9V1MfrfbOfTy4tJ-chQ";

  // Array of API discovery doc URLs for APIs used by the quickstart
  var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

  const handleClick = () => {
    // ();
    handleAuthClick();
  };

  function handleClientLoad() {
    gapi.load("client:auth2", initClient);
  }

  function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
  }

  function initClient() {
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(
        function () {
          // gapi.auth2.getAuthInstance().signOut();

          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        },
        function (error: any) {}
      );
  }

  function updateSigninStatus(isSignedIn: boolean) {
    if (isSignedIn) {
      listUpcomingEvents();
    } else {
    }
  }

  function listUpcomingEvents() {
    gapi.client.calendar.events
      .list({
        calendarId: "primary",
        // timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      })
      .then(function (response: any) {
        var events = response.result.items;
        setEvents(events);
        setEventsLoaded(true);
      });
  }

  if (eventsLoaded) {
    return <NotesRepo events={events} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Memodash</h1>
        <ButtonOutline onClick={handleClick}>Sign in with Google</ButtonOutline>
      </header>
    </div>
  );
}

export default App;
