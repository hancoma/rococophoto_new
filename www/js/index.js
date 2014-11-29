/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var link;
 var link_home;
  var historyUrl = new Array(); // history를 저장할 배열, push와 pop을 이용 스택처럼 활용
  var handle;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
         
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

    },
  
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    

        var uuid=device.uuid;
    


        
if (historyUrl.length >= 1) 
{
var link_home= historyUrl.pop(); // 이번 pop이 기존 url이다.
} else{

         var link_home='http://m.rococophoto.net/?uuid='+uuid;
}
if (link_home) {

} else {
    var link_home='http://m.rococophoto.net/';
}

 navigator.notification.activityStart("RococoPhoto", "loading");
var ref = window.open(encodeURI(link_home), '_blank', 'location=no, clearcache=yes');
ref.addEventListener('loadstart', function(event) { 
        

   // 링크 주소 확인
   var uuid = device.uuid;
        link=event.url;

        // 변수에 주소 넣기 
          historyUrl.push(link);
        var result=link.indexOf('upload_file');
       
        // 파일 업로드 
        if(result>-1) {
            getImage();
        }


    
    });
    ref.addEventListener('loadstop', function(event) { 
        navigator.notification.activityStop();
        
    
    });
    ref.addEventListener('exit',function(event) {
             for(x=0 ; x<30000 ; x++) {
               
            }
         historyUrl.pop(); // 뒤로 갈 주소를 만들어 낸다. 
          if (historyUrl.length<=0) {

             if (confirm('프로그램을 종료하시겠습니까?')) {
        navigator.app.exitApp();
    }


         }

                    app.receivedEvent('deviceready');
       
    })







    }
};


function getImage() {

        // Retrieve image file location from specified source
        navigator.camera.getPicture(uploadPhoto, function(message) {
alert('get picture failed');
},{
quality: 50,
destinationType: navigator.camera.DestinationType.FILE_URI,
sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
});}
    function uploadPhoto(imageURI) {
    
        var options = new FileUploadOptions();
        options.fileKey="profile_image";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";
 var uuid = device.uuid;
        var params = new Object();
        params.value1 = "test";
        params.value2 = "param";
        params.uuid = uuid;
        params.link=link;
        

        options.params = params;
        options.chunkedMode = false;
   
        var ft = new FileTransfer();
        navigator.notification.activityStart("RococoPhoto", "Uploading...");
        ft.upload(imageURI, "http://m.rococophoto.net/upload.php", win, fail, options);
    }

    function win(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
   
        navigator.notification.activityStop();
    }

    function fail(error) {
        navigator.notification.activityStop();

    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}

