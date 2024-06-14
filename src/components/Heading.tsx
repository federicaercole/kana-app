import { useEffect, useRef } from "react";

export function Heading({ children }: { children: React.ReactNode }) {
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        headingRef.current?.focus();
    }, [])

    return <h1 ref={headingRef} tabIndex={-1}>{children}</h1>;
}