const users = []

function addUser(id,username,chatName) {
    users.push({id,username,chatName})
    console.log({users})
}

function getUser(id) {
    return users.find(user=>user.id === id)
}

function removeUser(id) {

    const userIndex = users.findIndex(user=>user.id === id)
    if (userIndex>0) {
        return users.splice(userIndex,1)[0]
    }
    return null;
}

function getUsers() {
    return users.map(el=>el.username);
}


module.exports = {
    addUser,getUser,removeUser,getUsers
}