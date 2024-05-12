import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";


const BookService = () => {

    const service = useLoaderData()
    const { title, _id, price, img } = service
    const { user } = useContext(AuthContext)

    const handleBookService = event => {
        event.preventDefault()
        const form = event.target
        const name = form.name.value
        const date = form.date.value
        const email = user?.email

        const booking = {
            customerName: name,
            email,
            img,
            date,
            service: title,
            service_id: _id,
            price: price
        }

        console.log(booking)

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.insertedId){
                    alert("Service book Successfully")
                }
            })

    }


    return (
        <div>
            <h1 className="text-center text-3xl">Book service: {title}</h1>


            <form onSubmit={handleBookService} className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input name="name" type="text" placeholder="name" defaultValue={user?.displayName} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name="date" placeholder="date" className="input input-bordered" required />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" defaultValue={user?.email} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due amount</span>
                        </label>
                        <input defaultValue={"$" + price} type="text" name="price" placeholder="price" className="input input-bordered" required />

                    </div>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary" type="submit">Order Confirmed</button>
                </div>
            </form>
        </div>
    );
};

export default BookService;