import Button from "./Button"
const Header = ({title,onAdd,showAddTask}) => {
   
    return (
        <header className="header">
            <h1>{title}</h1>
            <Button color={showAddTask?'red' : "green"} text={showAddTask ? 'Close' : 'Add'} onClick={onAdd}/>
            
        </header>
    )
}

Header.defaultProps={
    title:'Task Tracker'

}
export default Header
