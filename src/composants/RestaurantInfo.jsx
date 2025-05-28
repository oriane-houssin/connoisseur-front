import StarIcon from '@mui/icons-material/Star';

export default function RestaurantInfo({image, creation, horaires, num_rue, rue, city, department, dep_code, michelin}) {
    return (
        <div className="w-1/5 px-4 text-center flex flex-col items-center gap-8">
            <img className="rounded-lg overflow-hidden shadow-lg w-full md:w-[235.2px] aspect-[280/420]" src={image}
                 alt="Affiche connoisseur du restaurant"/>
            <ul className="flex flex-col gap-1 items-center">
                <li className="flex gap-2"><span className="font-semibold">Chef :</span><p>Anton Ego</p></li>
                <li className="flex gap-2"><span className="font-semibold">Owner :</span><p>Anton Ego</p></li>
                <li className="flex gap-2"><span className="font-semibold">Creator :</span><p>Anton Ego</p></li>
                {creation && (<li className="flex gap-2"><span className="font-semibold">Creation :</span><p>{creation}</p></li>)}
            </ul>
            {michelin && michelin !== 0 && (
                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-xl uppercase">Michelin</h2>
                    <div className="flex gap-1">
                        {[...Array(Number(michelin))].map((_, i) => (
                            <StarIcon
                                key={i}
                                className={`w-4 h-4 ${i <= michelin ? 'text-yellow-500' : 'text-light-black'}`}
                                fill={i <= michelin ? 'currentColor' : 'none'}
                            />
                        ))}
                    </div>
                </div>
            )}
            <div>
                <h2 className="text-xl uppercase mb-2">ADRESS</h2>
                <p>{num_rue} {rue} {city} {department} ({dep_code})</p>
            </div>
            <div>
                <h2 className="text-xl uppercase mb-1">HORAIRES</h2>
                <p>{horaires}</p>
            </div>
        </div>
    )
}