/*
    /* Made from pxt-ucl-junkrobot and Learning Developments tutorial on stepper motors
    /* https://github.com/chevyng/pxt-ucl-junkrobot/blob/master/main.ts
    /* https://learningdevelopments.co.nz/blogs/lessons/stepper-motor-control-with-the-micro-bit
    /*
    /* And much help from Sparkfun's tutorial on building extensions in MakeCode
    /* https://learn.sparkfun.com/tutorials/how-to-create-a-makecode-package-for-microbit/all
    /* Much love from Tinkercademy
*/

enum stepUnit {
    //% block="steps"
    Steps,
    //% block="rotations"
    Rotations
}

enum direction {
    //% block="clockwise"
    Clockwise,
    //% block="anticlockwise"
    AntiClockwise
}

enum stepMode {
    //% block="fullstep"
    fullStep,
    //% block="halfstep"
    halfStep,
    //% block="1/4 step"
    oneFourthStep
}

//% color=#a754d3 icon="\uf013"
namespace Polulu_DRV8834 {

    export class Motor {

        private input1: DigitalPin;
        private input2: DigitalPin;
        private input3: DigitalPin;
        private input4: DigitalPin;
        private input5: DigitalPin;
        private delay: number;
        private spr: number;
        private mode: stepMode;

        setPins(steps: DigitalPin, dir: DigitalPin, M0: DigitalPin, M1: DigitalPin, sleep: DigitalPin): void {
            // send pulse
            this.input1 = steps;
            this.input2 = dir;
            this.input3 = M0;
            this.input4 = M1;
            this.input5 = sleep;
        }

        //% blockId=set_motor_calibration block="%motor|set delay between steps to %delayNum|ms"
        //% weight=60 blockGap=8
        setDelay(delayNum: number): void {
            this.delay = delayNum;
        }

        /* Functions for running a stepper motor by steps */

        //% blockId=moveMotor block="move %motor| %steps|%unit|%dir| "
        //% weight=84 blockGap=8
        moveMotor(steps: number, unit: stepUnit, dir: direction): void {

            switch (unit) {
                case stepUnit.Rotations: steps = steps * this.spr; //2056 steps = approximately 1 round
                case stepUnit.Steps: steps = steps;
            }

            switch (dir) {
                case direction.Clockwise: pins.digitalWritePin(this.input2, 1);
                case direction.AntiClockwise: pins.digitalWritePin(this.input2, 0);
            }

            for (let i = 0; i < steps; i++) {
                pins.digitalWritePin(this.input1, 1);
                basic.pause(this.delay/2);
                pins.digitalWritePin(this.input1, 0);
                basic.pause(this.delay/2);
            }
        }

        //% blockId=set_stepsPerRevolution block="%motor|set steps per revolution to %spr|"
        //% weight=50 blockGap=8
        setStepsPerRevolution(sprNum: number): void {
            if(this.mode == stepMode.halfStep) {
            this.spr = sprNum * 2;
            } else if(this.mode == stepMode.oneFourthStep) {
            this.spr = sprNum * 4;
            } else {
            this.spr = sprNum;
            }
        }

        //% blockId=set_stepMode block="%motor|set step mode to %mode|"
        //% weight=50 blockGap=8
        setStepMode(mode: stepMode): void {
            switch (mode) {
                case stepMode.fullStep: 
                    pins.digitalWritePin(this.input3, 0);
                    pins.digitalWritePin(this.input4, 0);
                case stepMode.halfStep:
                    pins.digitalWritePin(this.input3, 1);
                    pins.digitalWritePin(this.input4, 0);
                case stepMode.oneFourthStep:
                    pins.setPull(this.input3, PinPullMode.PullNone)
                    pins.digitalWritePin(this.input4, 0);                    
            }
            this.mode = mode;
         }
    }


    /**
     * Create a new stepper motor with connected pins at @param.
     * @param 5 pins where the motor is connected. Sleep param is optional
     */
    //% blockId="stepperMotor_setMotor" block="configure DRV8834 | steps %steps|dir %dir|M1 %M1|M0 %M0||sleep %sleep"
    //% weight=90 blockGap=8
    //% parts="motor"
    //% blockSetVariable=motor
    //% expandableArgumentMode="toggle"
    //% steps.defl=DigitalPin.P0 dir.defl=DigitalPin.P1 sleep.defl=0
    export function createMotor(steps: DigitalPin, dir: DigitalPin, M0: DigitalPin, M1: DigitalPin, sleep?: DigitalPin): Motor {
        let motor = new Motor();
        motor.setPins(steps, dir, M0, M1, sleep);
        motor.setDelay(10);
        motor.setStepsPerRevolution(4650);
        return motor;
    }

}