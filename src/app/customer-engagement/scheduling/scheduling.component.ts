import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { OptionsInput, Calendar } from '@fullcalendar/core';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { UserService } from 'app/service/user.service';
import { UserGetDto } from 'app/interface/user/user';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
// import gapi from '@types/gapi/index'
// import client from '@types/gapi/index'
declare var gapi: any;
//declare var auth2: any;
declare var client: any;


@Component({
  templateUrl: './scheduling.component.html' 
})
export class SchedulingComponent implements OnInit {

  options: OptionsInput;
  eventsModel: any;
  users: UserGetDto
  eventSources: any;
  public auth2: any;
  client: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAllUsers();
    this.initializeCalendar();
    this.googleStart();
  }

  initializeCalendar()
  {
    let containerEl = document.getElementById('external-events');
    new Draggable(containerEl, {
      itemSelector: '.fc-event',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText,
          userId: eventEl.id,
          id: null
        };
      }
    });

    this.options = {
      editable: true,
      header: {
        left: 'prev,next today ',
        center: 'title',
        right: 'dayGridMonth, timeGridWeek, timeGridDay, listWeek'
      },
      droppable: true,
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, googleCalendarPlugin],

    
    };

    this.eventsModel = [{
      title: 'Existing Event',
      start:  '2019-06-23 11:30',
      end:  '2019-06-23 12:30',
      date:'2019-06-23',
      id: 'eventId',
      groupId: "userId",
      userId: 'id'
    }];

    this.eventSources = [ 
      {
        googleCalendarId: 'projectteating@gmail.com',
        color: 'yellow',
        editable: false
      }
    ]

    // this.eventsModel = {
    //   googleCalendarId: 'projectteating@gmail.com',
    //   color: 'yellow'
    // }
  }  

  googleAuthenticate(){
    //this.authenticate();
  
  }

  googleStart(){
    let that = this;

    gapi.load('client:auth2', function() {
      that.auth2 = gapi.auth2.init({
        client_id: "882812124114-ac2tjvbcefb7dtdkugf7thf29jok0r83.apps.googleusercontent.com",
        // cookiepolicy: 'single_host_origin',
        scope:  "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"
      });
    //   that.client =       gapi.client.init({
    //     apiKey: "AIzaSyDHieOCrrHdkHheNC49ifMH9pAL0qnjHDE",
    //     client_id: "882812124114-ac2tjvbcefb7dtdkugf7thf29jok0r83.apps.googleusercontent.com",
    //     scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"
    // });
    // console.log(that.client)
    console.log(that.auth2)
    gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"})
        .then(function() {
           console.log("Sign-in successful"); 
           gapi.client.setApiKey("AIzaSyDHieOCrrHdkHheNC49ifMH9pAL0qnjHDE");
           return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
               .then(function() { console.log("GAPI client loaded for API"); 
               console.log(gapi.client.calendar)
               that.client = gapi.client;              
               that.delete();
              },
                     function(err) { console.error("Error loading GAPI client for API", err); });
          //  console.log(that.client.calendar)
          //  console.log(gapi.client.calendar)
           
          },
          function(err) { console.error("Error signing in", err); });

    //that.execute();
  });
}


  // google
  authenticate() {
    console.log(gapi)    
    let that = this;

    gapi.load('auth2', function () {
        that.auth2 = gapi.auth2.init({
        client_id: "882812124114-ac2tjvbcefb7dtdkugf7thf29jok0r83.apps.googleusercontent.com",
        // cookiepolicy: 'single_host_origin',
        scope:  "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"
      });
      console.log(that.auth2)
      console.log(that.client)
      return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"})
        .then(function() {
           console.log("Sign-in successful"); 
           
          //  gapi.load('client', function() {
          //  that.client = gapi.client.init();
          // });
          //  that.loadClient() 
          },
          function(err) { console.error("Error signing in", err); });

      //that.attachSignin(that.element.nativeElement.firstChild);
    });

    gapi.load('client:auth2', function() {
      that.client =       gapi.client.init({
        apiKey: "AIzaSyDHieOCrrHdkHheNC49ifMH9pAL0qnjHDE",
        client_id: "882812124114-ac2tjvbcefb7dtdkugf7thf29jok0r83.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"
    })
    console.log(that.client)

  });


    
    // return auth2.getAuthInstance()
    //     .signIn({scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"})
    //     .then(function() { console.log("Sign-in successful"); this.loadClient() },
    //           function(err) { console.error("Error signing in", err); });
  }

  public attachSignin(element) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE


      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }


  loadClient() {
    this.client.setApiKey("AIzaSyD9wk83WIl05v8mY0aelDBXLfAd4uBlCIg");
    return client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); this.execute()},
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  insert() {
    console.log(this.client.calendar)
    return gapi.client.calendar.events.insert({
      "key":"AIzaSyD9wk83WIl05v8mY0aelDBXLfAd4uBlCIg",
      "calendarId": "projectteating@gmail.com",
      "resource": {
        'start': {
          'dateTime': '2019-06-28T09:00:00-07:00'
          
        },
        'end': {
          'dateTime': '2019-06-29T17:00:00-07:00'
         
        },
      }
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                console.log(response.result.id)
                // auth2.init({client_id: "688951263087-qe92qojkr080u59999l0k2q65fqsg3ia.apps.googleusercontent.com"});
              },
              function(err) { console.error("Execute error", err); });
  }

  update() {

    return gapi.client.calendar.events.update({
      "key":"AIzaSyD9wk83WIl05v8mY0aelDBXLfAd4uBlCIg",
      "calendarId": "projectteating@gmail.com",
      "eventId": "mbg1ik21ln90gvnvsrimnmh9j8",
      "resource": {
        'summary':'New title 2',
        'start': {
          'dateTime': '2019-06-28T09:00:00-07:00'
          
        },
        'end': {
          'dateTime': '2019-06-28T10:00:00-07:00'
         
        },
      }
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                console.log(response.result.id)
                // auth2.init({client_id: "688951263087-qe92qojkr080u59999l0k2q65fqsg3ia.apps.googleusercontent.com"});
              },
              function(err) { console.error("Execute error", err); });
  }


  delete() {

    return gapi.client.calendar.events.delete({
      "key":"AIzaSyD9wk83WIl05v8mY0aelDBXLfAd4uBlCIg",
      "calendarId": "projectteating@gmail.com",
      "eventId": "mbg1ik21ln90gvnvsrimnmh9j8",
     
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                console.log(response.result.id)
              
              },
              function(err) { console.error("Execute error", err); });
  }





  // google //

  getAllUsers(){
    this.userService.getAllUsers().subscribe(resp => {
      this.users = resp.body;
    })
  }

  eventReceive(event: any){
    console.log(event.event);
    //save to db
    //refresh calendar
  }

  eventDrop(event: any){
    // ne backend nese date start ska ndryshuar, mos i ndrysho schedulers, mund ta besh kontrollin qe ketu
    console.log(event.event.extendedProps.userId)
    console.log(event.event.id)
    console.log(event.event.groupId)
    console.log(event.event.start)
    console.log(event.event.end)
    console.log(event.oldEvent.start.getFullYear())
    console.log(event.oldEvent.end)

  }

  eventResize(event: any){
    // mos i ndrysho schedulers
    console.log(event.event.extendedProps.userId)
    console.log(event.event.id)
    console.log(event.event.groupId)
    console.log(event.event.start)
    console.log(event.event.end)

    console.log(event.prevEvent.start)
    console.log(event.prevEvent.end)

    console.log(event.startDelta)
    console.log(event.endDelta)

  }

  eventClick(event: any){
    console.log(event.event);
    if(confirm("Are you sure you want to delete this event?"))
      event.event.remove();
  }



}
