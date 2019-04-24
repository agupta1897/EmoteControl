import { Component, OnInit } from '@angular/core';
import myClass from './../../myClass';
import eegLoad from './../../eegLoad';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  ngOnInit(){
    let x = new myClass();
    
        console.log( x.hello("World"))
    
      }
    
      ngAfterViewInit(){
        let eeg = new eegLoad();
        this.poll(eeg);
        document.getElementById("connect").onclick = function(){ eeg.connect();};
      }
      
      
      title = 'emoteControl';
    
    
      poll: Function = function(x){
        setInterval(function(){
            document.getElementById('alpha').innerText = x.getAlpha();
            document.getElementById('beta').innerText = x.getBeta();
            document.getElementById('delta').innerText = x.getDelta();
            document.getElementById('theta').innerText = x.getTheta();
            document.getElementById('gamma').innerText = x.getGamma();
            document.getElementById('eng').innerText = x.getEngagement();
        }, 500);
    
    }
}
