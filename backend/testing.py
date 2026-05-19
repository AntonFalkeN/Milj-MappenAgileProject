import handleUser
import handlePins

def testHandleUser():
    try:
        handleUser.removeUserByName("user1")
    except: pass
    finally:
        print("--------------------------------------")        

    try:        
        handleUser.removeUserByName("user2")
    except: pass
    finally:
        print("--------------------------------------")        

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
        handlePins.removePinByTitle("title1")    
    except: pass        
    finally:
        print("--------------------------------------")

    try:
        handlePins.removePinByTitle("title2")    
    except: pass        
    finally:
        print("--------------------------------------")

    handlePins.insertPin("user1", "title1", 1, 1, "description1", "pant", "2024-06-01T12:00:00Z", "2024-06-01T12:00:00Z")    
    print("--------------------------------------")
    handlePins.insertPin("user2", "title2", 2, 2, "description2", "pant", "2024-06-01T12:00:00Z", "2024-06-01T12:00:00Z")
    print("--------------------------------------")

    pins = handlePins.getPins()
    print("--------------------------------------")    

    handlePins.removePinByTitle("title1") 
    print("--------------------------------------")

    handlePins.removePinByTitle("title2")
    print("--------------------------------------")

    handlePins.getPins()
    print("--------------------------------------")    

testHandleUser()
print("======================================")
testHandlePins()