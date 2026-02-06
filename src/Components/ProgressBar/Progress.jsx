const Progress = (Props) => {
    return(
        <>
            <div className="h-auto w-[100px] overflow-hidden rounded-md bg-[#f1f1f1]">
                <span className={`flex items-center w-[${Props.value}%] h-[8px] bg-blue-500 ${Props.type==="success" && 'bg-green-600'} ${Props.type==="error" && 'bg-pink-600'} ${Props.type==="warning" && 'bg-orange-400'}`}></span>
            </div>
        </>
    )
}
export default Progress;