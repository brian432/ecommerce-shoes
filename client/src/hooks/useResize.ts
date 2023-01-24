import { useState, useEffect } from "react"
export const useResize = () => {
    const [isPhone, setIsPhone] = useState<boolean>(
        window.innerWidth > 500 ? true : false
    )
    const [isTablet, setIsTablet] = useState(
        window.innerWidth > 769 ? true : false
    )

    const handleResize = () => {
        if (window.innerWidth < 500) setIsPhone(true)
        else setIsPhone(false)
        if (window.innerWidth < 769) setIsTablet(true)
        else setIsTablet(false)
    }
    useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [isPhone, isTablet])

    return { isPhone, isTablet }
}