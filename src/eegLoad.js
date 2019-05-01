

export default class eegLoad {
    
    
    constructor(){
        this.bufferSize = 2000;
        this.weight = 0.9;
        this.weight2 = 0.95;
        this.weight3 = 0.99;
        this.buffer = [];
        this.alpha = 0;
        this.beta = 0;
        this.theta = 0;
        this.gamma = 0;
        this.delta = 0;
        this.engagement = 0.15;
        this.eng2 = 0.15;
        this.eng3 = 0.15; 
        this.battery = 0;
        this.temperature = 0;
        let ref = this;
        this.bciDevice = new BCIDevice(
            (sample) => {
            // This is here to only read data from AF7
            //console.log(sample.electrode);
                if (sample.electrode !== ScalpElectrodes.AF7) return;
        
            // Add to the buffer
                sample.data.forEach(el => {
                    if (ref.buffer.length > ref.bufferSize) ref.buffer.shift();
                    ref.buffer.push(el);
                });
                if (ref.buffer.length < ref.bufferSize) return;
                let psd = bci.psd(ref.buffer);
                let alpha = bci.psdBandPower(psd, sample.sampleRate, 'alpha');
                let beta = bci.psdBandPower(psd, sample.sampleRate, 'beta');
                let gamma = bci.psdBandPower(psd, sample.sampleRate, 'gamma');
                let delta = bci.psdBandPower(psd, sample.sampleRate, 'delta');
                let theta = bci.psdBandPower(psd, sample.sampleRate, 'theta');
                let sum = alpha + beta + gamma + delta  + theta;

                let wavg = (original, next) => original * ref.weight + (next || 0) * (1 - ref.weight);
                let wavg2 = (original,next,w) => original * w + (next || 0) *(1-w);
                let wa = alpha/sum;
                let wb = beta/sum;
                let wg = gamma/sum;
                let wd = delta/sum;
                let wt = theta/sum;
                let eng = beta/(alpha+theta);

                ref.alpha = wavg(ref.alpha,wa);
                ref.beta = wavg(ref.beta,wb);
                ref.gamma = wavg(ref.gamma,wg);
                ref.delta = wavg(ref.delta,wd);
                ref.theta = wavg(ref.theta,wt);
                ref.engagement = wavg(ref.engagement,eng);
                ref.eng2 = wavg2(ref.eng3,wa,ref.weight2);
                ref.eng3 = wavg2(ref.eng3,wa,ref.weight3);
            },

            (status) => {
                ref.battery = status.batteryLevel;
                ref.temperature = status.temperature;
            }   
        );

        
    }

    connect(){
        this.bciDevice.connect();
    }

    setBufferSize(x){
        this.bufferSize = x;
    }
    setWeight(x){
        this.weight = x;
    }

    getAlpha(){
        return this.alpha;
    }
    getBeta(){
        return this.beta;
    }
    getTheta(){
        return this.theta;
    }
    getGamma(){
        return this.gamma;
    }
    getDelta(){
        return this.delta
    }
    getEngagement(){
        return this.engagement;
    }
    getAnger(){
	return this.beta + (1-this.theta);
    }
    getDistracted(){
	return this.beta + this.gamma;
    }
    getMellow(){
	return this.theta;
}

    getState(){
        if(this.getAnger() < 0.5 && (this.getAnger() > getDistracted() && this.getAnger() > getMellow()))
return 1;
	else if(this.getAnger() > 0.5 && this.getAnger() < 0.75 && (this.getAnger() > this.getDistracted() && this.getAnger() > this.getMellow()))
return 2;
	else if(this.getAnger() > 0.75 && (this.getAnger() > this.getDistracted() && this.getAnger() > this.getMellow()))
return 3;
        else if(this.geDistracted() < 0.5 && (this.getDistracted() > this.getAnger() && this.getDistracted() > this.getMellow()))
return 4;
	else if(this.getDistracted() > 0.5 && this.getDistracted() < 0.75 && (this.getDistracted() > this.getAnger() && this.getDistracted() > this.getMellow()))
return 5;
	else if(this.getDistracted() > 0.75 && (this.getDistracted() > this.getAnger() && this.getDistracted() > this.getMellow()))
return 6;
        else if(this.getMellow() < 0.5 && (this.getMellow() > this.getDistracted() && this.getMellow() > this.getAnger()))
		return 7;
	else if(this.getMellow() > 0.5 && this.getMellow() < 0.75 && (this.getMellow() > this.getDistracted() && this.getMellow() > this.getAnger()))
		return 8;
	else if(this.getMellow() > 0.75 && (this.getMellow() > this.getDistracted() && this.getMellow() > this.getAnger()))
		return 9;
        return 0;
    }
}