import Link from 'next/link'

const Menu = () => {
    return (
        <div className='flex justify-between p-4 gap-2 font-bold'>
            <Link href="/" >Accueil</Link>
            <Link href="/orders">Nos commandes</Link>
            <Link href="/clients">Nos clients</Link>
            {/* <Link href="/">Se déconnecter</Link> */}
        </div>
    )
}

export default Menu;