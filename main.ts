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

//% color=#1f49bf icon="\uf013"
namespace Stepper_DRV8834 {

    export class Motor {

        private input1: DigitalPin;
        private input2: DigitalPin;
        private input3: DigitalPin;
        private input4: DigitalPin;
        private input5: DigitalPin;
        private delay: number;

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
                case stepUnit.Rotations: steps = steps * 2056; //2056 steps = approximately 1 round
                case stepUnit.Steps: steps = steps;
            }

            switch (dir) {
                case direction.Clockwise: pins.digitalWritePin(this.input3, 1);
                case direction.AntiClockwise: pins.digitalWritePin(this.input3, 0);
            }

            for (let i = 0; i < steps; i++) {
                pins.digitalWritePin(this.input1, 1);
                basic.pause(this.delay/2);
                pins.digitalWritePin(this.input1, 0);
                basic.pause(this.delay/2);
            }
        }


    }

    /**
     * Create a new stepper motor with connected pins at @param.
     * @param 5 pins where the motor is connected.
     */
    //% blockId="stepperMotor_setMotor" block="DRV8834 | steps %steps|dir %dir|M1 %M1|M0 %M0||sleep %sleep"
    //% weight=90 blockGap=8
    //% parts="motor"
    //% blockSetVariable=motor
    //% expandableArgumentMode="toggle"
    export function createMotor(steps: DigitalPin, dir: DigitalPin, M0: DigitalPin, M1: DigitalPin, sleep: DigitalPin): Motor {
        let motor = new Motor();
        motor.setPins(steps, dir, M0, M1, sleep);
        motor.setDelay(10);
        return motor;
    }

}