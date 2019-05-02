import { Component, OnInit } from '@angular/core';
import myClass from './../myClass';
import eegLoad from './../eegLoad';
import { FormControl, Validators } from '@angular/forms';
import { HttpBackend } from '@angular/common/http';
import * as Plotly from 'plotly.js/dist/plotly.js';
import { Config, Data, Layout } from 'plotly.js/dist/plotly.js';

declare var jquery: any;
declare var $: any;


export interface task {
  emotion: string;
  action: string;
  intensity: string;
  val: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  alpha: Array<number> = [];
  beta: Array<number> = [];
  gamma: Array<number> = [];
  //  delta: Array<number> = [];
  theta: Array<number> = [];
  time: Array<Date> = [];
  pos: number = 0;
  check: number = 0;
  selectedEmotion: string = "";
  selectedAction: string = "";
  selectedIntensity: string = "";
  smsNumber: string = "2054352352";
  smsText: string = "I am very angry please help!";
  
  actionEnabled: boolean;

  tasks: task[] = [
    { emotion: 'Angry', action: 'Text', intensity: 'High', val: '3' },
    { emotion: 'Distracted', action: 'Notify', intensity: 'Low', val: '7' }
  ]

  ngOnInit() {
    let x = new myClass();
   
  }

  ngAfterViewInit() {
    let eeg = new eegLoad();
    this.poll(eeg);
    document.getElementById("btnConnectToMuse").onclick = function () {
      eeg.connect();
      document.getElementById("btnConnectToMuse").style.display = 'none';
      document.getElementById("btnStartDriving").style.display = 'inline';
      var a = <HTMLAnchorElement>document.getElementById('linkSMS');
      a.href = "sms://+" + ref.smsNumber + "?body=" + ref.smsText;

    }


    var ref = this;
    document.getElementById("btnSave").onclick = function () {

      if (ref.selectedAction.length == 0 || ref.selectedIntensity.length == 0 || ref.selectedEmotion.length == 0) {
        window.alert("Please Fill All Trigger Details!");
      } else {
        var val1 = ref.findIdForTask(ref.selectedEmotion, ref.selectedIntensity)
        var x: task = { emotion: ref.selectedEmotion, action: ref.selectedAction, intensity: ref.selectedIntensity, val: val1.toString() };
        ref.tasks.push(x);
      }
    }

    var ref = this;
    document.getElementById("btnStartDriving").onclick = function () {
      ref.check = 1;
      document.getElementById("btnStartDriving").style.display = 'none';
      ref.hideAllImages();
      document.getElementById("divAnger1").style.display = 'inline';
      document.getElementById("divValues").style.display = 'block';
      document.getElementById("divBarGraphs").style.display = 'inline';
      document.getElementById("divState").style.display = 'inline';
      // document.getElementById("btnStopDriving").style.display = 'inline';

      document.getElementById("emote-panel").style.display = 'inline';



    }

    document.getElementById("btnMakeMusicPlay").onclick = function () {
      var audio = <HTMLVideoElement>document.getElementById("audio");
      audio.play();
    }

    document.getElementById("btnMakeSMS").onclick = function () {
      var a = <HTMLAnchorElement>document.getElementById('linkSMS');
      a.href = "sms://+" + ref.smsNumber + "?body=" + ref.smsText;
    }


    document.getElementById("btnStopDriving").onclick = function () {

      document.getElementById("divMainPage").style.display = 'none';
      document.getElementById("divResultsPage").style.display = 'inline';

      //Plotting --------------------------------------------------------------------------------------------------------------
      var trace1 = {
        type: "scatter",
        mode: "lines",
        name: 'Alpha',
        x: ref.time,
        y: ref.alpha,
        line: { color: '#17BECF' }
      }

      var trace2 = {
        type: "scatter",
        mode: "lines",
        name: 'Beta',
        x: ref.time,
        y: ref.beta,
        line: { color: '#7F7F7F' }
      }

      var trace3 = {
        type: "scatter",
        mode: "lines",
        name: 'Theta',
        x: ref.time,
        y: ref.theta,
        line: { color: '#000000' }
      }

      var data = [trace1, trace2, trace3];

      var layout = {
        title: 'EEG during last drive',
        xaxis: {
          autorange: true,
          range: [ref.time[0], ref.time[ref.time.length - 1]],
          rangeselector: {
            buttons: [
              {
                count: 1,
                label: '1s',
                step: 'second',
                stepmode: 'backward'
              },
              {
                count: 6,
                label: '6s',
                step: 'second',
                stepmode: 'backward'
              },
              { step: 'all' }
            ]
          },
          rangeslider: { range: [ref.time[0], ref.time[ref.time.length]] },
          type: 'date'
        },
        yaxis: {
          autorange: true,
          range: [0, 1],
          type: 'linear'
        }
      };

      Plotly.newPlot('graphpanel', data, layout);
      //------------------------------------------------------------------------------------------------------------------

    }

    document.getElementById("btnRestratDriving").onclick = function () {
      document.getElementById("divResultsPage").style.display = 'none';
      document.getElementById("divMainPage").style.display = 'inline';

    }
  }


  title = 'emoteControl';
  poll: Function = function (x) {
    var ref = this;
    setInterval(function () {
      var vals = [x.getAlpha(), x.getBeta(), x.getGamma(), x.getTheta(), x.getAnger(), x.getMellow(), x.getDistracted()];
      var sum = vals[0] + vals[2] + vals[1] + vals[3];

      document.getElementById('alphaVal').innerText = " " + Number((vals[0]).toFixed(3)).toString();
      document.getElementById('betaVal').innerText = " " + Number((vals[1]).toFixed(3)).toString();
      document.getElementById('gammaVal').innerText = " " + Number((vals[2]).toFixed(3)).toString();
      document.getElementById('thetaVal').innerText = " " + Number((vals[3]).toFixed(3)).toString();
      document.getElementById('angerVal').innerText = " " + Number((vals[4]).toFixed(3)).toString();
      document.getElementById('mellowVal').innerText = " " + Number(vals[5].toFixed(3)).toString();
      document.getElementById('distractedVal').innerText = " " + Number(vals[6].toFixed(3)).toString();

      if (sum == 0) sum = 1;
      document.getElementById('alpha').style.height = (vals[0] * 100 / sum + '%').toString();
      document.getElementById('beta').style.height = (vals[1] * 100 / sum + '%').toString();
      document.getElementById('gamma').style.height = (vals[2] * 100 / sum + '%').toString();
      document.getElementById('theta').style.height = (vals[3] * 100 / sum + '%').toString();


      document.getElementById('anger').style.height = (vals[4] + '%').toString();
      document.getElementById('mellow').style.height = (vals[5] + '%').toString();
      document.getElementById('distracted').style.height = (vals[6] + '%').toString();

      let y = x.getState();
      let z = ref.getTaskForId(y);
      document.getElementById('stateVal').innerText = z;
    

      document.getElementById("divAnger1").style.display = 'none';
      document.getElementById("divAnger2").style.display = 'none';
      document.getElementById("divAnger3").style.display = 'none';

      document.getElementById("divMellow1").style.display = 'none';
      document.getElementById("divMellow2").style.display = 'none';
      document.getElementById("divMellow3").style.display = 'none';

      document.getElementById("divDis1").style.display = 'none';
      document.getElementById("divDis2").style.display = 'none';
      document.getElementById("divDis3").style.display = 'none';

      document.getElementById("divnotSure").style.display = 'none';

      //  this.hideAllImages();
      if (ref.check == 1) {
        if (y == 1) {
          document.getElementById("divAnger1").style.display = 'inline';
        }
        else
          if (y == 2) {
            document.getElementById("divAnger2").style.display = 'inline';

          }
          else if (y == 3) {
            document.getElementById("divAnger3").style.display = 'inline';

          }
          else if (y == 4) {
            document.getElementById("divMellow1").style.display = 'inline';

          }
          else if (y == 5) {
            document.getElementById("divMellow2").style.display = 'inline';

          }
          else if (y == 6) {
            document.getElementById("divMellow3").style.display = 'inline';

          }
          else if (y == 7) {
            document.getElementById("divDis1").style.display = 'inline';

          }
          else if (y == 8) {
            document.getElementById("divDis2").style.display = 'inline';

          }
          else if (y == 9) {
            document.getElementById("divDis3").style.display = 'inline';

          }
          else {
            document.getElementById("divnotSure").style.display = 'inline';
          }

        if (ref.actionEnabled) {

          ref.trigger(y.toString());
        }
      }


    }, 50);
    setInterval(function () {
      var vals = [x.getAlpha(), x.getBeta(), x.getGamma(), x.getTheta()];
      var sum = vals[0] + vals[2] + vals[1] + vals[3];

      ref.alpha.push(vals[0] / sum);
      ref.beta.push(vals[1] / sum);
      ref.gamma.push(vals[2] / sum);
      ref.theta.push(vals[3] / sum);
      var now = new Date();
      ref.time.push(now.getTime());
    }, 100);

    setInterval(function () {
      if (ref.pos == 100) ref = 0;
      else
        ref.pos++;
      var y = ref.pos % 10;
      var t = ref.pos = y;
      //    ref.http('https://w29u4cs985.execute-api.us-east-1.amazonaws.com/prod/data?x1='+t.toString()+'&x2='+y.toString()+'&x3=1',function(e){var x=JSON.parse(e); ref.displayOtherDriverImage(x['Item']['cog']);});
      //    ref.http('https://w29u4cs985.execute-api.us-east-1.amazonaws.com/prod/getstate?x1='+t.toString()+'&x2='+y.toString()+'&x3='+x.getState(),function(e){});
    }, 5000);

  }

  hideAllImages: Function = function () {
    document.getElementById("divAnger1").style.display = 'none';
    document.getElementById("divAnger2").style.display = 'none';
    document.getElementById("divAnger3").style.display = 'none';

    document.getElementById("divMellow1").style.display = 'none';
    document.getElementById("divMellow2").style.display = 'none';
    document.getElementById("divMellow3").style.display = 'none';

    document.getElementById("divDis1").style.display = 'none';
    document.getElementById("divDis2").style.display = 'none';
    document.getElementById("divDis3").style.display = 'none';

    document.getElementById("divnotSure").style.display = 'none';
  }


  triggerMusic: Function = function () {
    var audio = <HTMLVideoElement>document.getElementById("audio");
    audio.play();
    this.actionEnabled = false;

  }

  triggerSMS: Function = function () {
    var a = <HTMLAnchorElement>document.getElementById('linkSMS');
    a.href = "sms://+" + this.smsNumber + "?body=" + this.smsText;
    a.click();
    this.actionEnabled = false;
  }

  triggerNotification: Function = function () {
    window.alert("Emotion Trigger Alert: " + this.smsText);
    this.actionEnabled = false;

  }

  triggerCall: Function = function () {
    var a = <HTMLAnchorElement>document.getElementById('linkCall');
    a.href = "tel://+" + this.smsNumber;
    a.click();
    this.actionEnabled = false;

  }


  trigger: Function = function (x: string) {
    this.tasks.forEach(element => {
      if (element.val == x) {
        if (element.action == "Text") {
          this.triggerSMS();
        }
        else if (element.action == "Call") {
          this.triggerCall();
        }
        else if (element.action == "Notify") {
          this.triggerNotification();
        }
        else {
          this.triggerMusic();
        }
      }
    });
  }




  findIdForTask: Function = function (emotion: string, intensity: string) {
    if (emotion == "Angry") {
      if (intensity == "Low") {
        return 1
      }
      else if (intensity == "Medium") {
        return 2
      }
      else {
        return 3
      }
    }
    else
      if (emotion == "Distracted") {
        if (intensity == "Low") {
          return 4
        }
        else if (intensity == "Medium") {
          return 5
        }
        else {
          return 6
        }
      }
      else {
        if (intensity == "Low") {
          return 7
        }
        else if (intensity == "Medium") {
          return 8
        }
        else {
          return 9
        }
      }
  }


  getTaskForId: Function = function (x: string) {
    if (x == '1') {
      return "Angry - Low"
    }
    else if (x == '2') {
      return "Angry - Medium"
    }
    else if (x == '3') {
      return "Angry - High"
    }

    else if (x == '4') {
      return "Mellow - Low"
    }

    else if (x == '5') {
      return "Mellow - Medium "
    }
    else if (x == '6') {
      return "Mellow - High "
    }
    else if (x == '7') {
      return "Distracted - Low"
    }
    else if (x == '8') {
      return "Distracted - Medium"
    }
    else if (x == '9') {
      return "Distracted - High"
    }
    else if (x == '0') {
      return "No Solid Detection"
    }

  }

  displayOtherDriverImage: Function = function (x: number) {
   

    if (x == 1) {
      document.getElementById('divOtherDriversDataImg').innerHTML = '<img class="keyImg" style="width: 125px; height: 125px;" src="../assets/Happy.png">'
    }
    else
      if (x == 2) {
        document.getElementById('divOtherDriversDataImg').innerHTML = '<img class="keyImg" style="width: 125px; height: 125px;" src="../assets/sick-face.png">'
      }
      else {
        document.getElementById('divOtherDriversDataImg').innerHTML = '<img class="keyImg" style="width: 125px; height: 125px;" src="../assets/neutral-face.png">'
      }
  }

  http: Function = function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
  }

}







