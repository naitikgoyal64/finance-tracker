import './Card.css'

export default function Card({ title, balance, icon,message }) {
    return (
        <div className="Card">
            <div className="card-header">
               <p className='card-title'>{title}</p>
               <div className="icon">{icon}</div>
            </div>
           
           <h1 className='card-amount'>₹{balance}</h1>
           
           <p className="message">{message}</p> 

        </div>
    )
}