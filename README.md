# Polulu DRV8834

This is an extension for the Polulu DRV8834 to control bipolar stepper motors from 2.5 up to 10.8 V.
code based on and inspired by Tinkertanker https://github.com/tinkertanker/pxt-stepper-motor

## Wiring

The library is configured for the 5 pins STEP, DIR, M0, M1 and SLEEP. Sleep can either be connected to a digital pin or the logic power supply, so the pin configuration is optional. The same for M0 and M1 which determines the step mode. If both are low the motor moves per default in fullstep mode.

![wiring scheme](https://www.exp-tech.de/media/image/72/40/7a/POLOLU-DRV8834_8_600x600_600x600.jpg)

## Usage

### setPins

configure the pins for the driver at the start

´´´blocks
createMotor(steps: DigitalPin, dir: DigitalPin, M0: DigitalPin, M1: DigitalPin, sleep?: DigitalPin): Motor {
        let motor = new Motor();
        motor.setPins(steps, dir, M0, M1, sleep);
        motor.setDelay(10);
        motor.setStepsPerRevolution(4650);
        return motor;
´´´

## Als Erweiterung verwenden

Dieses Repository kann als **Erweiterung** in MakeCode hinzugefügt werden.

* öffne [https://makecode.calliope.cc/](https://makecode.calliope.cc/)
* klicke auf **Neues Projekt**
* klicke auf **Erweiterungen** unter dem Zahnrad-Menü
* nach **https://github.com/jasperp92/steppermotordriver-polulu-drv8834** suchen und importieren

## Dieses Projekt bearbeiten ![Build Status Abzeichen](https://github.com/jasperp92/steppermotordriver-polulu-drv8834/workflows/MakeCode/badge.svg)

Um dieses Repository in MakeCode zu bearbeiten.

* öffne [https://makecode.calliope.cc/](https://makecode.calliope.cc/)
* klicke auf **Importieren** und dann auf **Importiere URL**
* füge **https://github.com/jasperp92/steppermotordriver-polulu-drv8834** ein und klicke auf Importieren

## Blockvorschau

Dieses Bild zeigt den Blockcode vom letzten Commit im Master an.
Die Aktualisierung dieses Bildes kann einige Minuten dauern.

![Eine gerenderte Ansicht der Blöcke](https://github.com/jasperp92/steppermotordriver-polulu-drv8834/raw/master/.github/makecode/blocks.png)

#### Metadaten (verwendet für Suche, Rendering)

* for PXT/calliopemini
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
