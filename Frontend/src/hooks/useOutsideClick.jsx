import { useEffect } from "react";

export default function useOutsideClick(ref, action) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                action()
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    //eslint-disable-next-line
    }, [ref]);
}