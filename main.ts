//% color=#5042f4 icon="\uf2c9"

namespace DS18B20 {
    /**
     * Liest die Temperatur aus dem one-wire Temperature Sensor.
     * Gibt eine 4-stellige Zahl zurück. Der Wert sollte durch 100 geteilt werden da 
     * der Wert um 100 überhöht ist. 
     * Die beiden linken Ziffern sind die Stellen vor dem Komma, die beiden rechten Stellen 
     * zwei Nachkommastellen.
     * Originalerweiterung von https://github.com/mengbishu/pxt-ds18b20
     * Special thanks 2 mengbishu!
     * Erweitert mit Anpassungen für den Calliope Mini (https://www.calliope.cc) von Michael Klein.
     * Pins angepasst, Funktionen übersetzt, Writetemperature ergänzt.
     */

    export enum pin {
        //% block=P0
        pin12 = 12,
        //% block=P1
        pin0 = 0,
        //% block=P2
        pin1 = 1,
        //% block=P3
        pin16 = 16,
        //  //% block=C16      bekomme die Pins im C++ File einfach nicht angesteuert (Issue1)
        //  pin2 = 2,
        //  //% block=C17
        //  pin8 = 8       
    }

    //% shim=DS18B20::Temperature
    export function Temperature(p: number): number {
        // Fake function for simulator
        return 0
    }

    /**
    * Schreibt die aktuelle Temperatur auf dem 5x5 Display
    * und hängt Grad Celsius an */
    //% weight=10 blockId="WriteTemperature" 
    //% block="WriteTemperature |%p|"
    //% p.fieldEditor="gridpicker" p.fieldOptions.columns=4
    export function WriteTemperature(p: pin): void {
        basic.showString(TemperatureString(p))
        images.createImage(`
        . # . . .
        # . # . .
        . # . . .
        . . . . .
        . . . . .
        `).scrollImage(1, 200)
        basic.showString("C ")
    }

    /**
     * Liest die Temperatur aus dem ds18b20 Sensor als 4-stellige Ganzzahl aus.
     * Der Wert muss durch 100 geteilt werden um den wirklichen Wert zuberechnen.
     * Die beiden rechten Ziffern sind die zwei Nachkommastellen!*/
    //% weight=10 blockId="Temperature_number" 
    //% block="Temperature_number |%p|"
    //% p.fieldEditor="gridpicker" p.fieldOptions.columns=4
    export function TemperatureNumber(p: pin): number {
        // Fake function for simulator
        return Temperature(p)
    }

    /**
     * Liest die Temperatur aus dem ds18b20 aus und erzeugt eine Textzeile (String)
     mit Komma und 2 Nachkommastellen.*/
    //% weight=10 blockId="Temperature_string" 
    //% block="|%p| Temperature_string "
    //% p.fieldEditor="gridpicker" p.fieldOptions.columns=4
    export function TemperatureString(p: pin): string {
        let temp = Temperature(p);
        let x = (temp / 100)
        let y = (temp % 100)
        let z = ''
        if (temp >= 0) {
            if (y < 10) {
                z = x.toString() + ',0' + y.toString()
            }
            else {
                z = x.toString() + ',' + y.toString()
            }
        }
        else if (temp < 0) {
            if (y > -10) {
                z = '-' + (-x).toString() + ',0' + (-y).toString()
            }
            else {
                z = '-' + (-x).toString() + ',' + (-y).toString()
            }
        }
        return z
    }
}
