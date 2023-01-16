import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Zk () {
    const router = useRouter()
    useEffect(() => {
        router.push('/?category=zk', undefined, { shallow: true })
    },[])
    return (
        <div className="bg-blue-100 h-screen"></div>
    )
}