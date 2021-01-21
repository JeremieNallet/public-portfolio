import { useEffect } from "react";

const useScrollStatus = (value = "unset") => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            document.body.style.overflow = value;
        }
    }, [value]);
};

export default useScrollStatus;
