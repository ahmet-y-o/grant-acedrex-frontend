
const BASEURL = "http://localhost:8080/"

export const getRoomsList = async () => {
    return fetch(BASEURL, {
        headers: []
    })  
        .then(req => req.json())
        .then(json => {
            // TODO: delete, only for debug
            console.log(json)
            return json
        })
        .catch(err => console.error("error when getting rooms list:\n", err))
}

export const createRoom = async (side: string) : Promise<string> => {
    return fetch(BASEURL + "create-room" + "?s=" + side, {
        method: "GET",
        mode: "cors",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
        .then(req => req.json())
        .then(json => {
            return json.roomId
        })
        .catch(err => console.error("error when creating room list:\n", err))
}

export const isRoomFull = async (roomId: string) => {
    return fetch(BASEURL + "isFull/" + roomId, {
        method: "GET",
        mode: "cors",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
}