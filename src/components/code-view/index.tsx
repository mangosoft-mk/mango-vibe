import Prism from 'prismjs';
import {useEffect} from "react";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import './code-theme.css';

interface Props {
    code: string;
    lang: string;
}
export const CodeView = ({code, lang}: Props) => {
    useEffect(() => {
        async function highlight() {
            Prism.highlightAll();
        }
        highlight();
    }, [code, lang]);
    return (
        <pre className="p-2 bg-transparent border-none rounded-none m-0 text-sm">
            <code className={`language-${lang}`}>{code}</code>
        </pre>
    )
};