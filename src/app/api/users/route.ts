const USERS = [
    {
        username: "poojan_shah",
        name: "Poojan Shah",
        role: "admin",
    },
    {
        username: "vedanshi_vora",
        name: "Vedanshi Vora",
        role: "user",
    },
    {
        username: "sid_shah",
        name: "Siddhant Shah",
        role: "user",
    },
];

export async function GET(request: Request) {
    return new Response(JSON.stringify(USERS));
}