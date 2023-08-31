function Checkbox({ className, id, labelText, onClick, lang }) {

    return (
        <div className={className}>
            <input id={id} type="checkbox" onClick={onClick} />
            <label htmlFor={id} lang={lang}>{labelText}</label>
        </div>
    )
}

export default Checkbox;