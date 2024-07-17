var mainApp = {};

(function () {
    var firebase = app_firebase;
    var uid = null;
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            window.location.replace("/login");
        } else {
            var naam = user.displayName;
            dayjs.extend(window.dayjs_plugin_relativeTime)
            fetch('/api/live/today?ajk='+ (new Date().getMonth() + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear())
                .then((res) => {
                    return res.json()
                })
                .then((data) => {

if (data.Class.length < 1) {
    document.getElementById('tdlv').style.display = "none";
} else {
                    data.Class.forEach((element, idx ) => {
                        idx++
                        var now = new Date(element.stream);
                        now.setMinutes(now.getMinutes());
                         let streamtime = now.toISOString().slice(0, -1);
                        if (element.Status == "Live") {

                            document.getElementById('lives').innerHTML += `
                        
    <div class="col-lg-3 col-md-4 mt-2 text-center bangla">
    <div class="card">
    <a href="javascript:join('${element.Cycle}','${element.Batch}','${element.Subject}','${element.Paper}','${element.Chapter}','${element.Video_Id}','${user.uid}', 'im${idx}', '${naam}')">
    <img id="im${idx}" src="/assets/img/live-now.png">
    </a>
    <div><strong>${element.Video_Description}<br>${element.Instructor}</strong></div>
    <div class="card-description">
    ${element.Subject} (Paper ${element.Paper})<br>
    ${element.Chapter}<br>
    Class - ${element.Class}
    </div>
    <b class="text-center">NOW LIVE</b>
<div class="card-text">${new Date(streamtime).toLocaleString('en-In')}</div>
     </div>
</div>

    `;

                    } else if (element.Status == "Scheduled") {
                        if (dayjs().isBefore(dayjs(streamtime))) {
                            document.getElementById('lives').innerHTML += `
                        
                            <div class="col-lg-3 col-md-4 mt-2 text-center bangla">
                            <div class="card">
                            <img src="/assets/icons/upcoming.png">
                            <div><strong>${element.Video_Description}<br>${element.Instructor}</strong></div>
                            <div class="card-description">
                            ${element.Subject} (Paper ${element.Paper})<br>
                            ${element.Chapter}<br>
                            Class - ${element.Class}
                            </div>
                            <b> will start ${dayjs(streamtime).fromNow()}</b>
                        <div class="card-text">${new Date(streamtime).toLocaleString('en-In')}</div>
                             </div>
                        </div>
                        
                            `;
                          
                        } else {
                            document.getElementById('lives').innerHTML += `
                        
    <div class="col-lg-3 col-md-4 mt-2 text-center bangla">
    <div class="card">
    <a href="javascript:join('${element.Cycle}','${element.Batch}','${element.Subject}','${element.Paper}','${element.Chapter}','${element.Video_Id}','${user.uid}', 'im${idx}', '${naam}' )">
    <img id="im${idx}" src="/assets/img/live-now.png">
    </a>
    <div><strong>${element.Video_Description}<br>${element.Instructor}</strong></div>
    <div class="card-description">
    ${element.Subject} (Paper ${element.Paper})<br>
    ${element.Chapter}<br>
    Class - ${element.Class}
    </div>
    <b>Started ${dayjs(streamtime).fromNow()}</b>
<div class="card-text">${new Date(streamtime).toLocaleString('en-In')}</div>
     </div>
</div>

    `;
                        }
                      } else if (element.Status == "Ended") {
                        document.getElementById('tdlv').innerHTML = ` <h6><i class="fas fa-book"></i>Today's Class</h6>`;
        
                        document.getElementById('lives').innerHTML += `
                              
                              <div class="col-lg-3 col-md-4 mt-2 text-center bangla">
                              <div class="card">
                              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT96VP4luDXLaC_-yrZJJF1C5J6qeFxj14gcg&usqp=CAU">
                              <div><strong>${element.Video_Description}<br>${element.Instructor}</strong></div>
                              <div class="card-description">
                              ${element.Subject} (Paper ${element.Paper})<br>
                              ${element.Chapter}<br>
                              Class - ${element.Class}
                              </div>
                               </div>
                          </div>
                              `;
                    } else {
                        document.getElementById('tdlv').innerHTML = ` <h6><i class="fas fa-book"></i>Today's Class</h6>`;

                        if (element.Type == "freeyt" || element.Type == "premyt") {
                            document.getElementById('lives').innerHTML += `
                        
                        <div class="col-lg-3 col-md-4 mt-2 text-center bangla">
                        <div class="card">
                        <a class="btn" href="/${element.Batch}/${element.Cycle}/Paper-${element.Paper}/${element.Chapter}/Class-${element._id}">
                        <img src="https://i.ytimg.com/vi/${element.yt}/hqdefault.jpg">
                        </a>
                        <div><strong>${element.Video_Description}<br>${element.Instructor}</strong></div>
                        <div class="card-description">
                        ${element.Subject} (Paper ${element.Paper})<br>
                        ${element.Chapter}<br>
                        Class - ${element.Class}
                        </div>
                    <div class="card-text">${new Date(element.Uploaded).toLocaleString('en-In')}</div>
                         </div>
                    </div>
                    
                        `;
                        } else {
                          document.getElementById('tdlv').innerHTML = ` <h6><i class="fas fa-book"></i>Today's Class</h6>`;
                          document.getElementById('lives').innerHTML += `
                        
                          <div class="col-lg-3 col-md-4 mt-2 text-center bangla">
                          <div class="card">
                          <a class="btn" href="/${element.Batch}/${element.Cycle}/Paper-${element.Paper}/${element.Chapter}/Class-${element._id}">
                          <img src="${element.thumbnail_path}">
                          </a>
                          <div><strong>${element.Video_Description}<br>${element.Instructor}</strong></div>
                          <div class="card-description">
                          ${element.Subject} (Paper ${element.Paper})<br>
                          ${element.Chapter}<br>
                          Class - ${element.Class}
                          </div>
                      <div class="card-text">${new Date(element.Uploaded).toLocaleString('en-In')}</div>
                           </div>
                      </div>
                      
                          `;
                        }
                    }
                        
                    });
                       
}
                })
                .catch((err) => {
                    console.log(err.message)
                })
        }
    });
})()

$(function () {
    "use strict";
    $(window).on("load", function () {
        $(".loader").fadeOut();
        $("#preloader").delay(350).fadeOut("slow");
        $("body").delay(350).css({
            "overflow": "visible"
        });
        $(".all-container").css({
            "opacity": "1"
        });
    });
}(jQuery));





function join(Cycle, Batch, Subject, Paper, Chapter, Video_Id, uid, idx, naam) {
    document.getElementById(idx).src = "/assets/img/wait.jpg";
    let api = `/api/live/${Batch}/${Cycle}/${Subject}/Paper-${Paper}/${Chapter}/${Video_Id}?uid=${uid}`;
    fetch(api)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
          document.getElementById(idx).src="/assets/img/live-now.png";
            if (data.status === 200) {
                if (data.data.obj.live === true) {
                    swal({
                        title: 'The Class is live',
                        icon: "/assets/img/live.png",
                        button: "Okay, Join Class"
                    }).then(() => {
                        document.getElementById('cls').innerHTML = `
                        <nav class="navbar sticky-top navbar-light bg-transparent">
                        <button id="full" class="btn btn-secondary"><i class="fas fa-expand"></i></button>
                        <a class="btn btn-primary" href="javascript:ret()"><i class="fas fa-home"></i></a>
                        </div>
                      </nav>
                            <iframe id="iframe" src="${data.data.obj.url}" allowfullscreen allow="camera; microphone; fullscreen; speaker; display-capture" scrolling="no" overflow="hidden"></iframe>
                        `;
                        document.querySelector('body').style.backgroundColor = "#080f1e";
                        var iframe = document.getElementById('iframe');
                            
                        var button = document.getElementById('full');
                        button.addEventListener('click', fullscreen);
                        
                        function fullscreen() {
                            if (document.fullscreenEnabled || 
                              document.webkitFullscreenEnabled || 
                              document.mozFullScreenEnabled ||
                              document.msFullscreenEnabled) {
                              
                              if (iframe.requestFullscreen) {
                                iframe.requestFullscreen();
                              } else if (iframe.webkitRequestFullscreen) {
                                iframe.webkitRequestFullscreen();
                              } else if (iframe.mozRequestFullScreen) {
                                iframe.mozRequestFullScreen();
                              } else if (iframe.msRequestFullscreen) {
                                iframe.msRequestFullscreen();
                              }
                            }
                            else {
                              document.querySelector('#full').innerHTML = 'Full Screen is not supported';
                            }
                          }
                    })
                } else {
                    swal({
                        title: 'ক্লাসটি এখনো শুরু হয়নি।',
                        icon: "/assets/icons/upcoming.png",
                        text: "তুমি এখনি ক্লাসে প্রবেশ করে শিক্ষকের জন্য অপেক্ষা করতে পারো",
                        buttons: ["না, পরে প্রবেশ", "এখনি প্রবেশ"],
                        dangerMode: true
                    })
                        .then((yes) => {
                            if (yes) {
                                document.getElementById('cls').innerHTML = `
                                <nav class="navbar sticky-top navbar-light bg-transparent">
                                <button id="full" class="btn btn-secondary"><i class="fas fa-expand"></i></button>
                                <a class="btn btn-primary" href="javascript:ret()"><i class="fas fa-home"></i></a>
                                </div>
                              </nav>
                                    <iframe id="iframe" src="${data.data.obj.url}" allowfullscreen allow="camera; microphone; fullscreen; speaker; display-capture" scrolling="no" overflow="hidden"></iframe>
                                `;
document.querySelector('body').style.backgroundColor = "#080f1e";
var iframe = document.getElementById('iframe');
    
var button = document.getElementById('full');
button.addEventListener('click', fullscreen);

function fullscreen() {
    if (document.fullscreenEnabled || 
      document.webkitFullscreenEnabled || 
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled) {
      
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
    }
    else {
      document.querySelector('#full').innerHTML = 'Full Screen is not supported';
    }
  }

if (document.fullscreenEnabled || 
    document.webkitFullscreenEnabled || 
    document.mozFullScreenEnabled ||
    document.msFullscreenEnabled) {
    
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
      iframe.webkitRequestFullscreen();
    } else if (iframe.mozRequestFullScreen) {
      iframe.mozRequestFullScreen();
    } else if (iframe.msRequestFullscreen) {
      iframe.msRequestFullscreen();
    }
  }
  else {
    document.querySelector('#full').innerHTML = 'Full Screen is not supported';
  }
                            }
                        })
                }
            } else {
                swal({
                    title: "Hello "+ naam + " 🥰",
                    icon: "info",
                    text: "You have to Enroll to the "+ Cycle +" first !",
                    button: "Okay"
                })
                .then(()=>{
                    return window.open(data.data,'_blank');
                })
            }
        })
        .catch((err) => {
            swal({
                title: err.message,
                icon: "error",
                text: "Please Try Again Later",
                button: "Okay"
            })
        })
}



function ret() {
  swal({
      title: "তুমি কি ক্লাস থেকে বের হবে?",
      icon: "https://10minuteschool.com/assets/images/online-coaching/leave-class.svg",
      text: "শেখার ধারাবাহিকতা বজায় রাখতে তোমার ক্লাসটি লাইভে করা খুবই প্রয়োজন",
      buttons: ["না, ক্লাস করবো","বের হব"],
      dangerMode: true
  })
  .then((yes)=>{
      if (yes) {
         return location.reload()
      } else {
          if (document.fullscreenEnabled || 
              document.webkitFullscreenEnabled || 
              document.mozFullScreenEnabled ||
              document.msFullscreenEnabled) {
              
              if (iframe.requestFullscreen) {
                iframe.requestFullscreen();
              } else if (iframe.webkitRequestFullscreen) {
                iframe.webkitRequestFullscreen();
              } else if (iframe.mozRequestFullScreen) {
                iframe.mozRequestFullScreen();
              } else if (iframe.msRequestFullscreen) {
                iframe.msRequestFullscreen();
              }
            }
            else {
              document.querySelector('#full').innerHTML = 'Full Screen is not supported';
            }
      }
  })
}



window.addEventListener('message', (e) => {
if (e.data.is_live == false) {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  }
  ask(e.data.room_id)
}
});

function ask(cl) {
let wrap = document.createElement('div');
wrap.setAttribute('class', 'text-muted');
wrap.innerHTML = `
<div class="wrap-input100">
<div class="center">
    <div class="stars">
        <input type="radio" id="five" name="rating" value="5" onclick="reply('${5}','${cl}')" required>
        <label for="five" class="fas fa-star"></label>
        <input type="radio" id="four" name="rating" value="4" onclick="reply('${4}','${cl}')" required>
        <label for="four" class="fas fa-star"></label>
        <input type="radio" id="three" name="rating" value="3" onclick="reply('${3}','${cl}')" required>
        <label for="three" class="fas fa-star"></label>
        <input type="radio" id="two" name="rating" value="2" onclick="reply('${2}','${cl}')" required>
        <label for="two" class="fas fa-star"></label>
        <input type="radio" id="one" name="rating" value="1" onclick="reply('${1}','${cl}')" required>
        <label for="one" class="fas fa-star"></label>
        <span class="result"></span>
    </div>
</div>
<span class="focus-input100"></span>
</div>

`

swal({
  title: "The Class has Ended",
  text: "How was the technical experience?",
  icon: "https://10minuteschool.com/assets/images/online-coaching/leave-class.svg",
  className: '',
  closeOnClickOutside: false,
  content: {
    element: wrap
  },
  button: "Exit",
  dangerMode: true,
})
.then(()=>{
  return location.reload()
})
}

function reply(feel,cls){
swal.setActionValue(feel);
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "Video_Id": cls.split('::')[1],
  "newRating": feel
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
fetch('/api/rating', requestOptions)
.then((res)=>{
  return res.json()
})
.then((data)=>{
  if (data.status == 200) {
    return location.reload()
  }
})
                                                                                                                                                                                    }
