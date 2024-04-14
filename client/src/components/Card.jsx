import heart from "../assets/heart.png"; // Importing heart icon image
import redheart from "../assets/redheart.png"; // Importing red heart icon image

export default function Card({ eventName, date, time, location, image, liked }) {
    return (
        <div className="my-2 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                {/* Displaying event image */}
                <div className="md:flex-shrink-0">
                    <img className="h-full w-full  object-cover md:w-48" src={`https://images.pexels.com/photos/20588094/pexels-photo-20588094/free-photo-of-a-woman-in-a-white-sweater-holding-a-book.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load`} alt="Event" />
                </div>
                {/* Displaying event details */}
                <div className="p-8">
                    <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{eventName}</a>
                    <p className="mt-2 text-zinc-500">Date {date}</p>
                    <p className="mt-2 text-zinc-500">Starts at {time}</p>
                </div>
                {/* Displaying like button */}
                <div className="p-8">
                    <button className="text-zinc-400 cursor-pointer hover:text-red-500 focus:outline-none focus:text-red-500" onClick={() => setToggle((prev) => !prev)}>
                        {/* Changing icon based on whether the event is liked */}
                        <img src={liked ? redheart : heart} alt="heart image" />
                    </button>
                </div>
            </div>
        </div>
    );
}
