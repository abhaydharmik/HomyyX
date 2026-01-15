export const fetchMessages = async (room) => {
    const res = await fetch(`http://localhost:5000/api/messages?room=${room}`)
    return res.json()
}