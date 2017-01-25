define(['require', 'jquery', 'underscore', 'backbone'], function(require, $, _, Backbone)
{
  
  /*====================================================================================================
    Bote API Plugin
    This plugin provides access to the Seegräbner-Bote web API

    ====================================================================================================*/
  +function ($, root) {
  
    'use strict'    
    
    var StoryApi = function() {

      //var YEAR_ZERO_MS = -62167222800000 // number of milliseconds between 01 January 1970 and year 0

      // CLASS DEFINITION
      // =================================
     
      /*History.prototype.init = function() {
        console.log("Initializing History")
        this.events = [{start:1}, {start:2}, {start:3}, {start:4}, {start:5}];
        this.filtered_events = [];
        return this;
      }
      
      History.prototype.find = function(type) {
        this.filtered_events = this.events;
        return this;
      }
      
      History.prototype.find.after = 12;
      
      History.prototype.after = function(date) {
        var that = this;
        this.filtered_events = _.filter(that.events, function(event){ return event.start > date; });
        return this;
      }*/
      
      
      // jQuery like class definition
      // link: http://stackoverflow.com/questions/4754560/help-understanding-jquerys-jquery-fn-init-why-is-init-in-fn
      // link: http://benmccormick.org/2015/06/08/how-jquery-works-an-introduction/
      
      /* Usage
          var events = History("events").between("1980", "2000-01-15");         // get all events between 1980 and 15ht Jan. 2000-01-15
          var flood = History("events").where({name:"flood"}).name("Flood");    // change name of flood Event to 'Flood'
          console.log("Flood eventId: " + flood.id);
          
          
          Selectors:
          '*'                     Selects all items (events, links, stories...)
          'item'                  Selects all matching items, e.g. 'events', 'links', 'stories'..
          '[name="value"]'        Selects all items with matching attribute, e.g. '[title="flood"]'
          
          
          Regex:
          Link: http://eloquentjavascript.net/09_regexp.html
          "30-01-2003 15:20 16-08-1982 12:10".match(/\d\d-\d\d-\d\d\d\d \d\d:\d\d/g) --> findet alle gültigen dd-mm-yyyy hh:mm Werte
          
          var dateTime = /(\d{1,2})-(\d{1,2})-(\d{4})/;
          var match = dateTime.exec("16-08-1982"); --> ["16-08-1982", "16", "08", "1982"]
          match[0] --> "16-08-1982"
          match[1] --> "16"
          match[2] --> "08"
          match[3] --> "1982"
      
      
      */
      var History = function(selector) {
        //console.log("History() called with " + selector);
        //console.log(arguments);
        //console.log("n Arguments: " + arguments.length);

        //return new History.prototype.init(arguments);
        //return new (Function.prototype.bind.apply(History.prototype.init, arguments));
        return new History.prototype.init(selector);
      };
      
      //History.test = "test";
      
      History.prototype = {
        constructor0: History,
        test: new Date(),
        
        print: function(str) {
          console.log(str);
        },
        
        events: [{start:new Date("1982-08-16"), title:"Rashid"}, {start:new Date("1983-07-08"), title:"Ana Teresa"}, {start:new Date("2012-10-05"), title:"Leonie"}, {start:new Date("2015-04-18"), title:"Marianne"}],
        
        init: function(selector) {
          //console.log("History.init() called with " + selector);
          //console.log(arguments);
          //console.log("n Arguments: " + arguments.length);
          
          // handle $(""), $(null), $(undefined), $(false)
          if ( !selector ) {
            console.log("empty selector");
            return this;
          }
          
          // handle '*' selectors with or without leading or trailing white spaces
          if (/(^\s*\*\s*$)/i.test(selector)) {
            console.log("* selector");
            return this
          }
          
          // handle 'item' selectors ('event', 'story', 'link'..)
          var item = /^\s*(event)|(story)|(link)\s*$/gi.exec(selector);
          //console.log(item);
          //console.log(selector);
          if (item) {
            console.log("item selector: " + item[0]);
            console.log(item);
            
            if (item[1]){
              console.log("all events");
              return this;
            }  
            
            if (item[2]){
                console.log("all stories");
                return this;
            }
            
            if (item[3]){
                console.log("all links");
                return this;
            }
          
            return this
          }
          
           
          

          /*if (selector) {
            return this.after(selector);
          }
          else {
            return this;
          }*/
          
          return this;
        },
        
        // select entries at exact date
        // possible arguments:
        //   Date("1980-12-3")        match to exact milliseconds
        //   {year:1980, month:12}    match to year and month only
        at: function(date) {
          // check if date is a Date object
          if (date instanceof Date) {
            var that = this;
            var time = date.getTime();
            console.log("Events at " + date + " (" + time + ")");
            this.events = _.filter(that.events, function(event){return event.start.getTime() == time;});
            return this;
          }
          
          // TBD
          var year = date.year;
          var month = date.month;
          var date = date.day;
          console.log("Events at year: " + year + ", month: " + month + ", day: " + day);
        },
        
        
        // select entries after date (date excluded)
        after: function(date) {
          var that = this;
          console.log("Events after " + date + " (" + date.getTime() + ")");
          this.events = _.filter(that.events, function(event){return event.start.getTime() > date.getTime();});
          return this;
        },
        
        // select entries before date (date excluded)
        before: function(date) {
          var that = this;
          console.log("Events before " + date + " (" + date.getTime() + ")");
          this.events = _.filter(that.events, function(event){return event.start.getTime() < date.getTime();});
          return this;
        },
        
        // select all entries between date1 and date2 (date1 and date2 excluded)
        between: function(date1, date2) {
          var that = this;
          console.log("Events between " + date1 + " and " + date2 + " (" + date1.getTime() + ", " + date2.getTime() + ")");
          this.events = _.filter(that.events, function(event){return (event.start.getTime() > date1.getTime()) && (event.start.getTime() < date2.getTime());});
          return this;
        },
        
        // select all entries during another event
        during: function(event) {
        
        },
        
        // set title of all selected entries
        title: function(title) {
          var that = this;
          _.each(that.events, function(event) {
            //console.log(event.title);
            event.title = title;
          })
        
        },
        
        // print all entries
        print: function() {
          var that = this;
          _.each(that.events, function(event) {
            console.log(event.title + ": " + event.start + " - " + event.end);
          });
        }
      };
      

      History.prototype.init.prototype = History.prototype;
      
      
      /*init.prototype.test = function(data) {
      
        console.log("Test " + data);
      };
      
      X.test = "X";*/
      
      window.History = History;
      

      


      
      // StoryDate class
      // used to define a single date or a range of dates
      var StoryDate = Backbone.Model.extend({
        conditions: [],
        initialize: function() {
          console.log("initializing StoryDate");
          console.warn("Entries from different StoryDate instances are shared somehow");
        },
        
        addEntry: function(entry) {
          entry = entry || {};

          // check if entry already exists
          
          // add entry
          this.conditions.push(entry);
          debugger;
          console.log(this.conditions);       
        },
        
        at: function (date) {
          this.addEntry({at:date});
        },
        
        before: function(date) {
          this.addEntry({before:date});
        },
        
        after: function(date) {
          this.addEntry({after:date});
        },
        
        during: function(date) {
          this.addEntry({during:date});
        }
      })
      
        
      // Extended date class
      var StoryEvent = Backbone.Model.extend({ 
        start: new StoryDate(),
        end: new StoryDate(),
  
        initialize: function() {
          console.log("Initializing StoryEvent")
        },
       
      })
           
      var year_zero = new Date("0000")
      var YEAR_ZERO_MS = year_zero.getTime()
      
      class MyDate extends Date {
        /*constructor(arg) {
          super(arg)
        }*/
        
  
        // set number of milliseconds since year 0
        setZeroTime(ms) {
          super.setTime(YEAR_ZERO_MS + ms)
        }
        
        // return number of milliseconds since year 0
        getZeroTime() {
          return super.getTime() - YEAR_ZERO_MS
        }

        
        getFormattedDate() {
          var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          return this.getDate() + "-" + months[this.getMonth()] + "-" + this.getFullYear();
        }
        
        getDate() {
          console.log("getDate()")
          return super.getDate()
        }
      }
      
      
      // set Date class definition globally
      //window.Date = MyDate
 
      // API definition
      var Api = Backbone.Model.extend({
        Event: StoryEvent,
        History: History
      })
      

      return new Api()
    }
    
    var old = $.fn.StoryApi
    $.fn.StoryApi             = StoryApi
    $.fn.StoryApi.Constructor = StoryApi


    // STORYAPI NO CONFLICT
    // =================
    $.fn.StoryApi.noConflict = function () {
      $.fn.StoryApi = old
      return this
    }
    
    // Attach to root (global)    
    root.storyApi = new StoryApi()

  }(jQuery, window)
  
  
  
  
  /*====================================================================================================
    IncidentEdit Plugin
    This plugin looks for <div class="IncidentEdit"..></div> elements in the DOM and creates an edit form
    
    Elements added after page and plugins have loaded must be initialized through JavaScript using
    $('.IncidentEdit').IncidentEdit()
    
    
    ====================================================================================================*/
  +function ($) {
  'use strict'
 
    // CLASS DEFINITION
    // =================================
    var IncidentEdit = function (element, options) {
      this.$el      = $(element)
      this.error = options.error
      this.init()
    }

    IncidentEdit.VERSION  = '1.0.0'    
    IncidentEdit.DEFAULTS = {
      error: false
    }
    
    IncidentEdit.prototype.init = function() {
      console.log("Initializing IncidentEdit")
      this.render()   
    }
    
    IncidentEdit.prototype.render = function() {
      var that = this
      require(["text!./bootstrap-story.html"], function(template) {
        var html = _.template(template)({plugin:'IncidentEdit'})
        that.$el.html(html)
      })
    }
    
    

  
    // PLUGIN DEFINITION
    // ==================================
    function Plugin(option, _relatedTarget) {
      return this.each(function () {
        var $this   = $(this)
        var data    = $this.data('bs.IncidentEdit')
        var options = $.extend({}, IncidentEdit.DEFAULTS, $this.data(), typeof option == 'object' && option)
        if (!data) $this.data('bs.IncidentEdit', (data = new IncidentEdit(this, options)))
        if (typeof option == 'string') data[option](_relatedTarget)
      })
    }

    var old = $.fn.IncidentEdit
    $.fn.IncidentEdit             = Plugin
    $.fn.IncidentEdit.Constructor = IncidentEdit


    // NO CONFLICT
    // ============================
    $.fn.IncidentEdit.noConflict = function () {
      $.fn.IncidentEdit = old
      return this
    }


    // DATA-API
    // =========================
    $(".IncidentEdit").IncidentEdit()

  }(jQuery)
  
  
})