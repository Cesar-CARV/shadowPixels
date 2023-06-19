import { useState, useEffect } from "react";

function CodeBlock({ code, title }) {
    const [copied, setCopied] = useState(false);

    useEffect(() => setCopied(false), [code]);

    const handleClick = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
    }


    return (
        <section className="flex-grow h-auto max-h-96 max-w-xs bg-gray-950 text-white">
            <header className="p-4 flex justify-between items-center bg-gray-900">
                <h4>{title}</h4>
                <button onClick={handleClick}>
                    {copied ? <i class='bx bxs-check-square'></i> : <i class='bx bx-clipboard'></i>}
                </button>
            </header>
            <div className="p-4">
                <div className="overflow-auto w-full h-full">
                    <pre>
                        <code>
                            {code}
                        </code>
                    </pre>
                </div>
            </div>
        </section>
    )
}

export default CodeBlock;