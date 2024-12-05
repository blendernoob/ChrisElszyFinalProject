#include <Adafruit_CircuitPlayground.h>

int capValueL;
int capValueR;

int clapValue;

bool pressed = false;
bool clapped = false;

void setup() 
{
  // put your setup code here, to run once:

    Serial.begin(9600);

    CircuitPlayground.begin();
}

void loop()
{
    // put your main code here, to run repeatedly:
    capValueL = CircuitPlayground.readCap(1);
    capValueR = CircuitPlayground.readCap(6);

    clapValue = CircuitPlayground.mic.soundPressureLevel(30);

    CapacitiveInput();
    ClapInput();

    delay(100);
}

//input for movement
void CapacitiveInput()
{
    if(pressed == false)
    {
        pressed = false;
        Serial.println("o");
    }
    
    //for left input 
    if(capValueL >= 800 && !pressed)
    {
        //Serial.println(capValueL);
        pressed = true;
        Serial.println("X");
    }
    else
    {
        pressed = false;
    }

    //for right input
    if(capValueR >= 800 && !pressed)
    {
        //Serial.println(capValueL);
        pressed = true;
        Serial.println("R");
    }
    else
    {
        pressed = false;
    }

}

void ClapInput()
{
    //Serial.println("cur capValue is " + clapValue);

    if(clapValue >= 75 && !pressed)
    {
        Serial.println("CLP");
        clapped = true;
    }
    else
    {
        clapped = false;
    }
}

