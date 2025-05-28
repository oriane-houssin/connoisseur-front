export default function RestaurantMain({name, website, tel}) {
    return (
        <div className="text-white py-4">
            <div className="mb-8">
                <h1 className="text-2xl uppercase mb-8">{name}</h1>
                <p className="text-xs">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the
                    industry's
                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                    scrambled it
                    to
                    make a type specimen book. It has survived not only five centuries, but also the leap into
                    electronic
                    typesetting,
                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                    containing
                    Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
                    including
                    versions of Lorem Ipsum.
                </p>
            </div>
            {website && (<a className="text-xs text-blue-green" href={website}>Visitez leur site</a>)}
            {tel && (
                <div>
                    <h2 className="uppercase text-xl mb-8">Téléphone</h2>
                    <p className="text-blue-green">{tel}</p>
                </div>
            )}
        </div>
    )
}