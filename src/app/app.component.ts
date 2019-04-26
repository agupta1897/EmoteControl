import { Component, OnInit } from '@angular/core';
import myClass from './../myClass';
import eegLoad from './../eegLoad';
import {FormControl, Validators} from '@angular/forms';
import { HttpBackend } from '@angular/common/http';
import * as Plotly from 'plotly.js/dist/plotly.js';
import {Config, Data, Layout} from 'plotly.js/dist/plotly.js';

declare var jquery: any;
declare var $: any;


export interface task {
  emotion: string;
  action: string;
  intensity: string;
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
      selectedAction: string ="";
      selectedIntensity:string="";
      smsNumber:string="2054352352";
      smsText:string= "I am very angry please help!"

  tasks:task[] = [
    {emotion: 'Angry', action: 'Text', intensity: 'High'},
    {emotion: 'Distracted', action: 'Notify', intensity: 'Low'}
  ]
  
      ngOnInit(){
      let x = new myClass();
        console.log( x.hello("World"))     
      }
    
      ngAfterViewInit(){
        let eeg = new eegLoad();
        this.poll(eeg);
        document.getElementById("btnConnectToMuse").onclick = function(){ eeg.connect();
         document.getElementById("btnConnectToMuse").style.display = 'none';
         document.getElementById("btnStartDriving").style.display = 'inline';
         console.log("Hello123 " + ref.selectedEmotion);
         console.log(ref.smsNumber);
         var a = <HTMLAnchorElement> document.getElementById('linkSMS'); 
         a.href = "sms://+" + ref.smsNumber + "?body=" + ref.smsText;

      }
      document.getElementById("btnSave").onclick = function(){
        var x: task = { emotion: ref.selectedEmotion , action: ref.selectedAction, intensity: ref.selectedIntensity };
        ref.tasks.push(x);
      }

      var ref = this;
      document.getElementById("btnStartDriving").onclick = function () {  
        ref.check = 1;
        document.getElementById("btnStartDriving").style.display = 'none';  
        ref.hideAllImages();
        document.getElementById("divImgHappy").style.display = 'inline';
        document.getElementById("btnStopDriving").style.display = 'inline';
        document.getElementById("data-panel").style.display = 'inline';
        document.getElementById("others-panel").style.display = 'inline';
        document.getElementById("others-panel").style.display = 'inline';
        document.getElementById("emote-panel").style.display = 'inline';


        document.getElementById("wavedata-panel").style.display = 'block'; //Dont change

      }   

      document.getElementById("btnMakeMusicPlay").onclick = function () {  
        var audio = <HTMLVideoElement> document.getElementById("audio");
        audio.play();
      }

      document.getElementById("btnMakeSMS").onclick = function () {  
        var a = <HTMLAnchorElement> document.getElementById('linkSMS'); 
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
          line: {color: '#17BECF'}
        }
        
        var trace2 = {
          type: "scatter",
          mode: "lines",
          name: 'Beta',
          x: ref.time,
          y: ref.beta,
          line: {color: '#7F7F7F'}
        }

        var trace3 = {
          type: "scatter",
          mode: "lines",
          name: 'Theta',
          x: ref.time,
          y: ref.theta,
          line: {color: '#000000'}
        }
        
        var data = [trace1,trace2,trace3];
        
        var layout = {
          title: 'EEG during last drive',
          xaxis: {
            autorange: true,
            range: [ref.time[0], ref.time[ref.time.length-1]],
            rangeselector: {buttons: [
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
                {step: 'all'}
              ]},
            rangeslider: {range: [ref.time[0], ref.time[ref.time.length]]},
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

      document.getElementById("btnRestratDriving").onclick = function (){
        document.getElementById("divResultsPage").style.display = 'none';
        document.getElementById("divMainPage").style.display = 'inline';

      }


    }
    
      
      title = 'emoteControl';
      poll: Function = function(x){
        var ref = this;
        setInterval(function(){
            var vals = [x.getAlpha(),x.getBeta(), x.getGamma(), x.getTheta()];
            var sum = vals[0]+vals[2]+vals[1]+vals[3];
            document.getElementById('alphaVal').innerText =  " " + Number((vals[0]).toFixed(3)).toString();
            document.getElementById('betaVal').innerText =  " " + Number((vals[1]).toFixed(3)).toString();
            document.getElementById('gammaVal').innerText =  " " + Number((vals[2]).toFixed(3)).toString();
            document.getElementById('thetaVal').innerText =  " " + Number((vals[3]).toFixed(3)).toString();

            
            if(sum == 0) sum =1;
            document.getElementById('alpha').style.height = (vals[0]*100/sum +'%').toString();
            document.getElementById('beta').style.height = (vals[1]*100/sum +'%').toString();
            document.getElementById('gamma').style.height = (vals[2]*100/sum +'%').toString();
            document.getElementById('theta').style.height = (vals[3]*100/sum +'%').toString();



             let y  = x.getState();
             document.getElementById("divImgHappy").style.display = 'none';
             document.getElementById("divImgSick").style.display = 'none';
             document.getElementById("divImgNeutral").style.display = 'none';
            //  this.hideAllImages();
            if (y == 3 && ref.check == 1)
            {

              document.getElementById("divImgSick").style.display = 'inline';
            }
            else
            if(y==2 && ref.check == 1 )
            {
              document.getElementById("divImgNeutral").style.display = 'inline';

            }
            else if (y== 1 && ref.check == 1  )
            {
              document.getElementById("divImgHappy").style.display = 'inline';

            }

        }, 50);
        setInterval(function(){
            var vals = [x.getAlpha(),x.getBeta(), x.getGamma(), x.getTheta()];
            var sum = vals[0]+vals[2]+vals[1]+vals[3];
          
          ref.alpha.push(vals[0]/sum);
          ref.beta.push(vals[1]/sum);
          ref.gamma.push(vals[2]/sum);
          ref.theta.push(vals[3]/sum);
          var now = new Date();
          ref.time.push(now.getTime());
        },100);

        setInterval(function(){
          if(ref.pos==100) ref = 0;
          else
          ref.pos++;
          var y = ref.pos % 10;
          var t = ref.pos = y;
          ref.http('https://w29u4cs985.execute-api.us-east-1.amazonaws.com/prod/data?x1='+t.toString()+'&x2='+y.toString()+'&x3=1',function(e){var x=JSON.parse(e); ref.displayOtherDriverImage(x['Item']['cog']);});
          ref.http('https://w29u4cs985.execute-api.us-east-1.amazonaws.com/prod/getstate?x1='+t.toString()+'&x2='+y.toString()+'&x3='+x.getState(),function(e){});
        },5000);

      }

        hideAllImages: Function = function () {
          document.getElementById("divImgHappy").style.display = 'none';
          document.getElementById("divImgSick").style.display = 'none';
          document.getElementById("divImgNeutral").style.display = 'none';
        }

        displayOtherDriverImage: Function = function(x : number) {
          
          if(x == 1)
          {
            document.getElementById('divOtherDriversDataImg').innerHTML = '<img class="keyImg" style="width: 125px; height: 125px;" src="../assets/Happy.png">'
          }
          else
          if(x == 2)
          {
            document.getElementById('divOtherDriversDataImg').innerHTML = '<img class="keyImg" style="width: 125px; height: 125px;" src="../assets/sick-face.png">'
          }
          else
          {
            document.getElementById('divOtherDriversDataImg').innerHTML = '<img class="keyImg" style="width: 125px; height: 125px;" src="../assets/neutral-face.png">'

          }
        }

        http: Function = function httpGetAsync(theUrl, callback)
        {
          var xmlHttp = new XMLHttpRequest();
          xmlHttp.onreadystatechange = function() { 
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
        }
    
    }



 



