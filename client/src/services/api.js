export const fetchMessages = async () => {
    const res = await fetch("http://localhost:5000/api/messages")
    return res.json()
}