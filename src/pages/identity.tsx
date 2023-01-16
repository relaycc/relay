import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Identity () {
    const router = useRouter()
    useEffect(() => {
        router.push('/?category=identity', undefined, { shallow: true })
    },[])
    return (
        <div className="bg-blue-100 h-screen"></div>
    )
}