import handleUser
import handlePins

def testHandleUser():
    try:
        handleUser.removeUserByName("user1")
        print("--------------------------------------")
    except:
        pass

    try:
        handleUser.removeUserByName("user2")
        print("--------------------------------------")
    except:
        pass

    handleUser.insertUser("user1", "password1")
    print("--------------------------------------")
    handleUser.insertUser("user2", "password2")
    print("--------------------------------------")


    handleUser.getUserByName("user1")
    print("--------------------------------------")

    handleUser.getUserByName("user2")
    print("--------------------------------------")

    handleUser.removeUserByName("user1")
    handleUser.getUserByName("user1")
    print("--------------------------------------")

    handleUser.removeUserByName("user2")
    handleUser.getUserByName("user2")
    print("--------------------------------------")


def testHandlePins():
    try:
        handlePins.removePinByName("pin1")
        print("--------------------------------------")
    except:
        pass

    try:
        handlePins.removePinByName("pin2")
        print("--------------------------------------")
    except:
        pass

    handlePins.insertPin("pin1", 1, 1, "title1", "description1")    
    print("--------------------------------------")
    handlePins.insertPin("pin2", 2, 2, "title2", "description2")
    print("--------------------------------------")

    handlePins.getPins()
    print("--------------------------------------")    

    handlePins.removePinWithID("pin1")    
    print("--------------------------------------")

    handlePins.removePinWithID("pin2")    
    print("--------------------------------------")

    handlePins.getPins()
    print("--------------------------------------")    

testHandlePins()