import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { OptionsInput, Calendar } from '@fullcalendar/core';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { UserService } from 'app/service/user.service';
import { UserGetDto } from 'app/interface/user/user';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { SchedulingService } from 'app/service/scheduling.service';
import { EventGetDto, EventPostDto, EventPutDto } from 'app/interface/event/event';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { UserContext } from 'app/common/user.context';
import { Constants } from 'app/helper/constant/constants';

declare var gapi: any;

@Component({
  templateUrl: './scheduling.component.html' 
})
export class SchedulingComponent implements OnInit {
  
  options: OptionsInput;
  eventsModel: any = [];
  users: UserGetDto
  eventSources: any;
  public auth2: any;
  client: any;
  allEvents: Array<EventGetDto>;
  eventToRemove: any;
  showLoading: boolean = false;
  userContext: UserContext;

  constructor(private userService: UserService, private schedulingService: SchedulingService
    ) {
      this.userContext = new UserContext();
     }

  ngOnInit() {
    this.getAllEvents();
    this.getAllUsers();
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
    // from google calendar    
    // this.eventSources = [ 
    //   {
    //     googleCalendarId: 'projectteating@gmail.com',
    //     color: 'yellow',
    //     editable: false
    //   }
    // ]


  }  

  // google calendar section starts here
  
  googleStart(){
    let that = this;
    gapi.load('client:auth2', function() {
      that.auth2 = gapi.auth2.init({
        client_id: Constants.GoogleCalendarClientId,
        // cookiepolicy: 'single_host_origin',
        scope:  "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"
      });

      // if(parseInt(localStorage.getItem("expires_at")) > new Date().getTime())
      //   that.loadClient();
      // else {
        // this will always be true
        if(localStorage.getItem("refresh_token") == 'undefined' || !localStorage.getItem("refresh_token")){
          that.loadClient();
          gapi.auth2.getAuthInstance()
            // ,accessType: 'offline', prompt:'consent' , approval_prompt:'force'
            .signIn({scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events", response_type: 'token id_token refresh_token'})
            .then(function(resp) {
              // this is never returned by gapi
              // localStorage.setItem('refresh_token', resp.Zi.refresh_token)
              // localStorage.setItem('access_token', resp.Zi.access_token)
              // localStorage.setItem('expires_at', resp.Zi.expires_at != null? resp.Zi.expires_at: resp.Zi.expires_in*1000 + new Date().getTime() )
              // console.log("Sign-in successful"); 
              that.loadClient();
              },
              function(err) { console.error("Error signing in", err); });
          }
        // else {
          // not possible for js
          // call the api that gets the new access_token
          // in case it fails,
          // check this link https://www.oauth.com/oauth2-servers/making-authenticated-requests/refreshing-an-access-token/
        // }
     // }
  });
  }

  loadClient(){  
    let that = this;
      gapi.client.setApiKey(Constants.GoogleCalendarApiKey);
      return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
          .then(function() {
              console.log("GAPI client loaded for API"); 
              that.client = gapi.client;            
          },
          function(err) { console.error("Error loading GAPI client for API", err); });         
  }

  // Make sure the client is loaded and sign-in is complete before calling this method.
  insertToGoogle(eventPost: EventPostDto, noScheduling = false) {
    if(eventPost.dateEnd == null)
    // by default the event will last one hour
    eventPost.dateEnd = new Date(eventPost.dateStart.getTime() + 3600000);
    let that = this;
    return gapi.client.calendar.events.insert({
      "key": Constants.GoogleCalendarApiKey,
      "calendarId": "primary",
      "resource": {
        'summary': eventPost.title,
        'start': {
            'dateTime': eventPost.dateStart            
          }, 
        'end': {
            'dateTime': eventPost.dateEnd           
          }
      }
    })
    .then(function(response) {
            eventPost.googleId = response.result.id;
            that.saveEvent(eventPost, noScheduling);              
          },
          function(err) {                           
            //  if(err.status == 401)
            //   localStorage.setItem("expires_at", "0")
            that.saveEvent(eventPost, noScheduling);
          });
  }

  updateToGoogle(eventPut: EventPutDto, noSchedulerChanges = false ) {
    let that = this;
    return gapi.client.calendar.events.update({
      "key": Constants.GoogleCalendarApiKey,
      "calendarId": "primary",
      "eventId": eventPut.googleId,
      "resource": {
        'summary':eventPut.title,
        'start': {
          'dateTime': eventPut.dateStart
          
        },
        'end': {
          'dateTime': eventPut.dateEnd
         
        },
      }
    })
    .then(function(response) {
            // Handle the results here (response.result has the parsed body).
            that.updateEvent(eventPut, noSchedulerChanges);     
          },
          function(err) { console.error("Execute error", err); 
          that.updateEvent(eventPut, noSchedulerChanges);     
    });
  }


  deleteToGoogle(eventId, googleId) {
    let that = this;
    return gapi.client.calendar.events.delete({
      "key": Constants.GoogleCalendarApiKey,
      "calendarId": "primary",
      "eventId": googleId,
     
    })
    .then(function(response) {
            that.deleteEvent(eventId);              
          },
          function(err) {
              that.deleteEvent(eventId);
              console.error("Execute error", err); 
      });
  }
  // google calendar section ends here//

  getAllUsers(){
    this.userService.getAllUsers().subscribe(resp => {
      this.users = resp.body;
    })
  }
  
  //TODO: filter by user id
  getAllEvents(initCal = true){
    this.showLoading = true;
      this.schedulingService.getAllEventsByUserId(this.userContext.userID).subscribe(resp => {
        this.allEvents = resp.body;
        this.eventsModel = [];
        this.allEvents.forEach(item => {
          this.eventsModel.push({
            title: item.title,
            description: item.description,
            start:  item.dateStart,
            end:  item.dateEnd,    
            id: item.id,
            userId: item.user.id,
            googleId: item.googleId,
            attended: item.attended
          })
        })
        this.showLoading = false;
        if(initCal == true){
          this.initializeCalendar();
          this.googleStart();
        }
        if(this.eventToRemove)
          this.eventToRemove.remove();
      }, err => {
        //loading....
      })
  }

  // calendar events section
  eventReceive(event: any){ 
    this.showLoading = true; 
    let eventPost: EventPostDto = {
      attended:0,
      //not always returned on login
      creatorEmail: "",
      dateEnd: event.event.end,
      dateStart: event.event.start,
      description: "",
      googleId: "",
      title: event.event.title,
      userId: event.event.extendedProps.userId
    }
    this.insertToGoogle(eventPost, this.checkIfPastEvent(event.event));
    // dragged from outside events are not removed on calendar refresh; need to manually remove them
    this.eventToRemove = event.event;
  }


  eventDrop(event: any){    
    this.showLoading = true;
    let eventPut: EventPutDto = {
      id: event.event.id,
      attended:event.event.extendedProps.attended,
      //not always returned on login
      creatorEmail: "",
      dateEnd: event.event.end,
      dateStart: event.event.start,
      description: "",
      googleId: event.event.extendedProps.googleId,
      title: event.event.title,
      userId: event.event.extendedProps.userId
    }
    this.updateToGoogle(eventPut);

    // console.log(event.oldEvent.start)
    // console.log(event.oldEvent.end)

  }

  eventResize(event: any){
    this.showLoading = true;
    let eventPut: EventPutDto = {
      id: event.event.id,
      attended:event.event.extendedProps.attended,
      //not always returned on login
      creatorEmail: "",
      dateEnd: event.event.end,
      dateStart: event.event.start,
      description: "",
      googleId: event.event.extendedProps.googleId,
      title: event.event.title,
      userId: event.event.extendedProps.userId
    }
    // do not change schedulers on resize
    this.updateToGoogle(eventPut, true);

  }

  eventClick(event: any){
    if(confirm("Are you sure you want to delete this event?")){
      this.showLoading = true;
      event.event.remove();
      this.deleteToGoogle(event.event.id, event.event.extendedProps.googleId)
    }      
  }

  // calendar events sectionn ends here

  // saving to db
  saveEvent(eventPost: EventPostDto, noScheduling = false) {
    this.schedulingService.createEvent(eventPost, noScheduling).subscribe(resp => {
      this.getAllEvents(false);
    })
  }

  deleteEvent(eventId: number){
    this.schedulingService.deleteEvent(eventId).subscribe(resp => {
      this.showLoading = false;
    })
  }

  updateEvent(eventPut: EventPutDto, noSchedulerChanges = false) {
    this.schedulingService.updateEvent(eventPut, noSchedulerChanges).subscribe(resp => {
      this.showLoading = false;
    })
  }

  checkIfPastEvent(event) {
    if(event.start)
      return (event.start.getTime() - new Date().getTime()) < 0 
    return true;   
    
  }

  //TODO: if edit event details will be developed
  checkIfDateStartChanged(event, oldEvent){
   
  }

}
