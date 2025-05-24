import Header from '../composants/Header.jsx';
import Trending from '../composants/Trending.jsx';
import Footer from '../composants/Footer.jsx';

export default function Home() {
    return (
        <div>
            <Header/>
            <div className="bg-[url(/media/restaurant-bg.jpg)] bg-cover h-dvh flex items-center justify-center bg-no-repeat mask-alpha mask-b-from-black mask-b-from-25% mask-b-to-transparent" >
                <h1 className="text-white text-4xl font-bold font-raleway">Découvrez votre côté gourmet</h1>
            </div>
            <Trending/>
            <Footer/>
        </div>

    )
}