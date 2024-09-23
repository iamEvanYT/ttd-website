const targetURL = "https://status.toilettowerdefense.com/status/ttd"
export default async function Redirection() {
    return <>
        <embed src={targetURL} className="h-[100vh] w-full mx-0 p-0 overflow-hidden border-none" />
    </>
}