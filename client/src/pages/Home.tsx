import Houses from "../components/Houses";

const Home = () => {


    return (
        <div className="container mt-20">
            <h1 className='text-center font-bold text-5xl leading-[3.5rem]'>
                Get your Dream house at <span className="underline text-red-500">affordable price</span>!!
            </h1>

            <Houses />
        </div>
    );
}

export default Home;
