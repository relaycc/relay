import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Impactdao () {
    const router = useRouter()
    useEffect(() => {
        router.push('/?category=impactdao', undefined, { shallow: true })
    },[])
    return (
        <div className="bg-blue-100 h-screen"></div>
    )
}