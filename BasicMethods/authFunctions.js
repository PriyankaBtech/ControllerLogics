const User = require("./models/user")

// Create a function signup that accept an object containing user details and create new user in the database.
// Create

async function singup(userDetails) {
    try {
        const user = new User(userDetails)
        const newUser = await user.save()
        console.log("New user created", newUser)
    }catch (error) {
        throw error        
    }
}

singup({
    name: "Priyanka",
    email: "priya1@gmail.com",
    password: 12345,
})


// Create a function login that accepts email and password, verifies the credentials and return user details upon successful login.
// Read

async function login(email, password) {
    try {
        const user = await User.findOne({ email })
        if(user && user.password === password) {
            console.log("user login successfully", user)
        } else {
            throw new Error("Invalid credentials")  
        }       
    } catch (error) {
        throw error       
    }
}

// Usage 
try {
    login("priya1@gmail.com", "password12345")
} catch (error) {
    console.error("Login failed", error.message)    
}


// Create a function changePassword that accepts user email, current password and new password. Update the password if the current password change.
// Update

async function changePassword(email, currentPassword, newPassword) {
    try {
        const user = await User.finOne({ email })
        if (user && user.password === currentPassword) {
            user.password = newPassword
            const updatedPassword = await user.save()
            console.log("Password Change Successfully", updatedPassword)              
        } else {
            throw new Error("Invalid credentials")  
        }
    } catch (error) {
        throw error        
    }    
}

//Usage
try {
    changePassword("priya!@gmail.com", "password123", "changepassword456")    
} catch (error) {
    console.error("Password Change Failed", error.message)    
}


// Create a function updateContactDetails that accepts user's email and an object containing update contact details. Update the contact details for user. Make sure to add the phoneNumber(Number) key in the user model first.

// Update
async function updateContactDetails(email, updatedContactDetails) {
    try {
        const user = await User.findOne({ email })
        if (user) {
            Object.assign(user, updatedContactDetails)
            const updatedUser = await user.save()
            console.log("Contact details change successfully", updatedUser)        
        } else {
           throw new Error("User Not Found")
        }
    } catch (error) {
        throw error
    }    
}

// usage
try {
    updateContactDetails("priya1@gmail.com", { 
        email: "priya2@gmail.com",
        phoneNumber: 8888888888
    })
} catch (error) {
    console.error("Failed", error.message)    
}