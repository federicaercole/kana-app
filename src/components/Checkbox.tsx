interface Props {
    className?: string,
    id: string,
    labelText: string,
    onClick: (e: React.MouseEvent<HTMLInputElement>) => void,
    lang?: string,
}

function Checkbox({ className, id, labelText, onClick, lang }: Props) {

    return (
        <div className={className}>
            <input id={id} type="checkbox" onClick={onClick} />
            <label htmlFor={id} lang={lang}>{labelText}</label>
        </div>
    )
}

export default Checkbox;