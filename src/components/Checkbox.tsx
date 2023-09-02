interface Props {
    className?: string,
    id: string,
    labelText: string,
    onClick: (e: React.MouseEvent<HTMLInputElement>) => void,
    lang?: string,
    innerRef: React.MutableRefObject<HTMLInputElement> | ((element: HTMLInputElement) => void)
}

function Checkbox({ className, id, labelText, onClick, lang, innerRef }: Props) {

    return (
        <div className={className}>
            <input id={id} type="checkbox" onClick={onClick} ref={innerRef} />
            <label htmlFor={id} lang={lang}>{labelText}</label>
        </div>
    )
}

export default Checkbox;