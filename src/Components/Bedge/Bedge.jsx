const Bedge = (props) => {
    return (
        <>
            <span className={`inline-block py-1 px-4 rounded-full text-[11px] capatilized ${
                props.status === 'panding' && 'bg-primary text-white'
            } ${
                props.status === 'confirm' && 'bg-green-500 text-white'
            } ${
                props.status === 'delievered' && 'bg-primary text-white'
            }`}>{props.status}</span>
        </>
    )
}
export default Bedge;