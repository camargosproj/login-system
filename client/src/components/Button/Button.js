const Button = ({register, onClick}) => {
    if(register){
        return (
            <button onClick={onClick} type="submit"><i className="fa-solid fa-circle-user"></i>Register</button>
        )
    }
    return ( 
        <button onClick={onClick} type="submit"><i className="fa-solid fa-paper-plane"></i>Login</button>
     );
}
 
export default Button;