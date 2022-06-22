/*
*/

enum stepUnit {
    //% block="steps"
    Steps,
    //% block="rotations"
    Rotations
}

//% color=#1f49bf icon="\uf013"
namespace stepperMotor {

    export class Motor {

        private input1: DigitalPin;
        private input2: DigitalPin;
        private input3: DigitalPin;
        private input4: DigitalPin;
        private input5: DigitalPin;
        private state: number;

        setPins(steps: DigitalPin, dir: DigitalPin, M0: DigitalPin, M1: DigitalPin, sleep: DigitalPin): void {
            // send pulse
            this.input1 = steps;
            this.input2 = dir;
            this.input3 = M0;
            this.input4 = M1;
            this.input5 = sleep;
        }

        setState(stateNum: number): void {
            this.state = stateNum;
        }

        //% blockId=set_motor_calibration block="%motor|set delay between steps to %delayNum|ms"
        //% weight=60 blockGap=8
        setDelay(delayNum: number): void {
            this.delay = delayNum;
        }

        /* Functions for running a stepper motor by steps */

        steps(direction: number): void {
            if (this.state == 0) {
                pins.digitalWritePin(this.input1, 0);
                pins.digitalWritePin(this.input2, 0);
                pins.digitalWritePin(this.input3, 0);
                pins.digitalWritePin(this.input4, 0);
            } else if (this.state == 1) {
                pins.digitalWritePin(this.input1, 1);
                pins.digitalWritePin(this.input2, 0);
                pins.digitalWritePin(this.input3, 0);
                pins.digitalWritePin(this.input4, 1);
            } else if (this.state == 2) {
                pins.digitalWritePin(this.input1, 0);
                pins.digitalWritePin(this.input2, 0);
                pins.digitalWritePin(this.input3, 1);
                pins.digitalWritePin(this.input4, 1);
            } else if (this.state == 3) {
                pins.digitalWritePin(this.input1, 0);
                pins.digitalWritePin(this.input2, 1);
                pins.digitalWritePin(this.input3, 1);
                pins.digitalWritePin(this.input4, 0);
            } else if (this.state == 4) {
                pins.digitalWritePin(this.input1, 1);
                pins.digitalWritePin(this.input2, 1);
                pins.digitalWritePin(this.input3, 0);
                pins.digitalWritePin(this.input4, 0);
            }

            this.state = this.state + direction;
            if (this.state < 1) {
                this.state = 4;
            } else if (this.state > 4) {
                this.state = 1;
            }

        }

        //% blockId=moveAntiClockwise block="move %motor| %steps|%unit| anti-clockwise"
        //% weight=85 blockGap=8
        moveAntiClockwise(steps: number, unit: stepUnit): void {

            switch (unit) {
                case stepUnit.Rotations: steps = steps * 2056; //2056 steps = approximately 1 round
                case stepUnit.Steps: steps = steps;
            }

            for (let i = 0; i < steps; i++) {
                this.steps(1);
                basic.pause(this.delay);
            }

            this.state = 0;
        }

        //% blockId=moveClockwise block="move %motor| %steps|%unit| clockwise"
        //% weight=84 blockGap=8
        moveClockwise(steps: number, unit: stepUnit): void {

            switch (unit) {
                case stepUnit.Rotations: steps = steps * 2056; //2056 steps = approximately 1 round
                case stepUnit.Steps: steps = steps;
            }

            for (let i = 0; i < steps; i++) {
                this.steps(-1);
                basic.pause(this.delay);
            }

            this.state = 0;
        }

        //% blockId=stopMotor block="stop %motor"
        //% weight=70 blockGap=8
        stopMotor(): void {
            this.state = 0;
        }


    }

    /**
     * Create a new stepper motor with connected pins at @param.
     * @param 4 pins where the motor is connected.
     */
    //% blockId="stepperMotor_setMotor" block="DRV8834 | steps %in1|dir %in2|M1 %in3|M0 %in4"
    //% weight=90 blockGap=8
    //% parts="motor"
    //% blockSetVariable=motor
    export function createMotor(in1: DigitalPin, in2: DigitalPin, in3: DigitalPin, in4: DigitalPin): Motor {
        let motor = new Motor();
        motor.setPins(in1, in2, in3, in4);
        motor.setState(0);
        motor.setDelay(1);
        return motor;
    }

}