import pyautogui
import time
from datetime import datetime


#Define Folder to write all files (e.g. C:\\qBut_Eval\\)
folder = ""
#Define prefix of filename
filename = folder + "filename_"

#Setup positions of click areas
#Browser Reload button
posReloadX = 100
posReloadY = 100
#surrounding Buttons
posTypeFieldX = 100
posTypeFieldY = 100
posStartNextX = 100
posStartNextY = 100
posPageFinX = 100
posPageFinY = 100

#App Buttons
posAppNextX = 100
posAppNextY = 100
posCheckBoxX = 100
posCheckBoxY = 100
posPageNextX = 100
posPageNextY = 100

#set delaytimes of pyautogui correct
pyautogui.PAUSE = 0
#on macOS a delay of 0.01s is recommendet
#pyautogui.DARWIN_CATCH_UP_TIME

def reload(x,y,string,f):
    id = str(int(time.time() * 1000)) # id of file and also identifier for Qualtrix
    f.write("StartBot with id#"+id+";")
    pyautogui.moveTo(x, y, duration=1)  # Refresh button (Start page)
    pyautogui.click(clicks=1, button='left')  # (Load page)
    actTime = str(int(time.time() * 1000))
    f.write(actTime + string+";")
    xC = -1 * (x - posTypeFieldX)
    yC = -1 * (y - posTypeFieldY)
    pyautogui.moveRel(xC, yC, duration=2)
    pyautogui.click(clicks=1, button='left')
    pyautogui.typewrite(str(id), interval=0.1)

def click_next(x,y,xA,yA,string,f):
    pyautogui.moveTo(x, y, duration=0)  # Refresh button position
    xC = -1 * (x - xA)
    yC = -1 * (y - yA)
    pyautogui.moveRel(xC, yC, duration=2)
    actTime = str(int(time.time() * 1000))
    f.write(actTime + string + "PreClick;") # write out pre and postclick time (later user average)
    pyautogui.click(clicks=1, button='left')
    actTime = str(int(time.time() * 1000))
    f.write(actTime + string+"PostClick;")

x = posReloadX
y = posReloadY
### INIT DONE ###


for a in range(1): #set to number needed to run, will be appended to filename
    f = open(filename + str(a) +".txt", "w")

    f.write(str(datetime.now()) + ";")

    #Path for this test: Next - Checkbox - Next - Next -Next - Next - Finish
    reload(x,y,"(Load Startpage)",f)

    #Next to start
    click_next(x,y,posStartNextX,posStartNextY,"#ready_Start (Next on Init page, Start will be requested)",f)

    #Mobile Phone Next Button
    click_next(x,y,posAppNextX,posAppNextY,"#Weiter to Activity.html (Next on Tractiv screen clicked)",f)

    #Mobile Phone Checkbox
    click_next(x,y,posCheckBoxX,posCheckBoxY,"#CheckBox on Activity dlicked",f)

    #Mobile Phone Next Button
    click_next(x,y,posAppNextX,posAppNextY,"#Weiter to Location (Next on Activity screen clicked)",f)

    # Mobile Phone Next Button
    click_next(x, y, posAppNextX, posAppNextY, "#Weiter to Speech (Next on Activity screen clicked)", f)

    # Mobile Phone Next Button
    click_next(x, y, posAppNextX, posAppNextY, "#Weiter to Sound (Next on Activity screen clicked)", f)

    # Mobile Phone Next Button
    click_next(x, y, posAppNextX, posAppNextY, "#Weiter to Stats (Next on Activity screen clicked)", f)

    #Survey Next Button
    click_next(x,y,posPageNextX,posPageNextY,"#Finish (Blue Next Button)",f)
    f.write("\n")
    f.close()


