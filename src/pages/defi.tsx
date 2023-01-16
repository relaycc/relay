import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Defi () {
    const router = useRouter()
    useEffect(() => {
        router.push('/?category=defi', undefined, { shallow: true })
    },[])
    return (
        <div className="bg-blue-100 h-screen"></div>
    )
}