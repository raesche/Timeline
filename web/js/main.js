require(["jquery", "bootstrap", "backbone", "story", "main"], function($, Bootstrap, Backbone, Story, Main) {

  // Define routes, create router
  var Router = Backbone.Router.extend({
    routes: {
        "(/)": "main",
        "#": "main",
        "home(/)": "main",
        "order/:id(/)":   "orderView",
        "order/:id/confirm(/)(:hash)":   "orderConfirm",
        "publication(/)(:rubricId)(/)(:fileId)": "publicationView",
        "advert(/)(:formatId)(/)(:fileId)": "advertView",
        "admin(/:path)(/:id)(/)": "adminView",
        "subscribe":   "subscribe",
        "publish":     "publish",
        "advert":      "advert",
        "contact":     "contact",
        "order(/)(:id)":       "order",
        "advert/:fileId/:formatId":   "order",
    },
  
    main: function() {
      openPage('#mainPage')
    },
    
    orderView: function(id) {
      $("#OrderDiv").Order("read", {id:id})
      openPage('#orderPage')
    },
    
    orderConfirm: function(id, hash) {
      $(".Order").Order("confirm", {id:id, hash:hash})
      openPage('#orderPage')
    },
    
    publicationView: function(rubricId, fileId) {
      $('.Publication').Publication("setRubric", rubricId)
      openPage('#publicationPage')              
    },
    
    advertView: function(formatId, fileId) {
      $('.Advert').Advert("setFormat", formatId)
      openPage('#advertPage')              
    },
    
    adminView: function() {
      var filter = {}
      if (arguments[0] == "orders") {
        filter = {orders:arguments[1]}
      }
      $('.Admin').Admin("filter", filter)
      openPage('#adminPage')  
    },
  })

  var router = new Router()
  Backbone.history.start()

  // show the requested page, hide all other
  // remember and restore scroll positions when switching pages
  function openPage(page) {
    $('.page.active').data('scrollTop', $(document).scrollTop()).removeClass('active')
    $(page).addClass('active')
    var pos = $(page).data('scrollTop')
    $(document).scrollTop(pos || 0)
  }

  // avoid redirection when contact form is submitted
  $('#contactForm').submit(function() {
    $.ajax({
      url:'./api/contact',
      type:'post',
      data:$(this).serialize(),
      success:function(){
          $('#contactSucessModal').modal('show')
      },  
    });   
    return false;
  })

  // hide menu bar when not used
  // show menu when user scrolls
  /*var timeout                    
  var scrollHandler = _.throttle(function(){
    if (timeout) {
      clearTimeout(timeout)
    }
    $("nav").slideDown()
    timeout = setTimeout(function() {
      if ($(document).scrollTop() > 100) {
        $("nav").slideUp()
      }
    }, 2000)
  }, 1000)          
  $(window).scroll(scrollHandler)*/
         
})

  