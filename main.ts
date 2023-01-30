function SetRGB () {
    while (STOP == false && x < 60) {
        if (x < 10) {
            red = 255
            green = list[6 * x]
            blue = 0
        } else {
            if (x < 20) {
                red = list[120 - 6 * x]
                green = 255
                blue = 0
            } else if (x < 30) {
                red = 0
                blue = list[6 * x - 120]
                green = 255
            } else if (x < 40) {
                red = 0
                green = list[240 - 6 * x]
                blue = 200
            } else if (x < 50) {
                red = list[6 * x - 240]
                green = 0
                blue = 255
            } else {
                red = 255
                green = 0
                blue = list[360 - 6 * x]
            }
        }
        range.setPixelColor(x, neopixel.rgb(red, green, blue))
        strip.show()
        x += 1
        basic.pause(1000)
    }
}
// Calculates the number of the Green pixel that is representing the Hour Hand. It does this by first convertimg from 24 hour to 12 hour clock. It then multiplies the hour number by 5. Finally it adds an additional number between 1 and 4 depending on how far through the hour we are. i.e. if we are 48 or more minutes through the hour it adds an extra four.
function HourHand (num: number, num2: number) {
    if (num > 12) {
        Hour = (num - 12) * 5
    } else {
        Hour = (num - 0) * 5
    }
    if (num2 > 47) {
        Mins = 4
    } else if (num2 > 35) {
        Mins = 3
    } else if (num2 > 23) {
        Mins = 2
    } else if (num2 > 11) {
        Mins = 1
    } else {
        Mins = 0
    }
    HourPixel = Hour + Mins
}
input.onButtonPressed(Button.A, function () {
    STOP = false
})
function Tick (num: number, num2: number) {
    haloDisplay.clear()
    haloDisplay.setZipLedColor(num, kitronik_halo_hd.colors(ZipLedColors.Red))
    haloDisplay.setZipLedColor(num2, kitronik_halo_hd.colors(ZipLedColors.Green))
    haloDisplay.show()
}
input.onButtonPressed(Button.AB, function () {
    x = 0
    minute = 0
    strip.showColor(neopixel.colors(NeoPixelColors.Black))
    strip.show()
    haloDisplay.clear()
    basic.showString(kitronik_halo_hd.readTime())
    Tick(kitronik_halo_hd.readTimeParameter(TimeParameter.Minutes), 1)
})
input.onButtonPressed(Button.B, function () {
    STOP = true
})
function SetRGBList () {
    list = [
    0,
    4,
    8,
    13,
    17,
    21,
    25,
    30,
    34,
    38,
    42,
    47,
    51,
    55,
    59,
    64,
    68,
    72,
    76,
    81,
    85,
    89,
    93,
    98,
    102,
    106,
    110,
    115,
    119,
    123,
    127,
    132,
    136,
    140,
    144,
    149,
    153,
    157,
    161,
    166,
    170,
    174,
    178,
    183,
    187,
    191,
    195,
    200,
    204,
    208,
    212,
    217,
    221,
    225,
    229,
    234,
    238,
    242,
    246,
    251,
    255
    ]
}
let minute = 0
let HourPixel = 0
let Hour = 0
let blue = 0
let list: number[] = []
let green = 0
let red = 0
let range: neopixel.Strip = null
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
let strip: neopixel.Strip = null
let Mins = 0
let x = 0
let STOP = false
basic.showString(kitronik_halo_hd.readTime())
basic.showString(kitronik_halo_hd.readDate())
STOP = true
x = 0
Mins = 0
strip = neopixel.create(DigitalPin.P8, 60, NeoPixelMode.RGB)
haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
basic.pause(2000)
range = strip.range(0, 60)
strip.setBrightness(255)
strip.show()
SetRGBList()
// This loop runs once a second.  
// If the stopwatch second count (x)  is zero (i.e. stopwatch is not running) then it will calculate the positions of the Hour (Green) and Minute (Red) LEDs using the HourHand function and then update these pixels using the Tick function
loops.everyInterval(1000, function () {
    if (x == 0) {
        strip.setBrightness(30)
        HourHand(kitronik_halo_hd.readTimeParameter(TimeParameter.Hours), kitronik_halo_hd.readTimeParameter(TimeParameter.Minutes))
        Tick(kitronik_halo_hd.readTimeParameter(TimeParameter.Minutes), HourPixel)
    }
})
// This forever loop will only do something if the STOP boolean variable is true. The value of STOP is set TRUE by Button A and FALSE by Button B. 
// If STOP is FALSE the  code runs which first displays the minute value on the microbit display.
// It then calls the SetRGB loop function which calculates the RGB colours of each "second" pixel at position x. These are calculated using the lookup values in the SetRGBList Function.  It then applies the RGB value to the pixel at position x. It then increments x, implements a 1 second pause and then goes back to the top of the loop.
// Finally the forever loop deals with what happens if x has reached 60, namely clear the pixels and increment the minute value
basic.forever(function () {
    strip.setBrightness(60)
    if (STOP == false) {
        basic.showNumber(minute)
        SetRGB()
        if (x == 60) {
            strip.showColor(neopixel.colors(NeoPixelColors.Black))
            strip.show()
            minute += 1
            x = 0
        }
    }
})
